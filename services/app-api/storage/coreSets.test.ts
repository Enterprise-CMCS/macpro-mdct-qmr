import {
  getCoreSetFromTable,
  getCoreSetsFromTable,
  putCoreSetToTable,
  updateCoreSetInTable,
  deleteCoreSetFromTable,
} from "./coreSets";
import dynamodbLib from "../libs/dynamodb-lib";
import { testCoreSet } from "../test-util/testEvents";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  queryAll: jest.fn(),
  put: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const parameters = { state: "CO", year: 2024, coreSet: "ACS" };
const coreSetKey = { compoundKey: "CO2024", coreSet: "ACS" };
const coreSetFields = {
  createdAt: 10,
  lastAltered: 20,
  lastAlteredBy: "state-user",
  progress: { numAvailable: 5, numComplete: 1 },
  submitted: false,
};

describe("Core Set storage methods", () => {
  beforeAll(() => {
    process.env.QualityCoreSetsTable = "local-coreset";
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a core set", async () => {
    const coreSet = { ...testCoreSet, ...coreSetFields };
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(coreSet);

    expect(await getCoreSetFromTable(parameters)).toBe(coreSet);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-coreset",
      Key: coreSetKey,
    });
  });

  it("should list core sets for only the requested state and year", async () => {
    const items = [{ ...testCoreSet, ...coreSetFields }];
    jest.mocked(dynamodbLib.queryAll).mockResolvedValueOnce(items);

    expect(await getCoreSetsFromTable(parameters)).toBe(items);
    expect(dynamodbLib.queryAll).toHaveBeenCalledWith({
      TableName: "local-coreset",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: { ":compoundKey": "CO2024" },
    });
  });

  it("should put a core set and return the existing response shape", async () => {
    const params = await putCoreSetToTable(parameters, coreSetFields);
    const expected = {
      TableName: "local-coreset",
      Item: { ...coreSetKey, state: "CO", year: 2024, ...coreSetFields },
    };

    expect(dynamodbLib.put).toHaveBeenCalledWith(expected);
    expect(params).toEqual(expected);
  });

  it("should update a core set including submission status", async () => {
    const params = await updateCoreSetInTable(parameters, {
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
    const params = await deleteCoreSetFromTable(parameters);

    expect(params).toEqual({ TableName: "local-coreset", Key: coreSetKey });
    expect(dynamodbLib.delete).toHaveBeenCalledWith(params);
  });

  it("should preserve missing records and empty lists", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValue(undefined);
    jest.mocked(dynamodbLib.queryAll).mockResolvedValue([]);

    expect(await getCoreSetFromTable(parameters)).toBeUndefined();
    expect(await getCoreSetsFromTable(parameters)).toEqual([]);
  });

  it.each([
    ["get core set", "get", () => getCoreSetFromTable(parameters)],
    ["list core sets", "queryAll", () => getCoreSetsFromTable(parameters)],
    ["put core set", "put", () => putCoreSetToTable(parameters, coreSetFields)],
    [
      "update core set",
      "update",
      () => updateCoreSetInTable(parameters, { submitted: false }),
    ],
    ["delete core set", "delete", () => deleteCoreSetFromTable(parameters)],
  ] as const)(
    "should propagate database errors for %s",
    async (_name, method, operation) => {
      const error = new Error("Database unavailable");
      jest.mocked(dynamodbLib[method]).mockRejectedValueOnce(error);

      await expect(operation()).rejects.toBe(error);
    }
  );
});
