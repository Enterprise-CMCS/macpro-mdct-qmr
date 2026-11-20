import type { UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDb from "../libs/dynamodb-lib";
import { Measure, MeasureStatus, RateParameters } from "../types";
import type { CoreSetParameters } from "./coreSets";

const TableName = process.env.MeasuresTable!;

type MeasureUpdates = {
  compoundKey: string;
  measure: string;
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
    TableName,
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
    TableName,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: {
      ":compoundKey": `${state}${year}${coreSet}`,
    },
  });
};

export const putMeasureToTable = async (measure: Measure) => {
  await dynamoDb.put({
    TableName,
    Item: measure,
  });
};

export const updateMeasureInTable = async (fields: MeasureUpdates) => {
  const params: UpdateCommandInput & {
    UpdateExpression: string;
    ExpressionAttributeValues: NonNullable<
      UpdateCommandInput["ExpressionAttributeValues"]
    >;
  } = {
    TableName,
    Key: { compoundKey: fields.compoundKey, measure: fields.measure },
    UpdateExpression:
      "SET #status = :status, reporting = :reporting, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy, #data = :data",
    ExpressionAttributeNames: { "#status": "status", "#data": "data" },
    ExpressionAttributeValues: {
      ":status": fields.status,
      ":reporting": fields.reporting,
      ":lastAltered": fields.lastAltered,
      ":lastAlteredBy": fields.lastAlteredBy,
      ":data": fields.data,
    },
  };

  // We include description fields only when saving from <UpdateInfoModal/>.
  // It is only used to edit descriptions for State-Specific measures.
  if (
    fields.description !== undefined &&
    fields.detailedDescription !== undefined
  ) {
    params.UpdateExpression +=
      ", description = :description, detailedDescription = :detailedDescription";
    params.ExpressionAttributeValues = {
      ...params.ExpressionAttributeValues,
      ":description": fields.description,
      ":detailedDescription": fields.detailedDescription,
    };
  }

  await dynamoDb.update(params);
};

export const deleteMeasureFromTable = async ({
  state,
  year,
  coreSet,
  measure,
}: RateParameters) => {
  await dynamoDb.delete({
    TableName,
    Key: { compoundKey: `${state}${year}${coreSet}`, measure },
  });
};
