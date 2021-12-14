import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const deleteCoreSet = handler(async (event, _context) => {
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
  await deleteDependentMeasures(state, year, coreSet);

  return params;
});

const deleteDependentMeasures = async (state, year, coreSet) => {
  const measures = await getMeasures(state, year, coreSet);
  for await (const { measure } of measures.Items) {
    // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
    const dynamoKey = `${state}${year}${coreSet}${measure}`;
    const params = {
      TableName: process.env.measureTableName,
      Key: {
        compoundKey: dynamoKey,
        coreSet: coreSet,
      },
    };

    console.log("created measure: ", params);
    await dynamoDb.delete(params);
  }
};

const getMeasures = async (state, year, coreSet) => {
  const params = {
    TableName: process.env.measureTableName,
    FilterExpression: "#yr = :yr AND #st = :st AND #cs = :cs",
    ExpressionAttributeNames: {
      "#yr": "year",
      "#st": "state",
      "#cs": "coreSet",
    },
    ExpressionAttributeValues: {
      ":yr": year,
      ":st": state,
      ":cs": coreSet,
    },
  };
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
};
