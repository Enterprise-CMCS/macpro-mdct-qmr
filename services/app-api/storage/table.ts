import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";
import { RateParameters, CombinedRatesPayload } from "../types";
import { createDynamoUpdateParams } from "../handlers/dynamoUtils/dynamoParams";

type StateAndYearParameters = {
  state: string;
  year: number;
};
type CoreSetParameters = {
  state: string;
  year: number;
  coreSet: string;
};
type MeasureFields = Omit<
  Types.Measure,
  "compoundKey" | "state" | "year" | "coreSet" | "measure"
>;
type CoreSetFields = Omit<
  Types.CoreSet,
  "compoundKey" | "state" | "year" | "coreSet"
>;
type MeasureUpdates = {
  description?: string;
  detailedDescription?: string;
  status?: Types.MeasureStatus;
  reporting?: string | null;
  lastAltered?: number;
  lastAlteredBy?: string;
  data?: Types.Measure["data"];
};
type CoreSetUpdates = {
  submitted?: boolean;
  status?: string;
  lastAltered?: number;
  lastAlteredBy?: string;
};
type BannerFields = Omit<Types.Banner, "key" | "createdAt" | "lastAltered"> & {
  createdAt: number;
  lastAltered: number;
};

// Mutations return their parameters to preserve the handlers' response bodies.
export const putMeasureToTable = async (
  parameters: RateParameters,
  fields: MeasureFields
) => {
  const { state, year, coreSet, measure } = parameters;
  const params = {
    TableName: process.env.MeasuresTable!,
    Item: {
      compoundKey: `${state}${year}${coreSet}`,
      state,
      year,
      coreSet,
      measure,
      ...fields,
    },
  };
  await dynamoDb.put(params);
  return params;
};

export const getMeasuresFromTable = async ({
  state,
  year,
  coreSet,
}: CoreSetParameters) => {
  return await dynamoDb.queryAll<Types.Measure>({
    TableName: process.env.MeasuresTable!,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: {
      ":compoundKey": `${state}${year}${coreSet}`,
    },
  });
};

export const updateMeasureInTable = async (
  { state, year, coreSet, measure }: RateParameters,
  fields: MeasureUpdates
) => {
  const params = {
    TableName: process.env.MeasuresTable!,
    Key: { compoundKey: `${state}${year}${coreSet}`, measure },
    ...createDynamoUpdateParams(fields),
  };
  await dynamoDb.update(params);
  return params;
};

export const deleteMeasureFromTable = async ({
  state,
  year,
  coreSet,
  measure,
}: RateParameters) => {
  const params = {
    TableName: process.env.MeasuresTable!,
    Key: { compoundKey: `${state}${year}${coreSet}`, measure },
  };
  await dynamoDb.delete(params);
  return params;
};

export const getCoreSetFromTable = async ({
  state,
  year,
  coreSet,
}: CoreSetParameters) => {
  return await dynamoDb.get<Types.CoreSet>({
    TableName: process.env.QualityCoreSetsTable!,
    Key: { compoundKey: `${state}${year}`, coreSet },
  });
};

export const getCoreSetsFromTable = async ({
  state,
  year,
}: StateAndYearParameters) => {
  return await dynamoDb.queryAll<Types.CoreSet>({
    TableName: process.env.QualityCoreSetsTable!,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: { ":compoundKey": `${state}${year}` },
  });
};

export const putCoreSetToTable = async (
  { state, year, coreSet }: CoreSetParameters,
  fields: CoreSetFields
) => {
  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Item: {
      compoundKey: `${state}${year}`,
      state,
      year,
      coreSet,
      ...fields,
    },
  };
  await dynamoDb.put(params);
  return params;
};

export const updateCoreSetInTable = async (
  { state, year, coreSet }: CoreSetParameters,
  fields: CoreSetUpdates
) => {
  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Key: { compoundKey: `${state}${year}`, coreSet },
    ...createDynamoUpdateParams(fields),
  };
  await dynamoDb.update(params);
  return params;
};

export const deleteCoreSetFromTable = async ({
  state,
  year,
  coreSet,
}: CoreSetParameters) => {
  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Key: { compoundKey: `${state}${year}`, coreSet },
  };
  await dynamoDb.delete(params);
  return params;
};

export const getBannerFromTable = async (bannerId: string) => {
  return await dynamoDb.get<Types.Banner>({
    TableName: process.env.BannersTable!,
    Key: { key: bannerId },
  });
};

export const putBannerToTable = async (
  bannerId: string,
  fields: BannerFields
) => {
  const params = {
    TableName: process.env.BannersTable!,
    Item: { key: bannerId, ...fields },
  };
  await dynamoDb.put(params);
  return params;
};

export const deleteBannerFromTable = async (bannerId: string) => {
  const params = {
    TableName: process.env.BannersTable!,
    Key: { key: bannerId },
  };
  await dynamoDb.delete(params);
  return params;
};

export const getMeasureFromTable = async (parameters: RateParameters) => {
  const { state, year, coreSet, measure } = parameters;
  return await dynamoDb.get<Types.Measure>({
    TableName: process.env.MeasuresTable,
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
