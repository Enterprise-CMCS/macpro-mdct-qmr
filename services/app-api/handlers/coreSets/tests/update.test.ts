import dynamodbLib from "../../../libs/dynamodb-lib";
import { testEvent } from "../../../test-util/testEvents";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../../dynamoUtils/createCompoundKey";
import { editCoreSet } from "../update";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  update: jest.fn(),
}));

const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  getUserNameFromJwt: jest.fn().mockReturnValue("branchUser"),
  hasStatePermissions: () => mockHasStatePermissions(),
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
  beforeEach(() => {
    mockHasStatePermissions.mockImplementation(() => true);
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await editCoreSet(
      {
        ...testEvent,
        headers: { "cognito-identity-id": "branchUser" },
        pathParameters: { coreSet: "ACS" },
        body: "{}",
      },
      null
    );
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test with cognito user id", async () => {
    Date.now = jest.fn(() => 20);
    const res = await editCoreSet(
      {
        ...testEvent,
        headers: { "cognito-identity-id": "branchUser" },
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
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
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
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("FL2020ACSFUA-AD");
  });
});
