import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

// import dynamoDb from "./../libs/dynamodb-lib";

export const coreSetList = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const id = event.pathParameters.coreSetId;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${id}`;
  const params = {
    TableName: process.env.CORESET_TABLE_NAME,
    ProjectionExpression: "#yr, #st",
    FilterExpression: "#yr = :yr AND #st = :st",
    ExpressionAttributeNames: {
      "#yr": "year",
      "#st": "state",
    },
    ExpressionAttributeValues: {
      ":yr": year,
      ":st": state,
    },
  };
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
});

export const getCoreSet = handler(async (event, context) => {
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
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
