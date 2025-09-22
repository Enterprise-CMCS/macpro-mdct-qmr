import { AdminBannerData } from "types";
import {
  listMeasures,
  getReportingYears,
  getMeasure,
  createMeasure,
  editMeasure,
  deleteMeasure,
  getAllCoreSets,
  getCoreSet,
  createCoreSet,
  editCoreSet,
  deleteCoreSet,
  getRate,
  getPDF,
  getBanner,
  writeBanner,
  deleteBanner,
  getMeasureListInfo,
} from "../api";

const mockApiResponse = {
  response: {
    body: {
      text: () => Promise.resolve('{"key":"value"}'),
    },
  },
};

const mockInputObj = {
  state: "DC",
  year: "2025",
  coreSet: "HHCS_24-0020",
  measure: "001",
  body: { key: "value" },
};

const mockBannerData = {
  key: "test-banner",
} as AdminBannerData;

const mockGet = jest.fn().mockReturnValue(mockApiResponse);
const mockPut = jest.fn().mockReturnValue(mockApiResponse);
const mockPost = jest.fn().mockReturnValue(mockApiResponse);
const mockDel = jest.fn().mockReturnValue(mockApiResponse);
jest.mock("aws-amplify/api", () => ({
  get: () => mockGet(),
  put: () => mockPut(),
  post: () => mockPost(),
  del: () => mockDel(),
}));

const mockFetchAuthSession = jest
  .fn()
  .mockReturnValue({ tokens: { idToken: "mockToken" } });
const mockSignOut = jest.fn().mockReturnValue(undefined);
jest.mock("aws-amplify/auth", () => ({
  fetchAuthSession: () => mockFetchAuthSession(),
  signOut: () => mockSignOut(),
}));

describe("API library", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        href: "href",
        origin: "http://localhost",
      },
    });
  });

  test("listMeasures", async () => {
    await listMeasures(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("getReportingYears", async () => {
    await getReportingYears(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("getMeasure", async () => {
    await getMeasure(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("createMeasure", async () => {
    await createMeasure(mockInputObj);
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  test("editMeasure", async () => {
    await editMeasure(mockInputObj);
    expect(mockPut).toHaveBeenCalledTimes(1);
  });

  test("deleteMeasure", async () => {
    await deleteMeasure(mockInputObj);
    expect(mockDel).toHaveBeenCalledTimes(1);
  });

  test("getAllCoreSets", async () => {
    await getAllCoreSets(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("getCoreSet", async () => {
    await getCoreSet(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("createCoreSet", async () => {
    await createCoreSet(mockInputObj);
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  test("editCoreSet", async () => {
    await editCoreSet(mockInputObj);
    expect(mockPut).toHaveBeenCalledTimes(1);
  });

  test("deleteCoreSet", async () => {
    await deleteCoreSet(mockInputObj);
    expect(mockDel).toHaveBeenCalledTimes(1);
  });

  test("getRate", async () => {
    await getRate(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("getPDF", async () => {
    await getPDF(mockInputObj);
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  test("getBanner", async () => {
    await getBanner(mockBannerData.key);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("writeBanner", async () => {
    await writeBanner(mockBannerData);
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  test("deleteBanner", async () => {
    await deleteBanner(mockBannerData.key);
    expect(mockDel).toHaveBeenCalledTimes(1);
  });

  test("getMeasureListInfo", async () => {
    await getMeasureListInfo(mockInputObj);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test("should handle fetchAuthSession error", async () => {
    mockFetchAuthSession.mockImplementationOnce(() => {
      throw new Error("test error");
    });
    await expect(listMeasures(mockInputObj)).rejects.toThrow();
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(window.location.href).toEqual(window.location.origin);
  });

  test("should handle apiRequest error", async () => {
    mockGet.mockImplementationOnce(() => {
      throw new Error("test error");
    });
    await expect(listMeasures(mockInputObj)).rejects.toThrow();
  });
});
