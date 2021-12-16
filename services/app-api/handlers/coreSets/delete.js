import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";

export const deleteCoreSet = handler(async (event, context) => {
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;

  const dynamoKey = createCompoundKey(event);
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
    ...convertToDynamoExpression(
      { state: state, year: year, coreSet: coreSet },
      "list"
    ),
  };
  const queryValue = await dynamoDb.scan(params);
  return queryValue;
};
