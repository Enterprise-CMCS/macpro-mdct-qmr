import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { StatusCodes } from "../utils/constants/constants";
import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";
import { MeasureParameters, CombinedRatesPayload } from "../types";

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

export const putCombinedRatesToTable = async (
  parameters: MeasureParameters,
  formattedMeasures: CombinedRatesPayload
) => {
  const { year, state, coreSet, measure } = parameters;
  await dynamoDb.update({
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: `${state}${year}${coreSet}${measure}`,
      measure,
    },
    UpdateExpression: `SET #lastAltered=:lastAltered, #data=:data, #measure=:measure`,
    ExpressionAttributeNames: {
      "#lastAltered": "lastAltered",
      "#data": "data",
      "#measure": "measure",
    },
    ExpressionAttributeValues: {
      ":lastAltered": Date.now(),
      ":data": formattedMeasures,
      ":measure": measure,
    },
  });
};

export const getCombinedRatesFromTable = async (
  parameters: MeasureParameters
): Promise<CombinedRatesPayload> => {
  const { year, state, coreSet, measure } = parameters;
  const queryValue = await dynamoDb.get({
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: `${state}${year}${coreSet}${measure}`,
      measure,
    },
  });
  return (queryValue as any | undefined)?.data as CombinedRatesPayload;
};
