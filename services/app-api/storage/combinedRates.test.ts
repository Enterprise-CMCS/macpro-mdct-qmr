import {
  putCombinedRatesToTable,
  getCombinedRatesFromTable,
} from "./combinedRates";
import dynamodbLib from "../libs/dynamodb-lib";
import { CombinedRatesPayload, DataSourcePayload } from "../types";

jest.mock("../libs/dynamodb-lib", () => ({
  update: jest.fn(),
  get: jest.fn(),
}));

const parameters = {
  state: "CO",
  measure: "ZZZ-AD",
  coreSet: "ACS",
  year: 2024,
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

describe("Combined Rates storage methods", () => {
  beforeAll(() => {
    process.env.CombinedRatesTable = "local-rate";
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should store a rate from the combined rates table", async () => {
    await putCombinedRatesToTable(parameters, mockCombinedRate);

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
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce({
      ...parameters,
      compoundKey: "CO2024ACS",
      lastAltered: 20,
      data: mockCombinedRate,
    });

    const result = await getCombinedRatesFromTable(parameters);

    expect(result).toBe(mockCombinedRate);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-rate",
      Key: {
        compoundKey: "CO2024ACS",
        measure: "ZZZ-AD",
      },
    });
  });
});
