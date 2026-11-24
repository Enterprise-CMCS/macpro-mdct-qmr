import dynamoDb from "../libs/dynamodb-lib";
import { CoreSet } from "@qmr/shared";

const TableName = process.env.QualityCoreSetsTable!;

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
    TableName,
    Key: { compoundKey: `${state}${year}`, coreSet },
  });
};

export const getCoreSetsFromTable = async ({
  state,
  year,
}: StateAndYearParameters) => {
  return await dynamoDb.queryAll<CoreSet>({
    TableName,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: { ":compoundKey": `${state}${year}` },
  });
};

export const putCoreSetToTable = async (coreSet: CoreSet) => {
  await dynamoDb.put({
    TableName,
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
  await dynamoDb.update({
    TableName,
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
  });
};

export const deleteCoreSetFromTable = async ({
  state,
  year,
  coreSet,
}: CoreSetParameters) => {
  await dynamoDb.delete({
    TableName,
    Key: { compoundKey: `${state}${year}`, coreSet },
  });
};
