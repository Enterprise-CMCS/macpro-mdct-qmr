import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const deleteCoreSet = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}`;
  const params = {
    TableName: process.env.coreSetTableName,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
  };

  await dynamoDb.delete(params);

  return params;

  // return params.Item;
});
