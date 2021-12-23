import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";

export const editCoreSet = handler(async (event, context) => {
  if (!event.body) return; //error handling logic here
  if (!event.pathParameters || !event.pathParameters.coreSet) return; //error handling here

  const { status } = JSON.parse(event.body);
  const dynamoKey = createCompoundKey(event);
  const lastAlteredBy = event.headers["cognito-identity-id"]
    ? event.headers["cognito-identity-id"]
    : "branchUser";

  const params = {
    TableName: process.env.coreSetTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event.pathParameters.coreSet,
    },
    ...convertToDynamoExpression(
      { status: status, lastAltered: Date.now(), lastAlteredBy: lastAlteredBy },
      "post"
    ),
  };
  await dynamoDb.update(params);

  return params;
});
