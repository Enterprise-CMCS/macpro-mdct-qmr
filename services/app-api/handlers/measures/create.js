import handler from "../../libs/handler-lib";

export const createMeasure = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  const measure = event.pathParameters.measure;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}${measure}`;

  const params = {
    TableName: process.env.coreSetTableName,
    Item: {
      compoundKey: dynamoKey,
      state: state,
      year: year,
      coreSet: coreSet,
      measure: measure,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: "incomplete",
    },
  };

  await dynamoDb.put(params);

  return params;
});
