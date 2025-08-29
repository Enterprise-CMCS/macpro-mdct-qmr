import dynamodbLib from "../../../libs/dynamodb-lib";
import { testEvent } from "../../../test-util/testEvents";
import { editCoreSet } from "../update";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { CoreSetAbbr } from "../../../types";

jest.mock("../../../libs/dynamodb-lib", () => ({
  update: jest.fn(),
}));

const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  getUserNameFromJwt: jest.fn().mockReturnValue("branchUser"),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

const event = { ...testEvent };

describe("Testing Updating Core Set Functions", () => {
  beforeEach(() => {
    mockHasStatePermissions.mockImplementation(() => true);
    (event.headers = { "cognito-identity-id": "branchUser" }),
      (event.pathParameters = {
        state: "WA",
        year: "2021",
        coreSet: CoreSetAbbr.ACS,
      });
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await editCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test with missing path params", async () => {
    event.pathParameters = null;

    mockHasStatePermissions.mockImplementation(() => false);
    const res = await editCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test with invalid path params", async () => {
    event.pathParameters = {
      state: "GR",
      year: "2010",
      coreSet: CoreSetAbbr.ACS,
    };

    mockHasStatePermissions.mockImplementation(() => false);
    const res = await editCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test with cognito user id", async () => {
    Date.now = jest.fn(() => 20);
    const res = await editCoreSet(event, null);

    expect(dynamodbLib.update).toHaveBeenCalledWith({
      TableName: undefined,
      Key: { compoundKey: "WA2021", coreSet: "ACS" },
      UpdateExpression:
        "SET #submitted = :submitted, #status = :status, #lastAltered = :lastAltered, #lastAlteredBy = :lastAlteredBy",
      ExpressionAttributeNames: {
        "#submitted": "submitted",
        "#status": "status",
        "#lastAltered": "lastAltered",
        "#lastAlteredBy": "lastAlteredBy",
      },
      ExpressionAttributeValues: {
        ":submitted": undefined,
        ":status": undefined,
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
      },
    });
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("WA2021");
  });

  test("Test with no user id", async () => {
    Date.now = jest.fn(() => 20);
    const res = await editCoreSet(event, null);

    expect(dynamodbLib.update).toHaveBeenCalledWith({
      ExpressionAttributeNames: {
        "#lastAltered": "lastAltered",
        "#lastAlteredBy": "lastAlteredBy",
        "#status": "status",
        "#submitted": "submitted",
      },
      ExpressionAttributeValues: {
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
        ":status": undefined,
        ":submitted": undefined,
      },
      Key: {
        compoundKey: "WA2021",
        coreSet: "ACS",
      },
      TableName: undefined,
      UpdateExpression:
        "SET #submitted = :submitted, #status = :status, #lastAltered = :lastAltered, #lastAlteredBy = :lastAlteredBy",
    });
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("WA2021");
  });
});
