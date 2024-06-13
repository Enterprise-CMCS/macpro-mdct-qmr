import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { StatusCodes } from "../utils/constants/constants";
import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";
import { MeasureParameters } from "../types";

export const putToTable = async (
  tableName: string,
  data: any,
  key: any,
  columns: any
) => {
  const params = {
    TableName: tableName,
    Key: { ...key },
    ...convertToDynamoExpression(
      {
        lastAltered: Date.now(),
        data,
        ...columns,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);
  return { status: StatusCodes.SUCCESS, body: params };
};

export const getMeasureFromTable = async (parameters: MeasureParameters) => {
  const { state, year, coreSet, measure } = parameters;
  return await dynamoDb.get<Types.Measure>({
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: `${state}${year}${coreSet}${measure}`,
      coreSet: coreSet,
    },
  });
};

const coreSetGroup = {
  ACS: [Types.CoreSetAbbr.ACSC, Types.CoreSetAbbr.ACSM],
  CCS: [Types.CoreSetAbbr.CCSC, Types.CoreSetAbbr.CCSM],
};

export const getMeasureByCoreSet = async (
  combinedCoreSet: "ACS" | "CCS",
  params: MeasureParameters
) => {
  const gets = coreSetGroup[combinedCoreSet].map((coreSet) =>
    getMeasureFromTable({ ...params, coreSet })
  );
  return Promise.all(gets);
};
