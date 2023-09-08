import { createBanner } from "../create";
import { APIGatewayProxyEvent } from "aws-lambda";
import { testBanner, proxyEvent } from "./proxyEvent";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { mockDocumentClient } from "../../../utils/testing/setupJest";

const mockHasRolePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthorized: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
}));

jest.mock("../../../libs/debug-lib", () => ({
  init: jest.fn(),
  flush: jest.fn(),
}));

const testEvent: APIGatewayProxyEvent = {
  ...proxyEvent,
  httpMethod: "PUT",
  body: JSON.stringify(testBanner),
};

const testEventNoTitle: APIGatewayProxyEvent = {
  ...proxyEvent,
  httpMethod: "PUT",
  body: JSON.stringify({ ...testBanner, title: "" }),
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

describe("brax Test createBanner API method", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => {
      return true;
    });
  });

  test("Test unauthorized user attempt", async () => {
    mockHasRolePermissions.mockImplementation(() => {
      return false;
    });
    const res = await createBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Banner Creation", async () => {
    const res = await createBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });

  test("Test invalid banner data", async () => {
    const res = await createBanner(testEventNoTitle, null);
    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.INVALID_DATA);
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
