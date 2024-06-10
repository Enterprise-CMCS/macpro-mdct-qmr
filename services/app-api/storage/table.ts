import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { StatusCodes } from "../utils/constants/constants";
import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";\

const coreSetGroup = {
  ACS: [Types.CoreSetAbbr.ACSC, Types.CoreSetAbbr.ACSM],
  CCS: [Types.CoreSetAbbr.CCSC, Types.CoreSetAbbr.CCSM],
  HHCS: [Types.CoreSetAbbr.HHCS],
};

export const putToTable = async (
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

export const getMeasureFromTable = async (tableName: string, columns: any) => {
  const params = {
    TableName: tableName,
    ...convertToDynamoExpression(
      columns,
      "list"
    ),
  };
  let results = await dynamoDb.scanAll<Types.Measure>(params);
  return results;
};

export const getMeasureByCoreSet = async (
  coreSet: "ACS" | "CCS" | "HHCS" | undefined,
  pathParams: any
) => {
  const measures: any[] = [];
  if (coreSet) {
    const group = coreSetGroup[coreSet];

    for (let i = 0; i < group.length; i++) {
      const measure = await getMeasureFromTable(process.env.measureTableName!, {
        compoundKey: `${pathParams.state}${pathParams.year}${group[i]}${pathParams.measure}`,
        coreSet: group[i],
      });
      measures.push(measure[0]);
    }
  }
  return measures;
};
