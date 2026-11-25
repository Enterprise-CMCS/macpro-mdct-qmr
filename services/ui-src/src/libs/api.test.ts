import { del, get, post, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { AdminBannerData } from "types";
import {
  createCoreSet,
  createMeasure,
  deleteCoreSet,
  deleteMeasure,
  editCoreSet,
  editMeasure,
  getAllCoreSets,
  getCoreSet,
  getMeasure,
  getMeasureListInfo,
  getPDF,
  getRate,
  getReportingYears,
  getBanner,
  listMeasures,
  deleteBanner,
  writeBanner,
} from "./api";

jest.mock("aws-amplify/api", () => ({
  del: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

jest.mock("aws-amplify/auth", () => ({
  fetchAuthSession: jest.fn(),
  signOut: jest.fn(),
}));

const input = {
  state: "AL",
  year: "2027",
  coreSet: "ACS",
  coreSetId: "ACS-ID",
  measure: "CDF-AD",
  body: { example: true },
};

const bannerData = { key: "test-banner" } as AdminBannerData;

describe("API resource paths", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(fetchAuthSession).mockResolvedValue({} as any);
    for (const request of [del, get, post, put]) {
      jest.mocked(request).mockReturnValue({
        response: Promise.resolve({ body: { text: async () => "" } }),
      } as any);
    }
  });

  it.each([
    [
      "listMeasures",
      () => listMeasures(input),
      get,
      "/coreset/AL/2027/ACS/measures",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getReportingYears",
      () => getReportingYears(input),
      get,
      "/coreset/reportingyears",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getMeasureListInfo",
      () => getMeasureListInfo(input),
      get,
      "/coreset/measureListInfo",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getMeasure",
      () => getMeasure(input),
      get,
      "/coreset/AL/2027/ACS/measures/CDF-AD",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "createMeasure",
      () => createMeasure(input),
      post,
      "/coreset/AL/2027/ACS/measures/CDF-AD",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "editMeasure",
      () => editMeasure(input),
      put,
      "/coreset/AL/2027/ACS/measures/CDF-AD",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "deleteMeasure",
      () => deleteMeasure(input),
      del,
      "/coreset/AL/2027/ACS/measures/CDF-AD",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getAllCoreSets",
      () => getAllCoreSets(input),
      get,
      "/coreset/AL/2027",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getCoreSet",
      () => getCoreSet(input),
      get,
      "/coreset/AL/2027/ACS-ID",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "createCoreSet",
      () => createCoreSet(input),
      post,
      "/coreset/AL/2027/ACS",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "editCoreSet",
      () => editCoreSet(input),
      put,
      "/coreset/AL/2027/ACS",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "deleteCoreSet",
      () => deleteCoreSet(input),
      del,
      "/coreset/AL/2027/ACS",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getRate",
      () => getRate(input),
      get,
      "/rate/AL/2027/ACS/CDF-AD",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getPDF",
      () => getPDF(input),
      post,
      "/coreset/AL/2027/ACS/pdf",
      { headers: { "x-api-key": undefined }, body: input.body },
    ],
    [
      "getBanner",
      () => getBanner(bannerData.key),
      get,
      "/banners/test-banner",
      { headers: { "x-api-key": undefined } },
    ],
    [
      "writeBanner",
      () => writeBanner(bannerData),
      post,
      "/banners/test-banner",
      { headers: { "x-api-key": undefined }, body: bannerData },
    ],
    [
      "deleteBanner",
      () => deleteBanner(bannerData.key),
      del,
      "/banners/test-banner",
      { headers: { "x-api-key": undefined } },
    ],
  ])(
    "%s uses the resource path and HTTP method",
    async (_name, operation, request, path, options) => {
      await operation();

      expect(request).toHaveBeenCalledWith({
        apiName: "coreSet",
        path,
        options,
      });
    }
  );
});
