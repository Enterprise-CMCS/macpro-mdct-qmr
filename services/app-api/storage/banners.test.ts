import {
  getBannerFromTable,
  putBannerToTable,
  deleteBannerFromTable,
} from "./banners";
import dynamodbLib from "../libs/dynamodb-lib";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const bannerFields = {
  title: "Maintenance",
  description: "Scheduled maintenance",
  startDate: 100,
  endDate: 200,
  createdAt: 10,
  lastAltered: 20,
  lastAlteredBy: "admin",
};

describe("Banner storage methods", () => {
  beforeAll(() => {
    process.env.BannersTable = "local-banner";
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a banner", async () => {
    const banner = {
      key: "admin-banner",
      ...bannerFields,
      createdAt: new Date(10),
      lastAltered: new Date(20),
    };
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(banner);

    expect(await getBannerFromTable("admin-banner")).toBe(banner);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-banner",
      Key: { key: "admin-banner" },
    });
  });

  it("should put a banner without changing payload or timestamps", async () => {
    const params = await putBannerToTable("admin-banner", bannerFields);

    expect(params).toEqual({
      TableName: "local-banner",
      Item: { key: "admin-banner", ...bannerFields },
    });
    expect(dynamodbLib.put).toHaveBeenCalledWith(params);
  });

  it("should delete only the requested banner and return its parameters", async () => {
    const params = await deleteBannerFromTable("admin-banner");

    expect(params).toEqual({
      TableName: "local-banner",
      Key: { key: "admin-banner" },
    });
    expect(dynamodbLib.delete).toHaveBeenCalledWith(params);
  });

  it("should preserve missing records", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValue(undefined);

    expect(await getBannerFromTable("admin-banner")).toBeUndefined();
  });

  it.each([
    ["get banner", "get", () => getBannerFromTable("admin-banner")],
    ["put banner", "put", () => putBannerToTable("admin-banner", bannerFields)],
    ["delete banner", "delete", () => deleteBannerFromTable("admin-banner")],
  ] as const)(
    "should propagate database errors for %s",
    async (_name, method, operation) => {
      const error = new Error("Database unavailable");
      jest.mocked(dynamodbLib[method]).mockRejectedValueOnce(error);

      await expect(operation()).rejects.toBe(error);
    }
  );
});
