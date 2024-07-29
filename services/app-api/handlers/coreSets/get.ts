import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../libs/updateCoreProgress";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { CoreSet, UserRoles } from "../../types";
import { CoreSetField, coreSets } from "../../libs/coreSetByYearPreloaded";
import { getCoreSetFromTable, postCoreSet } from "../../storage/table";

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

  // using coreSetByYear to see if it's a year that should have
  // coresets generated from login
  const year = parseInt(event!.pathParameters!.year!);
  const state = event!.pathParameters!.state!;

  const coreSetsByYear = coreSets[
    year as keyof typeof coreSets
  ] as CoreSetField[];
  let results = await dynamoDb.scanAll<CoreSet>(params);

  const filteredCoreSets = coreSetsByYear.filter((coreSet) => {
    const matchedCoreSet = results.find((existingCoreSet: CoreSet) =>
      coreSet.abbr.includes(existingCoreSet.coreSet)
    );
    return (
      (coreSet.loaded?.length === 0 || coreSet.loaded?.includes(state)) &&
      !matchedCoreSet
    );
  });

  // check if any coresets should be preloaded and requery the db
  for (const coreSet of filteredCoreSets) {
    for (const abbr of coreSet.abbr) {
      const createCoreSetEvent = {
        state,
        year: year.toString(),
        coreSet: abbr,
      };
      const createCoreSetResult = await postCoreSet(createCoreSetEvent);

      if (createCoreSetResult.status !== 200) {
        return {
          status: StatusCodes.SERVER_ERROR,
          body: "Creation failed",
        };
      }
    }
  }
  results = await dynamoDb.scanAll<CoreSet>(params);

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

  const { state, year, coreSet } = event.pathParameters!;
  const queryValue = await getCoreSetFromTable({
    state: state!,
    year: year!,
    coreSet: coreSet!,
  });
  return {
    status: StatusCodes.SUCCESS,
    body: {
      Item: queryValue,
    },
  };
});
