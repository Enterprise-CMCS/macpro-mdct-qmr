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
    };
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(banner);

    expect(await getBannerFromTable("admin-banner")).toBe(banner);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-banner",
      Key: { key: "admin-banner" },
    });
  });

  it("should put a banner without changing payload or timestamps", async () => {
    await putBannerToTable({ key: "admin-banner", ...bannerFields });

    expect(dynamodbLib.put).toHaveBeenCalledWith({
      TableName: "local-banner",
      Item: { key: "admin-banner", ...bannerFields },
    });
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
});
