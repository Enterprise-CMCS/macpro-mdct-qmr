import { getCoreSet, coreSetList } from "../get";

import { testEvent } from "../../../test-util/testEvents";

import dynamodbLib from "../../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../../libs/updateCoreProgress";
import { createCompoundKey } from "../../dynamoUtils/createCompoundKey";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockReturnValue("single measure"),
    scan: jest.fn().mockReturnValue(["array", "of", "measures"]),
  },
}));

jest.mock("../../../libs/authorization", () => ({
  __esModule: true,
  isAuthorized: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/debug-lib", () => ({
  __esModule: true,
  init: jest.fn(),
  flush: jest.fn(),
}));

jest.mock("../../../libs/updateCoreProgress", () => ({
  __esModule: true,
  updateCoreSetProgress: jest.fn(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

jest.mock("../../dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

describe("Test Get Core Set Functions", () => {
  test("Test getCoreSet", async () => {
    process.env.coreSetTableName = "EXAMPLE TABLE";
    const res = await getCoreSet(
      { ...testEvent, pathParameters: { coreSet: "ACS" } },
      null
    );

    expect(dynamodbLib.get).toHaveBeenCalled();
    expect(createCompoundKey).toHaveBeenCalled();
    expect(createCompoundKey).toHaveBeenCalledWith({
      ...testEvent,
      pathParameters: { coreSet: "ACS" },
    });
  });

  test("Test coreSetList with results.Count being 0 and statusCode 200", () => {});

  test("Test coreSetList with results.Count being 0 but error thrown", () => {});

  test("Test coreSetList with results.Count being non-zero and updateCoreSetProgress returns a value", () => {});

  test("Test coreSetList with results.Count being non-zero and updateCoreSetProgress returns undefined", () => {});
});
