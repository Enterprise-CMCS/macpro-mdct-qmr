import { createBanner } from "../create";
import { testBanner, proxyEvent } from "./proxyEvent";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import dynamoDb from "../../../libs/dynamodb-lib";

const mockHasRolePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  hasRolePermissions: () => mockHasRolePermissions(),
}));

const event = { ...proxyEvent, httpMethod: "PUT" };

jest.mock("../../../libs/dynamodb-lib", () => ({
  put: jest.fn().mockResolvedValue("yep i put that thing!"),
}));

describe("Test createBanner API method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHasRolePermissions.mockImplementation(() => true);
    event.body = JSON.stringify(testBanner);
    event.headers = { ...proxyEvent.headers };
    event.pathParameters = { ...proxyEvent.pathParameters };
  });

  test("Test unauthorized user attempt", async () => {
    mockHasRolePermissions.mockImplementation(() => false);
    const res = await createBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Banner Creation", async () => {
    const res = await createBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });

  test("Stores a banner without an identity header", async () => {
    const res = await createBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(dynamoDb.put).toHaveBeenCalledWith({
      TableName: process.env.BannersTable,
      Item: {
        key: "admin-banner-id",
        createdAt: expect.any(Number),
        lastAltered: expect.any(Number),
        lastAlteredBy: undefined,
        ...testBanner,
      },
    });
  });

  test("Stores the identity header when provided", async () => {
    event.headers["cognito-identity-id"] = "admin-user";

    const res = await createBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(dynamoDb.put).toHaveBeenCalledWith(
      expect.objectContaining({
        Item: expect.objectContaining({ lastAlteredBy: "admin-user" }),
      })
    );
  });

  test.each([
    { title: 123 },
    { description: {} },
    { startDate: "1000" },
    { endDate: "2000" },
    { title: null },
    { description: "" },
    { startDate: 0 },
    { endDate: 0 },
  ])("Rejects invalid banner fields: %j", async (fields) => {
    event.body = JSON.stringify({ ...testBanner, ...fields });

    const res = await createBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.INVALID_DATA);
    expect(dynamoDb.put).not.toHaveBeenCalled();
  });

  test("Test invalid banner data", async () => {
    event.body = JSON.stringify({ ...testBanner, title: "" });
    const res = await createBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.INVALID_DATA);
  });

  test("Test bannerKey not provided throws bad request error", async () => {
    event.pathParameters = {};
    const res = await createBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws bad request error", async () => {
    event.pathParameters = { bannerId: "" };
    const res = await createBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey invalid throws bad request error", async () => {
    event.pathParameters = { bannerId: "bad-banner-id" };
    const res = await createBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
