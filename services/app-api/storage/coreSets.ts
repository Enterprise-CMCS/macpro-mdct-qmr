import dynamoDb from "../libs/dynamodb-lib";
import { CoreSet } from "../types";
import { createDynamoUpdateParams } from "../handlers/dynamoUtils/dynamoParams";

type StateAndYearParameters = {
  state: string;
  year: number;
};
export type CoreSetParameters = {
  state: string;
  year: number;
  coreSet: string;
};
type CoreSetFields = Omit<
  CoreSet,
  "compoundKey" | "state" | "year" | "coreSet"
>;
type CoreSetUpdates = {
  submitted?: boolean;
  status?: string;
  lastAltered?: number;
  lastAlteredBy?: string;
};

export const getCoreSetFromTable = async ({
  state,
  year,
  coreSet,
}: CoreSetParameters) => {
  return await dynamoDb.get<CoreSet>({
    TableName: process.env.QualityCoreSetsTable!,
    Key: { compoundKey: `${state}${year}`, coreSet },
  });
};

export const getCoreSetsFromTable = async ({
  state,
  year,
}: StateAndYearParameters) => {
  return await dynamoDb.queryAll<CoreSet>({
    TableName: process.env.QualityCoreSetsTable!,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: { ":compoundKey": `${state}${year}` },
  });
};

// Mutations return their parameters to preserve the handlers' response bodies.
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
