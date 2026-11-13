import { CoreSet, CoreSetAbbr, Measure, MeasureStatuses } from "@qmr/shared";
import { APIGatewayProxyEvent } from "../types";

export const testEvent: APIGatewayProxyEvent = {
  body: "{}",
  headers: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: {},
  path: "",
  pathParameters: {},
  resource: "",
  stageVariables: null,
  queryStringParameters: {},
  requestContext: {
    /* not here */
  },
};

export const testCoreSet: CoreSet = {
  compoundKey: "",
  coreSet: CoreSetAbbr.ACS,
  createdAt: 0,
  lastAltered: 0,
  progress: { numAvailable: 0, numComplete: 0 },
  state: "",
  submitted: true,
  year: 2019,
  lastAlteredBy: "",
};

export const testMeasure: Measure = {
  compoundKey: "",
  coreSet: CoreSetAbbr.ACS,
  createdAt: 0,
  description: "",
  lastAltered: 0,
  measure: "",
  state: "",
  status: MeasureStatuses.Incomplete,
  year: 2019,
  lastAlteredBy: "",
};
