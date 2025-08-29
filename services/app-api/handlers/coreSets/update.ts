import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createDynamoUpdateParams } from "../dynamoUtils/convertToDynamoExpressionVars";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";

export const editCoreSet = handler(async (event, context) => {
  const { allParamsValid, year, state, coreSet } =
    parseCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to state users from corresponding state
  if (!hasStatePermissions(event)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const { submitted, status } = JSON.parse(event!.body!);
  const lastAlteredBy = getUserNameFromJwt(event);
  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Key: {
      compoundKey: `${state}${year}`,
      coreSet: coreSet,
    },
    ...createDynamoUpdateParams({
      submitted,
      status,
      lastAltered: Date.now(),
      lastAlteredBy,
    }),
  };

  await dynamoDb.update(params);
  return { status: StatusCodes.SUCCESS, body: params };
});
