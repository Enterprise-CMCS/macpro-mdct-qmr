import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { Errors, StatusCodes } from "../utils/constants/constants";
import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";
import { createDependentMeasures } from "../handlers/coreSets/create";
import { MeasureMetaData, measures } from "../handlers/dynamoUtils/measureList";

export const postToTable = async (
  tableName: string,
  data: any,
  key: any,
  columns: any
) => {
  const params = {
    TableName: tableName,
    Key: { ...key },
    ...convertToDynamoExpression(
      {
        lastAltered: Date.now(),
        data,
        ...columns,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);
  return { status: StatusCodes.SUCCESS, body: params };
};

export const getMeasureFromTable = async (
  parameters: Types.MeasureParameters
) => {
  const { state, year, coreSet, measure } = parameters;
  return await dynamoDb.get<Types.Measure>({
    TableName: process.env.measureTableName,
    Key: {
      compoundKey: `${state}${year}${coreSet}${measure}`,
      coreSet: coreSet,
    },
  });
};

const coreSetGroup = {
  ACS: [Types.CoreSetAbbr.ACSC, Types.CoreSetAbbr.ACSM],
  CCS: [Types.CoreSetAbbr.CCSC, Types.CoreSetAbbr.CCSM],
};

export const getMeasureByCoreSet = async (
  combinedCoreSet: "ACS" | "CCS",
  params: Types.MeasureParameters
) => {
  const gets = coreSetGroup[combinedCoreSet].map((coreSet) =>
    getMeasureFromTable({ ...params, coreSet })
  );
  return Promise.all(gets);
};

export const postCoreSet = async (coreSetParam: Types.CoreSetParameters) => {
  const coreSetQuery = await getCoreSetFromTable(coreSetParam);
  const coreSetExists = coreSetQuery;

  if (coreSetExists) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.CORESET_ALREADY_EXISTS,
    };
  }
  const { state, year, coreSet, lastAlteredBy } = coreSetParam;
  const type = coreSet!.substring(0, 1);

  await createDependentMeasures(
    state,
    parseInt(year),
    coreSet as Types.CoreSetAbbr,
    type
  );

  // filter out qualifier and account for autocomplete measures on creation
  let autoCompletedMeasures = 0;
  const measuresLengthWithoutQualifiers = measures[parseInt(year)].filter(
    (measure: MeasureMetaData) => {
      if (measure.autocompleteOnCreation && measure.type === type) {
        autoCompletedMeasures++;
      }
      return (
        measure.type === type &&
        measure.measure !== "CSQ" &&
        // Filter out placeholder state specific measures
        !measure.placeholder
      );
    }
  ).length;

  const params = {
    TableName: process.env.coreSetTableName!,
    Item: {
      compoundKey: `${state}${year}${coreSet}`,
      state: state,
      year: parseInt(year),
      coreSet: coreSet,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: lastAlteredBy,
      progress: {
        numAvailable: measuresLengthWithoutQualifiers,
        numComplete: autoCompletedMeasures,
      },
      submitted: false,
    },
  };

  await dynamoDb.put(params);
  return { status: StatusCodes.SUCCESS, body: params };
};

export const getCoreSetFromTable = async (
  parameters: Types.CoreSetParameters
) => {
  const { state, year, coreSet } = parameters;
  return await dynamoDb.get<Types.CoreSet>({
    TableName: process.env.coreSetTableName!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      coreSet: coreSet,
    },
  });
};
