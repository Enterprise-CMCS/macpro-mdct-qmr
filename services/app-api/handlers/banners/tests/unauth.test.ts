import { createBanner } from "../create";
import { deleteBanner } from "../delete";
import { testBanner, proxyEvent } from "./proxyEvent";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/authorization", () => ({
  isAuthorized: jest.fn().mockReturnValue(false),
  hasPermissions: jest.fn().mockReturnValue(true),
}));

describe("Test unauthorized user", () => {
  test("Test unauthorized banner creation throws 403 error", async () => {
    const res = await createBanner(
      { ...proxyEvent, httpMethod: "PUT", body: JSON.stringify(testBanner) },
      null
    );
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test not authorized to delete banner throws 403 error", async () => {
    const res = await deleteBanner({ ...proxyEvent, httpMethod: "DEL" }, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });
});
