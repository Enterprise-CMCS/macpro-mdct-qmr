import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";
import { RateParameters, CombinedRatesPayload } from "../types";

export const getMeasureFromTable = async (parameters: RateParameters) => {
  const { state, year, coreSet, measure } = parameters;
  return await dynamoDb.get<Types.Measure>({
    TableName: process.env.measureTable,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure: measure,
    },
  });
};

export const putCombinedRatesToTable = async (
  parameters: RateParameters,
  combinedRates: CombinedRatesPayload
) => {
  const { year, state, coreSet, measure } = parameters;
  await dynamoDb.update({
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: `${state}${year}${coreSet}${measure}`,
      measure,
    },
    UpdateExpression: `SET #lastAltered=:lastAltered, #data=:data, #state=:state`,
    ExpressionAttributeNames: {
      "#lastAltered": "lastAltered",
      "#data": "data",
      "#state": "state",
    },
    ExpressionAttributeValues: {
      ":lastAltered": Date.now(),
      ":data": combinedRates,
      ":state": state,
    },
  });
};

export const getCombinedRatesFromTable = async (
  parameters: RateParameters
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
