import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { hasStatePermissions } from "../../libs/authorization";
import { Measure } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseSpecificCoreSetParameters } from "../../utils/parseParameters";

export const deleteCoreSet = handler(async (event, context) => {
  const { allParamsValid, state, year, coreSet } =
    parseSpecificCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to state users from corresponding state
  if (!hasStatePermissions(event)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
  };

  await dynamoDb.delete(params);
  await deleteDependentMeasures(state, parseInt(year), coreSet);

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
