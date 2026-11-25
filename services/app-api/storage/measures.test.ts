process.env.MeasuresTable = "local-measure";

import {
  getMeasureFromTable,
  getMeasuresFromTable,
  putMeasureToTable,
  updateMeasureInTable,
  deleteMeasureFromTable,
} from "./measures";
import dynamodbLib from "../libs/dynamodb-lib";
import { CoreSetAbbr, Measure, MeasureStatuses } from "@qmr/shared";
import { RateParameters } from "../types";

jest.mock("../libs/dynamodb-lib", () => ({
  get: jest.fn(),
  queryAll: jest.fn(),
  put: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const measure = {
  compoundKey: "CO2024ACS",
  state: "CO",
  year: 2024,
  coreSet: CoreSetAbbr.ACS,
  measure: "ZZZ-AD",
  createdAt: 10,
  lastAltered: 20,
  lastAlteredBy: "state-user",
  status: MeasureStatuses.Incomplete,
  description: "A measure",
  detailedDescription: "Measure details",
  data: {},
  userCreated: true,
  placeholder: false,
} satisfies Measure;

const parameters = {
  state: "CO",
  year: 2024,
  coreSet: CoreSetAbbr.ACS,
  measure: "ZZZ-AD",
} satisfies RateParameters;

describe("Measure storage methods", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a measure from the measure table", async () => {
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(measure);

    expect(await getMeasureFromTable(parameters)).toBe(measure);
    expect(dynamodbLib.get).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: { compoundKey: "CO2024ACS", measure: "ZZZ-AD" },
    });
  });

  it("should list measures for only the requested core set", async () => {
    jest.mocked(dynamodbLib.queryAll).mockResolvedValueOnce([measure]);

    expect(await getMeasuresFromTable(parameters)).toEqual([measure]);
    expect(dynamodbLib.queryAll).toHaveBeenCalledWith({
      TableName: "local-measure",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: { ":compoundKey": "CO2024ACS" },
    });
  });

  it("should put a measure in the measure table", async () => {
    const expected = {
      TableName: "local-measure",
      Item: measure,
    };
    await putMeasureToTable(expected.Item);

    expect(dynamodbLib.put).toHaveBeenCalledWith(expected);
  });

  it("should update measure fields including null reporting", async () => {
    await updateMeasureInTable({
      ...measure,
      reporting: null,
      description: "Updated",
      detailedDescription: "Updated details",
    });

    expect(dynamodbLib.update).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: { compoundKey: "CO2024ACS", measure: "ZZZ-AD" },
      UpdateExpression:
        "SET #status = :status, reporting = :reporting, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy, #data = :data, description = :description, detailedDescription = :detailedDescription",
      ExpressionAttributeNames: { "#status": "status", "#data": "data" },
      ExpressionAttributeValues: {
        ":data": {},
        ":description": "Updated",
        ":detailedDescription": "Updated details",
        ":lastAltered": 20,
        ":lastAlteredBy": "state-user",
        ":reporting": null,
        ":status": "incomplete",
      },
    });
  });

  it("should delete only the requested measure", async () => {
    await deleteMeasureFromTable(parameters);

    expect(dynamodbLib.delete).toHaveBeenCalledWith({
      TableName: "local-measure",
      Key: { compoundKey: "CO2024ACS", measure: "ZZZ-AD" },
    });
  });

  it("should leave descriptions unchanged when they are not supplied", async () => {
    await updateMeasureInTable({
      ...measure,
      description: undefined,
      detailedDescription: undefined,
    });

    expect(dynamodbLib.update).toHaveBeenCalledWith(
      expect.objectContaining({
        UpdateExpression:
          "SET #status = :status, reporting = :reporting, lastAltered = :lastAltered, lastAlteredBy = :lastAlteredBy, #data = :data",
        ExpressionAttributeNames: { "#data": "data", "#status": "status" },
        ExpressionAttributeValues: {
          ":data": {},
          ":lastAltered": 20,
          ":lastAlteredBy": "state-user",
          ":status": "incomplete",
        },
      })
    );
  });
});
