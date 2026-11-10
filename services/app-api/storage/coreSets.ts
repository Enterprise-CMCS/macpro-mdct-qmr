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
type CoreSetUpdates = Pick<
  CoreSet,
  "submitted" | "status" | "lastAltered" | "lastAlteredBy"
>;

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
  coreSet: Omit<CoreSet, "compoundKey">
) => {
  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Item: {
      compoundKey: `${coreSet.state}${coreSet.year}`,
      ...coreSet,
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
    UpdateExpression:
      "SET submitted = :submitted, #status = :status, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":submitted": fields.submitted,
      ":status": fields.status,
      ":lastAltered": fields.lastAltered,
      ":lastAlteredBy": fields.lastAlteredBy,
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
