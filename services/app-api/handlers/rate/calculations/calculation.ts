import dynamoDb from "../../../libs/dynamodb-lib";
import { getUserNameFromJwt } from "../../../libs/authorization";
import { APIGatewayProxyEvent } from "../../../types";
import { StatusCodes } from "../../../utils/constants/constants";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import * as Types from "../../../types";
import { getMeasure } from "../../measures/get";
import { adminstrativeCalculation } from "./adminstrativeCalculation";

const coreSetGroup = {
  ACS: [Types.CoreSetAbbr.ACSC, Types.CoreSetAbbr.ACSM],
  CCS: [Types.CoreSetAbbr.CCSC, Types.CoreSetAbbr.CCSM],
};

export const createCombinedCompoundKey = (
  event: APIGatewayProxyEvent,
  coreSet: Types.CoreSetAbbr
) => {
  if (!event.pathParameters) throw new Error("No Path Parameters Object");

  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const measure = event.pathParameters.measure ?? "";

  return `${state}${year}${coreSet}${measure}`;
};

const retrieveMeasureDataByCoreSet = async (
  event: APIGatewayProxyEvent,
  coreSet: "ACS" | "CCS" | undefined
) => {
  if (coreSet) {
    const measures: any[] = [];
    const group = coreSetGroup[coreSet];

    for (let i = 0; i < group.length; i++) {
      const formatEvent = { ...event };
      if (formatEvent?.pathParameters) {
        formatEvent.pathParameters.coreSet = group[i];
        const measure = await getMeasure(event, undefined);
        measures.push({ coreSet: group[i], ...JSON.parse(measure.body)?.Item });
      }
    }
    return measures;
  }
  return {};
};

const formatRetrieveData = (data: any) => {
  return data.map((item: any) => {
    const coreSet = item?.coreSet;
    const dataSource = item?.data?.DataSource ?? [];
    const rates = item?.data?.PerformanceMeasure?.rates ?? {};

    return { coreSet, dataSource, rates };
  });
};

export const calculateRate = async (
  event: APIGatewayProxyEvent,
  context: any
) => {
  const coreSet: Types.CoreSetAbbr = event!.pathParameters!
    .coreSet! as Types.CoreSetAbbr;
  const combinedTypes = [Types.CoreSetAbbr.ACS, Types.CoreSetAbbr.CCS];
  const combinedCoreSet = combinedTypes.find((type) => coreSet.includes(type));

  //only do the rate calculation if the measure is adult or child and is a split
  if (
    (coreSet.length === 4 && combinedCoreSet === "ACS") ||
    combinedCoreSet === "CCS"
  ) {
    const coreSetData = await retrieveMeasureDataByCoreSet(
      event,
      combinedCoreSet
    );
    const formattedData = formatRetrieveData(coreSetData);

    const combinedRates = adminstrativeCalculation(
      event!.pathParameters!.measure!,
      formattedData?.map((data: any) => data.rates)
    );

    formattedData.push(combinedRates);

    await saveToTable(event, combinedCoreSet!, formattedData);
  }
};

const saveToTable = async (
  event: APIGatewayProxyEvent,
  coreSet: Types.CoreSetAbbr,
  data: any
) => {
  const dynamoKey = createCombinedCompoundKey(event, coreSet);
  const lastAlteredBy = getUserNameFromJwt(event);

  const params = {
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: dynamoKey,
      measure: event!.pathParameters!.measure!,
    },
    ...convertToDynamoExpression(
      {
        lastAltered: Date.now(),
        lastAlteredBy,
        data,
        state: event!.pathParameters!.state!,
        year: event!.pathParameters!.year!,
      },
      "post"
    ),
  };

  await dynamoDb.update(params);
  return { status: StatusCodes.SUCCESS, body: params };
};
