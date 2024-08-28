import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCoreSetKey } from "../dynamoUtils/createCompoundKey";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseSpecificCoreSetParameters } from "../../utils/parseParameters";

export const editCoreSet = handler(async (event, context) => {
  const { allParamsValid, year, state, coreSet } =
    parseSpecificCoreSetParameters(event);
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
  const dynamoKey = createCoreSetKey({ state, year, coreSet });
  const lastAlteredBy = getUserNameFromJwt(event);
  const params = {
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
    ...convertToDynamoExpression(
      {
        submitted,
        status,
        lastAltered: Date.now(),
        lastAlteredBy,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);
  return { status: StatusCodes.SUCCESS, body: params };
});
