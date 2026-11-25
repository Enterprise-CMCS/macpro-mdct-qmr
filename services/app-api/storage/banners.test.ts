process.env.BannersTable = "local-banner";

import {
  getBannerFromTable,
  putBannerToTable,
  deleteBannerFromTable,
} from "./banners";
import dynamodbLib from "../libs/dynamodb-lib";
import { Banner } from "@qmr/shared";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const banner: Banner = {
  key: "admin-banner-id",
  title: "Maintenance",
  description: "Scheduled maintenance",
  startDate: 100,
  endDate: 200,
  createdAt: 10,
  lastAltered: 20,
  lastAlteredBy: "admin",
};

describe("Banner storage methods", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a banner", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(banner);

    expect(await getBannerFromTable("admin-banner")).toBe(banner);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-banner",
      Key: { key: "admin-banner" },
    });
  });

  it("should put a banner without changing payload or timestamps", async () => {
    await putBannerToTable(banner);

    expect(dynamodbLib.put).toHaveBeenCalledWith({
      TableName: "local-banner",
      Item: banner,
    });
  });

  it("should delete only the requested banner", async () => {
    await deleteBannerFromTable("admin-banner-id");

    expect(dynamodbLib.delete).toHaveBeenCalledWith({
      TableName: "local-banner",
      Key: { key: "admin-banner-id" },
    });
  });
});
