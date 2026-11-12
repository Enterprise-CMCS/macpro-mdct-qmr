import dynamoDb from "../libs/dynamodb-lib";
import { CoreSet } from "../types";

type StateAndYearParameters = {
  state: string;
  year: number;
};
export type CoreSetParameters = {
  state: string;
  year: number;
  coreSet: string;
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

export const putCoreSetToTable = async (coreSet: CoreSet) => {
  await dynamoDb.put({
    TableName: process.env.QualityCoreSetsTable!,
    Item: coreSet,
  });
};

export const updateCoreSetInTable = async ({
  compoundKey,
  coreSet,
  submitted,
  status,
  lastAltered,
  lastAlteredBy,
}: Pick<
  CoreSet,
  | "compoundKey"
  | "coreSet"
  | "submitted"
  | "status"
  | "lastAltered"
  | "lastAlteredBy"
>) => {
  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Key: { compoundKey, coreSet },
    UpdateExpression:
      "SET submitted = :submitted, #status = :status, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":submitted": submitted,
      ":status": status,
      ":lastAltered": lastAltered,
      ":lastAlteredBy": lastAlteredBy,
    },
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
};
