import { deleteBanner } from "../delete";
import { proxyEvent } from "./proxyEvent";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

const mockHasRolePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  hasRolePermissions: () => mockHasRolePermissions(),
}));

const event = { ...proxyEvent, httpMethod: "DEL" };

jest.mock("../../../libs/dynamodb-lib", () => ({
  delete: jest.fn().mockResolvedValue("DELETED"),
}));

describe("Test deleteBanner API method", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => true);
  });

  test("Test Successful Banner Deletion", async () => {
    const res = await deleteBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });

  test("Test unauthorized user attempt", async () => {
    mockHasRolePermissions.mockImplementation(() => false);
    const res = await deleteBanner(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test bannerKey not provided throws bad request error", async () => {
    event.pathParameters = {};
    const res = await deleteBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws bad request error", async () => {
    event.pathParameters = { bannerId: "" };
    const res = await deleteBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey invalid throws bad request error", async () => {
    event.pathParameters = { bannerId: "hi-how-are-you" };
    const res = await deleteBanner(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
