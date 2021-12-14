import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const editMeasure = handler(async (event, _context) => {
  const { data, status } = JSON.parse(event.body);

  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  const measure = event.pathParameters.measure;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}${measure}`;

  const params = {
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
    UpdateExpression:
      "set #s = :s, #data = :data, #lastAltered = :lastAltered, #lastAlteredBy = :lastAlteredBy",
    ExpressionAttributeNames: {
      "#s": "status",
      "#data": "data",
      "#lastAltered": "lastAltered",
      "#lastAlteredBy": "lastAlteredBy",
    },
    ExpressionAttributeValues: {
      ":s": status,
      ":data": data,
      ":lastAltered": Date.now(),
      ":lastAlteredBy": event.headers["cognito-identity-id"],
    },
  };
  await dynamoDb.update(params);

  return params;
});
