import { del, get, post, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
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
  getPDF,
  getRate,
  listMeasures,
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
    ["getMeasure", getMeasure, get, "/coreset/AL/2027/ACS/measures/CDF-AD"],
    [
      "createMeasure",
      createMeasure,
      post,
      "/coreset/AL/2027/ACS/measures/CDF-AD",
    ],
    ["editMeasure", editMeasure, put, "/coreset/AL/2027/ACS/measures/CDF-AD"],
    [
      "deleteMeasure",
      deleteMeasure,
      del,
      "/coreset/AL/2027/ACS/measures/CDF-AD",
    ],
    ["getCoreSet", getCoreSet, get, "/coreset/AL/2027/ACS-ID"],
    ["createCoreSet", createCoreSet, post, "/coreset/AL/2027/ACS"],
    ["editCoreSet", editCoreSet, put, "/coreset/AL/2027/ACS"],
    ["deleteCoreSet", deleteCoreSet, del, "/coreset/AL/2027/ACS"],
    ["getRate", getRate, get, "/rate/AL/2027/ACS/CDF-AD"],
    ["listMeasures", listMeasures, get, "/coreset/AL/2027/ACS/measures"],
    ["getAllCoreSets", getAllCoreSets, get, "/coreset/AL/2027"],
    ["getPDF", getPDF, post, "/coreset/AL/2027/ACS/pdf"],
  ])(
    "%s uses the resource path and HTTP method",
    async (_name, operation, request, path) => {
      await operation(input);

      expect(request).toHaveBeenCalledWith({
        apiName: "coreSet",
        path,
        options: { headers: { "x-api-key": undefined }, body: input.body },
      });
    }
  );
});
