import {
  getMeasureFromTable,
  putCombinedRatesToTable,
  getCombinedRatesFromTable,
  getMeasuresFromTable,
  putMeasureToTable,
  updateMeasureInTable,
  deleteMeasureFromTable,
  getCoreSetFromTable,
  getCoreSetsFromTable,
  putCoreSetToTable,
  updateCoreSetInTable,
  deleteCoreSetFromTable,
  getBannerFromTable,
  putBannerToTable,
  deleteBannerFromTable,
} from "./table";
import dynamodbLib from "../libs/dynamodb-lib";
import {
  CombinedRatesPayload,
  DataSourcePayload,
  MeasureStatus,
} from "../types";
import { testCoreSet, testMeasure } from "../test-util/testEvents";

jest.mock("../libs/dynamodb-lib", () => ({
  update: jest.fn(),
  get: jest.fn(),
  queryAll: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockMeasureParameters = {
  state: "CO",
  measure: "ZZZ-AD",
  coreSet: "ACS",
  year: 2024,
};

const mockMeasure = {
  coreSet: "ACSM",
  data: {
    DataSource: ["AdministrativeData"],
    PerformanceMeasure: {
      rates: {
        cat0: [
          {
            uid: "cat0.qual0",
            label: "mock rate",
            numerator: "2",
            denominator: "10",
            rate: "20",
          },
        ],
      },
    },
  },
};

const mockCombinedRate = {
  DataSources: {
    Medicaid: { DataSource: ["AdministrativeData"] } as DataSourcePayload,
    CHIP: { DataSource: ["AdministrativeData"] } as DataSourcePayload,
  },
  Rates: [
    {
      uid: "cot0.qual0",
      label: "mock rate",
      Medicaid: {
        numerator: 2,
        denominator: 10,
        rate: 20,
      },
      CHIP: {},
      Combined: {},
    },
  ],
  AdditionalValues: [],
} as CombinedRatesPayload;

describe("Test database helper functions", () => {
  beforeAll(() => {
    process.env.MeasuresTable = "local-measure";
    process.env.CombinedRatesTable = "local-rate";
    process.env.QualityCoreSetsTable = "local-coreset";
    process.env.BannersTable = "local-banner";
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a measure from the measure table", async () => {
    (dynamodbLib.get as jest.Mock).mockResolvedValueOnce(mockMeasure);

    const result = await getMeasureFromTable(mockMeasureParameters);

    expect(result).toBe(mockMeasure);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: {
        compoundKey: "CO2024ACS",
        measure: "ZZZ-AD",
      },
    });
  });

  it("should store a rate from the combined rates table", async () => {
    await putCombinedRatesToTable(mockMeasureParameters, mockCombinedRate);

    expect(dynamodbLib.update).toHaveBeenCalledWith({
      TableName: "local-rate",
      Key: { compoundKey: "CO2024ACS", measure: "ZZZ-AD" },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":lastAltered": expect.any(Number),
        ":data": mockCombinedRate,
        ":state": "CO",
        ":year": 2024,
        ":coreSet": "ACS",
      },
    });
  });

  it("should fetch a rate from the combined rates table", async () => {
    (dynamodbLib.get as jest.Mock).mockResolvedValueOnce({
      data: mockCombinedRate,
    });

    const result = await getCombinedRatesFromTable(mockMeasureParameters);

    expect(result).toBe(mockCombinedRate);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-rate",
      Key: {
        compoundKey: "CO2024ACS",
        measure: "ZZZ-AD",
      },
    });
  });

  const measureKey = { compoundKey: "CO2024ACS", measure: "ZZZ-AD" };
  const coreSetKey = { compoundKey: "CO2024", coreSet: "ACS" };
  const measureFields = {
    createdAt: 10,
    lastAltered: 20,
    lastAlteredBy: "state-user",
    status: MeasureStatus.INCOMPLETE,
    description: "A measure",
    detailedDescription: "Measure details",
    data: {},
    userCreated: true,
    placeholder: false,
  };
  const coreSetFields = {
    createdAt: 10,
    lastAltered: 20,
    lastAlteredBy: "state-user",
    progress: { numAvailable: 5, numComplete: 1 },
    submitted: false,
  };
  const bannerFields = {
    title: "Maintenance",
    description: "Scheduled maintenance",
    startDate: 100,
    endDate: 200,
    createdAt: 10,
    lastAltered: 20,
    lastAlteredBy: "admin",
  };

  it("should list measures for only the requested core set", async () => {
    const items = [testMeasure];
    jest.mocked(dynamodbLib.queryAll).mockResolvedValueOnce(items);

    expect(await getMeasuresFromTable(mockMeasureParameters)).toBe(items);
    expect(dynamodbLib.queryAll).toHaveBeenCalledWith({
      TableName: "local-measure",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: { ":compoundKey": "CO2024ACS" },
    });
  });

  it("should put a measure and return the existing response shape", async () => {
    const params = await putMeasureToTable(
      mockMeasureParameters,
      measureFields
    );
    const expected = {
      TableName: "local-measure",
      Item: {
        ...measureKey,
        state: "CO",
        year: 2024,
        coreSet: "ACS",
        ...measureFields,
      },
    };

    expect(dynamodbLib.put).toHaveBeenCalledWith(expected);
    expect(params).toEqual(expected);
  });

  it("should update measure fields including null reporting", async () => {
    const fields = {
      status: MeasureStatus.INCOMPLETE,
      reporting: null,
      data: {},
      description: "Updated",
      detailedDescription: "Updated details",
      lastAltered: 30,
      lastAlteredBy: "state-user",
    };
    const params = await updateMeasureInTable(mockMeasureParameters, fields);

    expect(params).toEqual({
      TableName: "local-measure",
      Key: measureKey,
      UpdateExpression:
        "SET #status = :status, #reporting = :reporting, #data = :data, #description = :description, #detailedDescription = :detailedDescription, #lastAltered = :lastAltered, #lastAlteredBy = :lastAlteredBy",
      ExpressionAttributeNames: Object.fromEntries(
        Object.keys(fields).map((key) => [`#${key}`, key])
      ),
      ExpressionAttributeValues: Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [`:${key}`, value])
      ),
    });
    expect(dynamodbLib.update).toHaveBeenCalledWith(params);
  });

  it("should delete only the requested measure and return its parameters", async () => {
    const params = await deleteMeasureFromTable(mockMeasureParameters);

    expect(params).toEqual({ TableName: "local-measure", Key: measureKey });
    expect(dynamodbLib.delete).toHaveBeenCalledWith(params);
  });

  it("should fetch a core set", async () => {
    const coreSet = { ...testCoreSet, ...coreSetFields };
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(coreSet);

    expect(await getCoreSetFromTable(mockMeasureParameters)).toBe(coreSet);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-coreset",
      Key: coreSetKey,
    });
  });

  it("should list core sets for only the requested state and year", async () => {
    const items = [{ ...testCoreSet, ...coreSetFields }];
    jest.mocked(dynamodbLib.queryAll).mockResolvedValueOnce(items);

    expect(await getCoreSetsFromTable(mockMeasureParameters)).toBe(items);
    expect(dynamodbLib.queryAll).toHaveBeenCalledWith({
      TableName: "local-coreset",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: { ":compoundKey": "CO2024" },
    });
  });

  it("should put a core set and return the existing response shape", async () => {
    const params = await putCoreSetToTable(
      mockMeasureParameters,
      coreSetFields
    );
    const expected = {
      TableName: "local-coreset",
      Item: { ...coreSetKey, state: "CO", year: 2024, ...coreSetFields },
    };

    expect(dynamodbLib.put).toHaveBeenCalledWith(expected);
    expect(params).toEqual(expected);
  });

  it("should update a core set including submission status", async () => {
    const params = await updateCoreSetInTable(mockMeasureParameters, {
      submitted: false,
      status: "in progress",
      lastAltered: 30,
      lastAlteredBy: "state-user",
    });

    expect(params).toEqual({
      TableName: "local-coreset",
      Key: coreSetKey,
      UpdateExpression:
        "SET #submitted = :submitted, #status = :status, #lastAltered = :lastAltered, #lastAlteredBy = :lastAlteredBy",
      ExpressionAttributeNames: {
        "#submitted": "submitted",
        "#status": "status",
        "#lastAltered": "lastAltered",
        "#lastAlteredBy": "lastAlteredBy",
      },
      ExpressionAttributeValues: {
        ":submitted": false,
        ":status": "in progress",
        ":lastAltered": 30,
        ":lastAlteredBy": "state-user",
      },
    });
    expect(dynamodbLib.update).toHaveBeenCalledWith(params);
  });

  it("should delete only the requested core set and return its parameters", async () => {
    const params = await deleteCoreSetFromTable(mockMeasureParameters);

    expect(params).toEqual({ TableName: "local-coreset", Key: coreSetKey });
    expect(dynamodbLib.delete).toHaveBeenCalledWith(params);
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

  it("should preserve missing records and empty lists", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValue(undefined);
    jest.mocked(dynamodbLib.queryAll).mockResolvedValue([]);

    expect(await getMeasureFromTable(mockMeasureParameters)).toBeUndefined();
    expect(await getCoreSetFromTable(mockMeasureParameters)).toBeUndefined();
    expect(await getBannerFromTable("admin-banner")).toBeUndefined();
    expect(await getMeasuresFromTable(mockMeasureParameters)).toEqual([]);
    expect(await getCoreSetsFromTable(mockMeasureParameters)).toEqual([]);
  });

  it.each([
    ["get measure", "get", () => getMeasureFromTable(mockMeasureParameters)],
    [
      "list measures",
      "queryAll",
      () => getMeasuresFromTable(mockMeasureParameters),
    ],
    [
      "put measure",
      "put",
      () => putMeasureToTable(mockMeasureParameters, measureFields),
    ],
    [
      "update measure",
      "update",
      () =>
        updateMeasureInTable(mockMeasureParameters, {
          status: MeasureStatus.INCOMPLETE,
        }),
    ],
    [
      "delete measure",
      "delete",
      () => deleteMeasureFromTable(mockMeasureParameters),
    ],
    ["get core set", "get", () => getCoreSetFromTable(mockMeasureParameters)],
    [
      "list core sets",
      "queryAll",
      () => getCoreSetsFromTable(mockMeasureParameters),
    ],
    [
      "put core set",
      "put",
      () => putCoreSetToTable(mockMeasureParameters, coreSetFields),
    ],
    [
      "update core set",
      "update",
      () => updateCoreSetInTable(mockMeasureParameters, { submitted: false }),
    ],
    [
      "delete core set",
      "delete",
      () => deleteCoreSetFromTable(mockMeasureParameters),
    ],
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
