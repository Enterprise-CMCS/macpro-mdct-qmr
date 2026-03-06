import { createBanner } from "../create";
import { testBanner, proxyEvent } from "./proxyEvent";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

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
    mockHasRolePermissions.mockImplementation(() => true);
    event.body = JSON.stringify(testBanner);
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
