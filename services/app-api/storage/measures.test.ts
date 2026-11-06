import {
  getMeasureFromTable,
  getMeasuresFromTable,
  putMeasureToTable,
  updateMeasureInTable,
  deleteMeasureFromTable,
} from "./measures";
import dynamodbLib from "../libs/dynamodb-lib";
import { MeasureStatus } from "../types";
import { testMeasure } from "../test-util/testEvents";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  queryAll: jest.fn(),
  put: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const parameters = {
  state: "CO",
  year: 2024,
  coreSet: "ACS",
  measure: "ZZZ-AD",
};
const measureKey = { compoundKey: "CO2024ACS", measure: "ZZZ-AD" };
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

describe("Measure storage methods", () => {
  beforeAll(() => {
    process.env.MeasuresTable = "local-measure";
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a measure from the measure table", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(testMeasure);

    expect(await getMeasureFromTable(parameters)).toBe(testMeasure);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: measureKey,
    });
  });

  it("should list measures for only the requested core set", async () => {
    const items = [testMeasure];
    jest.mocked(dynamodbLib.queryAll).mockResolvedValueOnce(items);

    expect(await getMeasuresFromTable(parameters)).toBe(items);
    expect(dynamodbLib.queryAll).toHaveBeenCalledWith({
      TableName: "local-measure",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: { ":compoundKey": "CO2024ACS" },
    });
  });

  it("should put a measure and return the existing response shape", async () => {
    const params = await putMeasureToTable(parameters, measureFields);
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
    const params = await updateMeasureInTable(parameters, fields);

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
    const params = await deleteMeasureFromTable(parameters);

    expect(params).toEqual({ TableName: "local-measure", Key: measureKey });
    expect(dynamodbLib.delete).toHaveBeenCalledWith(params);
  });

  it("should preserve missing records and empty lists", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValue(undefined);
    jest.mocked(dynamodbLib.queryAll).mockResolvedValue([]);

    expect(await getMeasureFromTable(parameters)).toBeUndefined();
    expect(await getMeasuresFromTable(parameters)).toEqual([]);
  });

  it.each([
    ["get measure", "get", () => getMeasureFromTable(parameters)],
    ["list measures", "queryAll", () => getMeasuresFromTable(parameters)],
    ["put measure", "put", () => putMeasureToTable(parameters, measureFields)],
    [
      "update measure",
      "update",
      () =>
        updateMeasureInTable(parameters, { status: MeasureStatus.INCOMPLETE }),
    ],
    ["delete measure", "delete", () => deleteMeasureFromTable(parameters)],
  ] as const)(
    "should propagate database errors for %s",
    async (_name, method, operation) => {
      const error = new Error("Database unavailable");
      jest.mocked(dynamodbLib[method]).mockRejectedValueOnce(error);

      await expect(operation()).rejects.toBe(error);
    }
  );
});
