import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const deleteMeasure = handler(async (event, context) => {
  // The State Year and ID are all part of the path
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
  };

  await dynamoDb.delete(params);

  return params;

  // return params.Item;
});
