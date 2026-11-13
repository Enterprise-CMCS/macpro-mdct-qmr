import {
  getMeasureFromTable,
  getMeasuresFromTable,
  putMeasureToTable,
  updateMeasureInTable,
  deleteMeasureFromTable,
} from "./measures";
import dynamodbLib from "../libs/dynamodb-lib";
import { CoreSetAbbr, MeasureStatus } from "../types";
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
  coreSet: CoreSetAbbr.ACS,
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
const measureItem = {
  ...measureKey,
  state: parameters.state,
  year: parameters.year,
  coreSet: parameters.coreSet,
  ...measureFields,
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
    const expected = {
      TableName: "local-measure",
      Item: measureItem,
    };
    const params = await putMeasureToTable(expected.Item);

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
    await updateMeasureInTable(parameters, fields);

    expect(dynamodbLib.update).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: measureKey,
      UpdateExpression:
        "SET #status = :status, reporting = :reporting, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy, #data = :data, description = :description, detailedDescription = :detailedDescription",
      ExpressionAttributeNames: { "#status": "status", "#data": "data" },
      ExpressionAttributeValues: Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [`:${key}`, value])
      ),
    });
  });

  it("should delete only the requested measure", async () => {
    await deleteMeasureFromTable(parameters);

    expect(dynamodbLib.delete).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: measureKey,
    });
  });

  it("should leave descriptions unchanged when they are not supplied", async () => {
    await updateMeasureInTable(parameters, {
      status: MeasureStatus.INCOMPLETE,
      reporting: null,
      data: {},
      lastAltered: 30,
      lastAlteredBy: "state-user",
    });

    expect(dynamodbLib.update).toHaveBeenCalledWith(
      expect.objectContaining({
        UpdateExpression:
          "SET #status = :status, reporting = :reporting, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy, #data = :data",
        ExpressionAttributeValues: expect.not.objectContaining({
          ":description": expect.anything(),
          ":detailedDescription": expect.anything(),
        }),
      })
    );
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
    ["put measure", "put", () => putMeasureToTable(measureItem)],
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
