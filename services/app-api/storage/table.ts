import dynamoDb from "../libs/dynamodb-lib";
import { CombinedRateData, Measure } from "@qmr/shared";
import { RateParameters } from "../types";

export const getMeasureFromTable = async (parameters: RateParameters) => {
  const { state, year, coreSet, measure } = parameters;
  return await dynamoDb.get<Measure>({
    TableName: process.env.MeasuresTable,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure: measure,
    },
  });
};

export const putCombinedRatesToTable = async (
  parameters: RateParameters,
  combinedRates: CombinedRateData
) => {
  const { year, state, coreSet, measure } = parameters;
  await dynamoDb.update({
    TableName: process.env.CombinedRatesTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure,
    },
    UpdateExpression: `SET #lastAltered=:lastAltered, #data=:data, #state=:state, #year=:year, #coreSet=:coreSet`,
    ExpressionAttributeNames: {
      "#lastAltered": "lastAltered",
      "#data": "data",
      "#state": "state",
      "#year": "year",
      "#coreSet": "coreSet",
    },
    ExpressionAttributeValues: {
      ":lastAltered": Date.now(),
      ":data": combinedRates,
      ":state": state,
      ":year": year,
      ":coreSet": coreSet,
    },
  });
};

export const getCombinedRatesFromTable = async (
  parameters: RateParameters
): Promise<CombinedRateData> => {
  const { year, state, coreSet, measure } = parameters;
  const queryValue = await dynamoDb.get({
    TableName: process.env.CombinedRatesTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure,
    },
  });
  return (queryValue as any | undefined)?.data as CombinedRateData;
};
