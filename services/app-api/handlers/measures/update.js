import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";

export const editMeasure = handler(async (event, context) => {
  const { data, status } = JSON.parse(event.body);

  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  const measure = event.pathParameters.measure;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}${measure}`;
  const lastAlteredBy = event.headers["cognito-identity-id"]
    ? event.headers["cognito-identity-id"]
    : "branchUser";

  const params = {
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
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
