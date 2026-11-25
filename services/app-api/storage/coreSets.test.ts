process.env.QualityCoreSetsTable = "local-coreset";

import {
  getCoreSetFromTable,
  getCoreSetsFromTable,
  putCoreSetToTable,
  updateCoreSetInTable,
  deleteCoreSetFromTable,
} from "./coreSets";
import dynamodbLib from "../libs/dynamodb-lib";
import { CoreSet, CoreSetAbbr, CoreSetStatuses } from "@qmr/shared";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  queryAll: jest.fn(),
  put: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const parameters = { state: "CO", year: 2024, coreSet: CoreSetAbbr.ACS };
const coreSet = {
  compoundKey: "CO2024",
  state: "CO",
  year: 2024,
  coreSet: CoreSetAbbr.ACS,
  createdAt: 10,
  lastAltered: 20,
  lastAlteredBy: "state-user",
  progress: { numAvailable: 5, numComplete: 1 },
  status: CoreSetStatuses.InProgress,
  submitted: false,
} satisfies CoreSet;

describe("Core Set storage methods", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a core set", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(coreSet);

    expect(await getCoreSetFromTable(parameters)).toEqual(coreSet);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-coreset",
      Key: { compoundKey: "CO2024", coreSet: CoreSetAbbr.ACS },
    });
  });

  it("should list core sets for only the requested state and year", async () => {
    jest.mocked(dynamodbLib.queryAll).mockResolvedValueOnce([coreSet]);

    expect(await getCoreSetsFromTable(parameters)).toEqual([coreSet]);
    expect(dynamodbLib.queryAll).toHaveBeenCalledWith({
      TableName: "local-coreset",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: { ":compoundKey": "CO2024" },
    });
  });

  it("should put a core set", async () => {
    const expected = {
      TableName: "local-coreset",
      Item: coreSet,
    };
    await putCoreSetToTable(expected.Item);

    expect(dynamodbLib.put).toHaveBeenCalledWith(expected);
  });

  it("should update a core set including submission status", async () => {
    await updateCoreSetInTable(coreSet);

    expect(dynamodbLib.update).toHaveBeenCalledWith({
      TableName: "local-coreset",
      Key: { compoundKey: "CO2024", coreSet: CoreSetAbbr.ACS },
      UpdateExpression:
        "SET submitted = :submitted, #status = :status, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":submitted": false,
        ":status": "in progress",
        ":lastAltered": 20,
        ":lastAlteredBy": "state-user",
      },
    });
  });

  it("should delete only the requested core set", async () => {
    await deleteCoreSetFromTable(parameters);

    expect(dynamodbLib.delete).toHaveBeenCalledWith({
      TableName: "local-coreset",
      Key: { compoundKey: "CO2024", coreSet: CoreSetAbbr.ACS },
    });
  });
});
