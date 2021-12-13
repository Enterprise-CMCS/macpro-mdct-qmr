import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const createCoreSet = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const id = event.pathParameters.coreSetId;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${id}`;

  const params = {
    TableName: process.env.CORESET_TABLE_NAME,
    Item: {
      compoundKey: dynamoKey,
      state: state,
      year: year,
      id: id,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: "incomplete",
    },
  };

  await dynamoDb.put(params);

  return params;

  // return params.Item;
});
