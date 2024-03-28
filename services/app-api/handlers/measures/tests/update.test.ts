import { editMeasure } from "../update";

import dbLib from "../../../libs/dynamodb-lib";

import { APIGatewayProxyEvent } from "../../../types";
import { testEvent } from "../../../test-util/testEvents";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import { StatusCodes, Errors } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    update: jest.fn(),
  },
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

const event: APIGatewayProxyEvent = {
  ...testEvent,
  pathParameters: { coreSet: "ACS" },
};
process.env.measureTableName = "SAMPLE TABLE";

describe("Test Update Measure Handler", () => {
  beforeEach(() => {
    mockHasStatePermissions.mockImplementation(() => true);
    event.headers = { "cognito-identity-id": "test" };
    event.body = `{"data": {}, "status": "status"}`;
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await editMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Measure Update with Cognito ID", async () => {
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("FL2020ACSFUA-AD");
    expect(res.body).toContain('"coreSet":"ACS"');
    expect(convertToDynamoExpression).toHaveBeenCalledWith(
      {
        status: "status",
        lastAltered: 20,
        lastAlteredBy: "branchUser",
        reporting: null,
        data: {},
      },
      "post"
    );
    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      Key: {
        compoundKey: "FL2020ACSFUA-AD",
        coreSet: "ACS",
      },
      testValue: "test",
    });
  });

  test("Test Successful Run of Measure Update without Cognito ID", async () => {
    event.headers = {};
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("FL2020ACSFUA-AD");
    expect(res.body).toContain('"coreSet":"ACS"');
    expect(convertToDynamoExpression).toHaveBeenCalledWith(
      {
        status: "status",
        lastAltered: 20,
        lastAlteredBy: "branchUser",
        reporting: null,
        data: {},
      },
      "post"
    );
    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      Key: {
        compoundKey: "FL2020ACSFUA-AD",
        coreSet: "ACS",
      },
      testValue: "test",
    });
  });

  test("Test param creation for convertToDynamoExpression", async () => {
    event.headers = {};
    event.body = `{"data": {}, "status": "status", "reporting": "yes", "description": "sample desc", "detailedDescription": "sample detailed desc"}`;
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(event, null);

    expect(convertToDynamoExpression).toHaveBeenCalledWith(
      {
        status: "status",
        lastAltered: 20,
        lastAlteredBy: "branchUser",
        reporting: "yes",
        description: "sample desc",
        detailedDescription: "sample detailed desc",
        data: {},
      },
      "post"
    );
  });
});
