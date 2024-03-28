import { deleteBanner } from "../delete";
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
  httpMethod: "DEL",
};

jest.mock("../../../libs/dynamodb-lib", () => ({
  delete: jest.fn().mockResolvedValue("DELETED"),
}));

describe("Test deleteBanner API method", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => true);
  });

  test("Test Successful Banner Deletion", async () => {
    const res = await deleteBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });

  test("Test unauthorized user attempt", async () => {
    mockHasRolePermissions.mockImplementation(() => false);
    const res = await deleteBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test bannerKey not provided throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: {},
    };
    const res = await deleteBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: { bannerId: "" },
    };
    const res = await deleteBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
