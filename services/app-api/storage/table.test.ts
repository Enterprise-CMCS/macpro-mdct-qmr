import {
  getMeasureFromTable,
  putCombinedRatesToTable,
  getCombinedRatesFromTable,
} from "./table";
import dynamodbLib from "../libs/dynamodb-lib";
import { CombinedRatesPayload, DataSourcePayload } from "../types";

jest.mock("../libs/dynamodb-lib", () => ({
  update: jest.fn(),
  get: jest.fn(),
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
    process.env.measureTable = "local-measure";
    process.env.rateTableName = "local-rates";
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
      TableName: "local-rates",
      Key: {
        compoundKey: "CO2024ACSZZZ-AD",
        measure: "ZZZ-AD",
      },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":lastAltered": expect.any(Number),
        ":data": mockCombinedRate,
        ":state": "CO",
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
      TableName: "local-rates",
      Key: {
        compoundKey: "CO2024ACSZZZ-AD",
        measure: "ZZZ-AD",
      },
    });
  });
});
