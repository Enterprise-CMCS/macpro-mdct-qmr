import { createBanner } from "../create";
import { APIGatewayProxyEvent } from "aws-lambda";
import { testBanner, proxyEvent } from "./proxyEvent";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { mockDocumentClient } from "../../../utils/testing/setupJest";

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
  httpMethod: "PUT",
  body: JSON.stringify({ testBanner }),
};

jest.spyOn(dynamoDb, "put").mockImplementation(
  mockDocumentClient.put.promise.mockReturnValue({
    Item: {
      ...testBanner,
      createdAt: new Date().getTime(),
      lastAltered: new Date().getTime(),
    },
  })
);

describe("Test createBanner API method", () => {
  test("Test Successful Run of Banner Creation", async () => {
    const res = await createBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(JSON.parse(res.body).status).toBe(StatusCodes.CREATED);
  });

  test("Test bannerKey not provided throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: {},
    };
    const res = await createBanner(noKeyEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: { bannerId: "" },
    };
    const res = await createBanner(noKeyEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
