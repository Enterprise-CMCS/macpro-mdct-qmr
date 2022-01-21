import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";

export const editMeasure = handler(async (event, context) => {
  const { data, status } = JSON.parse(event!.body!);
  const dynamoKey = createCompoundKey(event);
  const lastAlteredBy = event.headers["cognito-identity-id"]
    ? event.headers["cognito-identity-id"]
    : "branchUser";

  const params = {
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
    ...convertToDynamoExpression(
      {
        status,
        lastAltered: Date.now(),
        lastAlteredBy,
        data,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);

  return params;
});
