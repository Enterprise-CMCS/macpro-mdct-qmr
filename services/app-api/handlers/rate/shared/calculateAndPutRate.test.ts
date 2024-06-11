import { testData } from "../../../test-util/testData";
import { calculateAndPutRate } from "./calculateAndPutRate";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import dynamodbLib from "../../../libs/dynamodb-lib";
import { StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  update: jest.fn(),
  scanAll: jest.fn(() => testData),
}));

jest.mock("../../dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

describe("Test calculateAndPutRate", () => {
  it("Test calculateAndPutRate with combined coreSet", async () => {
    const res = await calculateAndPutRate({
      coreSet: "ACS",
      measure: "AMM-AD",
      state: "MA",
      year: 2024,
    });

    expect(convertToDynamoExpression).not.toHaveBeenCalled();
    expect(dynamodbLib.update).not.toHaveBeenCalled();
    expect(res).toBeUndefined();
  });
  it("Test calculateAndPutRate with separate coreSet", async () => {
    const res = await calculateAndPutRate({
      coreSet: "ACSC",
      measure: "AMM-AD",
      state: "MA",
      year: 2024,
    });

    expect(convertToDynamoExpression).toHaveBeenCalled();
    expect(dynamodbLib.update).toHaveBeenCalled();
    expect(res?.status).toBe(StatusCodes.SUCCESS);
  });
});
