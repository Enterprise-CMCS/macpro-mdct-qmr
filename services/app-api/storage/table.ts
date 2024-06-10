import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { getUserNameFromJwt } from "../libs/authorization";
import { APIGatewayProxyEvent } from "../types";
import { StatusCodes } from "../utils/constants/constants";
import dynamoDb from "../libs/dynamodb-lib";
import * as Types from "../types";
import { getMeasure } from "../handlers/measures/get";

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

export const getMeasureByCoreSet = async (
  event: APIGatewayProxyEvent,
  coreSet: "ACS" | "CCS" | "HHCS" | undefined
) => {
  const measures: any[] = [];
  if (coreSet) {
    const group = coreSetGroup[coreSet];

    for (let i = 0; i < group.length; i++) {
      const formatEvent = { ...event };
      if (formatEvent?.pathParameters) {
        formatEvent.pathParameters.coreSet = group[i];
        const measure = await getMeasure(event, undefined);
        measures.push({ coreSet: group[i], ...JSON.parse(measure.body)?.Item });
      }
    }
  }
  return measures;
};
