import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const editCoreSet = handler(async (event, context) => {
  const { status } = JSON.parse(event.body);
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}`;
  const lastAlteredBy = event.headers["cognito-identity-id"]
    ? event.headers["cognito-identity-id"]
    : "branchUser";

  const params = {
    TableName: process.env.coreSetTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
    UpdateExpression:
      "set #s = :s, #lastAltered = :lastAltered, #lastAlteredBy = :lastAlteredBy",
    ExpressionAttributeNames: {
      "#s": "status",
      "#lastAltered": "lastAltered",
      "#lastAlteredBy": "lastAlteredBy",
    },
    ExpressionAttributeValues: {
      ":s": status,
      ":lastAltered": Date.now(),
      ":lastAlteredBy": lastAlteredBy,
    },
  };
  await dynamoDb.update(params);

  return params;
});
