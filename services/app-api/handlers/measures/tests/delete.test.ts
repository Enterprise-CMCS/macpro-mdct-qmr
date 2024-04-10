import { deleteMeasure } from "../delete";

import dbLib from "../../../libs/dynamodb-lib";

import { APIGatewayProxyEvent } from "../../../types";
import { testEvent } from "../../../test-util/testEvents";
import { StatusCodes, Errors } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  delete: jest.fn(),
}));

const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

const event: APIGatewayProxyEvent = {
  ...testEvent,
  body: `{"data": {}, "description": "sample desc"}`,
  headers: { "cognito-identity-id": "test" },
  pathParameters: { coreSet: "ACS" },
};
process.env.measureTableName = "SAMPLE TABLE";

describe("Test Delete Measure Handler", () => {
  beforeEach(() => {
    mockHasStatePermissions.mockImplementation(() => true);
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await deleteMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Measure Deletion", async () => {
    const res = await deleteMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("FL2020ACSFUA-AD");
    expect(res.body).toContain('"coreSet":"ACS"');
    expect(dbLib.delete).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      Key: {
        compoundKey: "FL2020ACSFUA-AD",
        coreSet: "ACS",
      },
    });
  });
});
