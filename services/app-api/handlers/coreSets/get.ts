import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../libs/updateCoreProgress";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { createCoreSet } from "./create";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { CoreSet, CoreSetAbbr, UserRoles } from "../../types";
import { CoreSetField, coreSets } from "../../libs/coreSetByYearLoaded";

export const coreSetList = handler(async (event, context) => {
  // action limited to any admin type user and state users from corresponding state
  const isStateUser = hasRolePermissions(event, [UserRoles.STATE_USER]);
  if (isStateUser) {
    const isFromCorrespondingState = hasStatePermissions(event);
    if (!isFromCorrespondingState) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        body: Errors.UNAUTHORIZED,
      };
    }
  } // if not state user, can safely assume admin type user due to baseline handler protections

  const params = {
    TableName: process.env.coreSetTableName!,
    ...convertToDynamoExpression(
      {
        state: event!.pathParameters!.state!,
        year: parseInt(event!.pathParameters!.year!),
      },
      "list"
    ),
  };

  // Get the year from the params, then use
  // getCoreSetByYear to see if it's a year that should have
  // coresets generated from login
  const year = parseInt(event!.pathParameters!.year!);
  const coreSetsByYear = coreSets[
    year as keyof typeof coreSets
  ] as CoreSetField[];
  const results = await dynamoDb.scanAll<CoreSet>(params);

  // check if the table is empty and the year should preload the
  // adult coreset
  const shouldPreloadAdultCoreSet =
    results.length === 0 && coreSetsByYear[0].loaded;

  if (shouldPreloadAdultCoreSet) {
    // add an adult coreset and requery the db
    const createCoreSetEvent = {
      ...event,
      pathParameters: {
        ...event.pathParameters,
        coreSet: CoreSetAbbr.ACS,
      },
    };
    try {
      const createCoreSetResult = await createCoreSet(
        createCoreSetEvent,
        context
      );
      if (createCoreSetResult.statusCode === 200) {
        const res = await dynamoDb.scanAll<CoreSet>(params);
        return {
          status: StatusCodes.SUCCESS,
          body: {
            Items: res,
          },
        };
      } else {
        throw new Error("Creation failed");
      }
    } catch (e) {
      console.log(e);
      throw new Error("Failed to create new coreset");
    }
  } else {
    // Update the progress measure numComplete
    await updateCoreSetProgress(results, event, context);

    return {
      status: StatusCodes.SUCCESS,
      body: {
        Items: results,
      },
    };
  }
});

export const getCoreSet = handler(async (event, context) => {
  // action limited to any admin type user and state users from corresponding state
  const isStateUser = hasRolePermissions(event, [UserRoles.STATE_USER]);
  if (isStateUser) {
    const isFromCorrespondingState = hasStatePermissions(event);
    if (!isFromCorrespondingState) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        body: Errors.UNAUTHORIZED,
      };
    }
  } // if not state user, can safely assume admin type user due to baseline handler protections

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return {
    status: StatusCodes.SUCCESS,
    body: {
      Item: queryValue,
    },
  };
});
