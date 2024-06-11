import { putToTable, getMeasureFromTable, getMeasureByCoreSet } from "./table";
import dynamodbLib from "../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../handlers/dynamoUtils/convertToDynamoExpressionVars";
import { testData } from "../test-util/testData";
import { StatusCodes } from "../utils/constants/constants";

jest.mock("../libs/dynamodb-lib", () => ({
  update: jest.fn(),
  scanAll: jest.fn(() => testData),
}));

jest.mock("../handlers/dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

describe("Test functions", () => {
  it("Test putToTable function", async () => {
    const res = await putToTable("mockTable", {}, {}, {});

    expect(convertToDynamoExpression).toHaveBeenCalled();
    expect(dynamodbLib.update).toHaveBeenCalled();
    expect(res.status).toBe(StatusCodes.SUCCESS);
  });
  it("Test getMeasureFromTable function", async () => {
    const res = await getMeasureFromTable("mockTable", {});

    expect(convertToDynamoExpression).toHaveBeenCalled();
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
    expect(res).toHaveLength(2);
  });
  it("Test getMeasureByCoreSet function", async () => {
    const res = await getMeasureByCoreSet("ACS", {
      state: "MA",
      year: 2024,
      measure: "AMM-AD",
    });
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
    expect(res).toHaveLength(2);
  });
});
