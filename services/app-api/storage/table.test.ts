import { postToTable, getMeasureFromTable, getMeasureByCoreSet } from "./table";
import dynamodbLib from "../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { testData } from "../test-util/testData";
import { StatusCodes } from "../utils/constants/constants";
import { MeasureParameters } from "../types";

jest.mock("../libs/dynamodb-lib", () => ({
  update: jest.fn(),
  get: jest.fn((params) =>
    testData.find((data) => data.coreSet === params.Key.coreSet)
  ),
}));

jest.mock("../handlers/dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

describe("Test functions", () => {
  it("Test postToTable function", async () => {
    const res = await postToTable("mockTable", {}, {}, {});

    expect(convertToDynamoExpression).toHaveBeenCalled();
    expect(dynamodbLib.update).toHaveBeenCalled();
    expect(res.status).toBe(StatusCodes.SUCCESS);
  });
  it("Test getMeasureFromTable function", async () => {
    const res = await getMeasureFromTable({
      coreSet: "ACSM",
    } as MeasureParameters);

    expect(convertToDynamoExpression).toHaveBeenCalled();
    expect(dynamodbLib.get).toHaveBeenCalled();
    expect(res).toBeDefined();
  });
  it("Test getMeasureByCoreSet function", async () => {
    const res = await getMeasureByCoreSet("ACS", {
      state: "MA",
      year: "2024",
      measure: "AMM-AD",
      coreSet: "unused",
    });
    expect(dynamodbLib.get).toHaveBeenCalled();
    expect(res).toHaveLength(2);
  });
});
