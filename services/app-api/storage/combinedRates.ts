import dynamoDb from "../libs/dynamodb-lib";
import { RateParameters } from "../types";
import { CombinedRateData } from "@qmr/shared";

const TableName = process.env.CombinedRatesTable!;

export const putCombinedRatesToTable = async (
  parameters: RateParameters,
  combinedRates: CombinedRateData
) => {
  const { year, state, coreSet, measure } = parameters;
  await dynamoDb.update({
    TableName,
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
    TableName,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure,
    },
  });
  return (queryValue as any | undefined)?.data as CombinedRateData;
};
