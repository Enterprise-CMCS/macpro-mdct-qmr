import dynamodbLib from "../../../libs/dynamodb-lib";
import { testEvent } from "../../../test-util/testEvents";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../../dynamoUtils/createCompoundKey";
import { editCoreSet } from "../update";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    update: jest.fn(),
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

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

jest.mock("../../dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

describe("Testing Updating Core Set Functions", () => {
  test("Test with cognito user id", async () => {
    Date.now = jest.fn(() => 20);
    const res = await editCoreSet(
      {
        ...testEvent,
        headers: { "cognito-identity-id": "test-user" },
        pathParameters: { coreSet: "ACS" },
        body: "{}",
      },
      null
    );

    expect(createCompoundKey).toHaveBeenCalled();
    expect(dynamodbLib.update).toHaveBeenCalled();
    expect(convertToDynamoExpression).toHaveBeenCalledWith(
      {
        lastAltered: 20,
        lastAlteredBy: "test-user",
        status: undefined,
      },
      "post"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("FL2020ACSFUA-AD");
  });

  test("Test with no user id", async () => {
    Date.now = jest.fn(() => 20);
    const res = await editCoreSet(
      {
        ...testEvent,
        pathParameters: { coreSet: "ACS" },
        body: "{}",
      },
      null
    );

    expect(createCompoundKey).toHaveBeenCalled();
    expect(dynamodbLib.update).toHaveBeenCalled();
    expect(convertToDynamoExpression).toHaveBeenCalledWith(
      {
        lastAltered: 20,
        lastAlteredBy: "branchUser",
        status: undefined,
      },
      "post"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("FL2020ACSFUA-AD");
  });
});
