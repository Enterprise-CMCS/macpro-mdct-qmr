import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const editCoreSet = handler(async (event, context) => {
  // action limited to state users from corresponding state
  if (!hasStatePermissions(event)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const { submitted, status } = JSON.parse(event!.body!);
  const dynamoKey = createCompoundKey(event);
  const lastAlteredBy = getUserNameFromJwt(event);
  const params = {
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
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
