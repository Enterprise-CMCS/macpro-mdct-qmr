import dynamoDb from "../libs/dynamodb-lib";
import { RateParameters, CombinedRatesPayload } from "../types";

export const putCombinedRatesToTable = async (
  parameters: RateParameters,
  combinedRates: CombinedRatesPayload
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
): Promise<CombinedRatesPayload> => {
  const { year, state, coreSet, measure } = parameters;
  const queryValue = await dynamoDb.get({
    TableName: process.env.CombinedRatesTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure,
    },
  });
  return (queryValue as any | undefined)?.data as CombinedRatesPayload;
};
