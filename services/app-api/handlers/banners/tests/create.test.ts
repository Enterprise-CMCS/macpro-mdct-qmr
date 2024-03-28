import { createBanner } from "../create";
import { APIGatewayProxyEvent } from "../../../types";
import { testBanner, proxyEvent } from "./proxyEvent";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

const mockHasRolePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
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

jest.mock("../../../libs/dynamodb-lib", () => ({
  put: jest.fn().mockResolvedValue("yep i put that thing!"),
}));

describe("Test createBanner API method", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => true);
  });

  test("Test unauthorized user attempt", async () => {
    mockHasRolePermissions.mockImplementation(() => false);
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
