import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";

export const editMeasure = handler(async (event, context) => {
  if (!event.body) return; //handle error here
  if (!event.pathParameters) return; // throw error message
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet
  )
    return; // throw error message

  const { data, status } = JSON.parse(event.body);
  const dynamoKey = createCompoundKey(event);
  const lastAlteredBy = event.headers["cognito-identity-id"]
    ? event.headers["cognito-identity-id"]
    : "branchUser";

  const params = {
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event.pathParameters.coreSet,
    },
    ...convertToDynamoExpression(
      {
        status: status,
        lastAltered: Date.now(),
        lastAlteredBy: lastAlteredBy,
        data: data,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);

  return params;
});
