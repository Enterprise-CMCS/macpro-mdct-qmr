import dynamoDb from "../libs/dynamodb-lib";
import { Measure, MeasureStatus, RateParameters } from "../types";
import type { CoreSetParameters } from "./coreSets";

type MeasureFields = Omit<
  Measure,
  "compoundKey" | "state" | "year" | "coreSet" | "measure"
>;
type MeasureUpdates = {
  description?: string;
  detailedDescription?: string;
  status?: MeasureStatus;
  reporting?: string | null;
  lastAltered?: number;
  lastAlteredBy?: string;
  data?: Measure["data"];
};

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

export const getMeasuresFromTable = async ({
  state,
  year,
  coreSet,
}: CoreSetParameters) => {
  return await dynamoDb.queryAll<Measure>({
    TableName: process.env.MeasuresTable!,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: {
      ":compoundKey": `${state}${year}${coreSet}`,
    },
  });
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

export const updateMeasureInTable = async (
  { state, year, coreSet, measure }: RateParameters,
  fields: MeasureUpdates
) => {
  const updateDescriptions =
    fields.description !== undefined &&
    fields.detailedDescription !== undefined;
  const params = {
    TableName: process.env.MeasuresTable!,
    Key: { compoundKey: `${state}${year}${coreSet}`, measure },
    UpdateExpression:
      "SET #status = :status, reporting = :reporting, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy, #data = :data" +
      (updateDescriptions
        ? ", description = :description, detailedDescription = :detailedDescription"
        : ""),
    ExpressionAttributeNames: { "#status": "status", "#data": "data" },
    ExpressionAttributeValues: {
      ":status": fields.status,
      ":reporting": fields.reporting,
      ":lastAltered": fields.lastAltered,
      ":lastAlteredBy": fields.lastAlteredBy,
      ":data": fields.data,
      ...(updateDescriptions
        ? {
            ":description": fields.description,
            ":detailedDescription": fields.detailedDescription,
          }
        : {}),
    },
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
