import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { hasStatePermissions } from "../../libs/authorization";
import { Measure } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const deleteCoreSet = handler(async (event, context) => {
  // action limited to state users from corresponding state
  if (!hasStatePermissions(event)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const state = event!.pathParameters!.state!;
  const year = parseInt(event!.pathParameters!.year!);
  const coreSet = event!.pathParameters!.coreSet!;

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
  };

  await dynamoDb.delete(params);
  await deleteDependentMeasures(state, year, coreSet);

  return {
    status: StatusCodes.SUCCESS,
    body: params,
  };
});

const deleteDependentMeasures = async (
  state: string,
  year: number,
  coreSet: string
) => {
  const measures = await getMeasures(state, year, coreSet);
  const Items = measures;

  for await (const { measure } of Items) {
    const dynamoKey = `${state}${year}${coreSet}${measure}`;
    const params = {
      TableName: process.env.measureTableName!,
      Key: {
        compoundKey: dynamoKey,
        coreSet: coreSet,
      },
    };

    await dynamoDb.delete(params);
  }
};

const getMeasures = async (state: string, year: number, coreSet: string) => {
  const params = {
    TableName: process.env.measureTableName!,
    ...convertToDynamoExpression(
      { state: state, year: year, coreSet: coreSet },
      "list"
    ),
  };
  const queryValue = await dynamoDb.scanAll<Measure>(params);
  return queryValue;
};
