import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../libs/updateCoreProgress";
import { createCoreSet } from "./create";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { CoreSet, UserRoles } from "../../types";
import { CoreSetField, coreSets } from "../../libs/coreSetByYearPreloaded";
import {
  parseStateAndYearParameters,
  parseCoreSetParameters,
} from "../../utils/parseParameters";

export const coreSetList = handler(async (event, context) => {
  const { allParamsValid, state, year } = parseStateAndYearParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
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
    TableName: process.env.coreSetTable!,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: {
      ":compoundKey": `${state}${year}`,
    },
  };

  // using coreSetByYear to see if it's a year that should have coresets generated from login
  const coreSetsByYear = coreSets[
    year as keyof typeof coreSets
  ] as CoreSetField[];

  let results = await dynamoDb.queryAll<CoreSet>(params);

  // Find all the coresets that exist in coreSetsByYear but do not exist in the db
  const missingCoreSets = coreSetsByYear.filter((coreSet) => {
    const matchedCoreSet = results.find((existingCoreSet: CoreSet) =>
      coreSet.abbr.includes(existingCoreSet.coreSet)
    );
    return (
      (coreSet.loaded?.length === 0 || coreSet.loaded?.includes(state)) &&
      !matchedCoreSet
    );
  });

  // If any missing coreSets are found, create said missing coresets and re-query the db
  if (missingCoreSets.length > 0) {
    for (const coreSet of missingCoreSets) {
      for (const abbr of coreSet.abbr) {
        let createCoreSetEvent = {
          ...event,
          pathParameters: {
            ...event.pathParameters,
            coreSet: abbr,
          },
        };
        const createCoreSetResult = await createCoreSet(
          createCoreSetEvent,
          context
        );

        if (createCoreSetResult.statusCode !== 200) {
          return {
            status: StatusCodes.SERVER_ERROR,
            body: "Creation failed",
          };
        }
      }
    }
    results = await dynamoDb.queryAll<CoreSet>(params);
  }

  // Update the progress measure numComplete
  await updateCoreSetProgress(results, event, context);

  return {
    status: StatusCodes.SUCCESS,
    body: {
      Items: results,
    },
  };
});

export const getCoreSet = handler(async (event, context) => {
  const { allParamsValid, year, state, coreSet } =
    parseCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
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
    TableName: process.env.coreSetTable!,
    Key: {
      compoundKey: `${state}${year}`,
      coreSet: coreSet,
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
