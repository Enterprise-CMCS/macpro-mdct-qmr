import { APIGatewayProxyEvent, EventParameters } from "../../../types";

export const testBanner = {
  title: "test banner",
  description: "test description",
  link: "https://www.mocklink.com",
  startDate: 1000,
  endDate: 2000,
};

export const proxyEvent: APIGatewayProxyEvent = {
  body: "{}",
  headers: { "x-api-key": "test" } as EventParameters,
  httpMethod: "GET",
  isBase64Encoded: false,
  multiValueHeaders: {} as EventParameters,
  multiValueQueryStringParameters: {} as EventParameters,
  path: "",
  pathParameters: { bannerId: "admin-banner-id" } as EventParameters,
  resource: "",
  stageVariables: null,
  queryStringParameters: { bannerId: "testKey" } as EventParameters,
  requestContext: {
    /* nope */
  },
};
