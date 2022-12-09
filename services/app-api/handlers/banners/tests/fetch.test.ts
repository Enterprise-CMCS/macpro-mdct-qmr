import { fetchBanner } from "../fetch";
import { APIGatewayProxyEvent } from "aws-lambda";
import { proxyEvent } from "./proxyEvent";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import {
  mockBannerResponse,
  mockDocumentClient,
} from "../../../utils/testing/setupJest";

jest.mock("../../../libs/authorization", () => ({
  isAuthorized: jest.fn().mockReturnValue(true),
  hasPermissions: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/debug-lib", () => ({
  init: jest.fn(),
  flush: jest.fn(),
}));

const testEvent: APIGatewayProxyEvent = {
  ...proxyEvent,
  headers: { "cognito-identity-id": "test" },
  pathParameters: { bannerId: "testKey" },
};

describe("Test fetchBanner API method", () => {
  test("Test Report not found Fetch", async () => {
    jest.spyOn(dynamoDb, "get").mockImplementation(
      mockDocumentClient.get.promise.mockReturnValueOnce({
        Item: undefined,
      })
    );
    const res = await fetchBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(JSON.parse(res.body).status).toBe(StatusCodes.NOT_FOUND);
  });

  test("Test Successful Banner Fetch", async () => {
    jest.spyOn(dynamoDb, "get").mockImplementation(
      mockDocumentClient.get.promise.mockReturnValueOnce({
        Item: mockBannerResponse,
      })
    );
    const res = await fetchBanner(testEvent, null);
    const parsedRes = JSON.parse(res.body);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(parsedRes.status).toBe(StatusCodes.SUCCESS);
    expect(parsedRes.body.Item.title).toEqual("testTitle");
    expect(parsedRes.body.Item.description).toEqual("testDesc");
  });

  test("Test bannerKey not provided throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: {},
    };
    const res = await fetchBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: { bannerId: "" },
    };
    const res = await fetchBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
