import {
  getCoreSetFromTable,
  getCoreSetsFromTable,
  putCoreSetToTable,
  updateCoreSetInTable,
  deleteCoreSetFromTable,
} from "./coreSets";
import dynamodbLib from "../libs/dynamodb-lib";
import { testCoreSet } from "../test-util/testEvents";
import { CoreSetAbbr } from "../types";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  queryAll: jest.fn(),
  put: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const parameters = { state: "CO", year: 2024, coreSet: CoreSetAbbr.ACS };
const coreSetKey = { compoundKey: "CO2024", coreSet: CoreSetAbbr.ACS };
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

  it("should put a core set", async () => {
    const expected = {
      TableName: "local-coreset",
      Item: { ...coreSetKey, state: "CO", year: 2024, ...coreSetFields },
    };
    await putCoreSetToTable(expected.Item);

    expect(dynamodbLib.put).toHaveBeenCalledWith(expected);
  });

  it("should update a core set including submission status", async () => {
    const params = await updateCoreSetInTable({
      ...coreSetKey,
      submitted: false,
      status: "in progress",
      lastAltered: 30,
      lastAlteredBy: "state-user",
    });

    expect(params).toEqual({
      TableName: "local-coreset",
      Key: coreSetKey,
      UpdateExpression:
        "SET submitted = :submitted, #status = :status, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy",
      ExpressionAttributeNames: {
        "#status": "status",
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

  it("should delete only the requested core set", async () => {
    await deleteCoreSetFromTable(parameters);

    expect(dynamodbLib.delete).toHaveBeenCalledWith({
      TableName: "local-coreset",
      Key: coreSetKey,
    });
  });

  it("should preserve missing records and empty lists", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValue(undefined);
    jest.mocked(dynamodbLib.queryAll).mockResolvedValue([]);

    expect(await getCoreSetFromTable(parameters)).toBeUndefined();
    expect(await getCoreSetsFromTable(parameters)).toEqual([]);
  });
});
