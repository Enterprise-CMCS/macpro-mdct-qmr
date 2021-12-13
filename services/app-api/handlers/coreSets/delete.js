import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const deleteCoreSet = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const id = event.pathParameters.coreSetId;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${id}`;
  const params = {
    TableName: process.env.CORESET_TABLE_NAME,
    Key: {
      compoundKey: dynamoKey,
      id: id,
    },
  };

  await dynamoDb.delete(params);

  return params;

  // return params.Item;
});
