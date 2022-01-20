import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";

export const deleteCoreSet = handler(async (event, context) => {
  const state = event!.pathParameters!.state!;
  const year = parseInt(event!.pathParameters!.year!);
  const coreSet = event!.pathParameters!.coreSet!;

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

const deleteDependentMeasures = async (
  state: string,
  year: number,
  coreSet: string
) => {
  const measures = await getMeasures(state, year, coreSet);
  const Items = measures.Items || [];

  for await (const { measure } of Items) {
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

const getMeasures = async (state: string, year: number, coreSet: string) => {
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
