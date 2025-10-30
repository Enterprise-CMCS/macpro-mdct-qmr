import { editMeasure } from "../update";
import dbLib from "../../../libs/dynamodb-lib";
import { testEvent } from "../../../test-util/testEvents";
import { StatusCodes, Errors } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    update: jest.fn(),
    get: jest.fn(),
  },
}));

const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  getUserNameFromJwt: jest.fn().mockReturnValue("branchUser"),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

const event = { ...testEvent };
process.env.MeasuresTable = "mock-measure-table";
process.env.QualityCoreSetsTable = "mock-coreset-table";

describe("Test Update Measure Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHasStatePermissions.mockImplementation(() => true);
    event.headers = { "cognito-identity-id": "test" };
    event.body = `{"data": {}, "status": "status"}`;
    event.pathParameters = {
      state: "IN",
      year: "2022",
      coreSet: "ACS",
      measure: "AAB-AD",
    };
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    event.pathParameters = null;
    const res = await editMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    event.pathParameters = {
      state: "YA",
      year: "2020",
      coreSet: "YLTR",
      measure: "EEE-EE",
    };
    const res = await editMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test request with missing path params", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await editMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Measure Update with Cognito ID", async () => {
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("IN2022ACS");
    expect(res.body).toContain('"measure":"AAB-AD"');
    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "mock-measure-table",
      Key: { compoundKey: "IN2022ACS", measure: "AAB-AD" },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":status": "status",
        ":reporting": null,
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
        ":data": {},
      },
    });
  });

  test("Test Successful Run of Measure Update without Cognito ID", async () => {
    event.headers = {};
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("IN2022ACS");
    expect(res.body).toContain('"measure":"AAB-AD"');
    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "mock-measure-table",
      Key: { compoundKey: "IN2022ACS", measure: "AAB-AD" },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":status": "status",
        ":reporting": null,
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
        ":data": {},
      },
    });
  });

  test("Test updating a measure should update core set status too", async () => {
    const mockEvent = {
      ...testEvent,
      body: JSON.stringify({ data: {}, status: "incomplete" }),
      pathParameters: {
        state: "CO",
        year: "2026",
        coreSet: "ACS",
        measure: "AAB-AD",
      },
    };
    (dbLib.get as jest.Mock).mockResolvedValueOnce({ status: "submitted" });
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(mockEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "mock-measure-table",
      Key: { compoundKey: "CO2026ACS", measure: "AAB-AD" },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":status": "incomplete",
        ":reporting": null,
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
        ":data": {},
      },
    });
    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "mock-coreset-table",
      Key: { coreSet: "ACS", compoundKey: "CO2026" },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":submitted": false,
        ":status": "in progress",
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
      },
    });
  });

  test("Test param creation for convertToDynamoExpression", async () => {
    event.headers = {};
    event.body = `{"data": {}, "status": "status", "reporting": "yes", "description": "sample desc", "detailedDescription": "sample detailed desc"}`;
    Date.now = jest.fn(() => 20);

    const res = await editMeasure(event, null);

    expect(dbLib.update).toHaveBeenCalledWith({
      TableName: "mock-measure-table",
      Key: { compoundKey: "IN2022ACS", measure: "AAB-AD" },
      UpdateExpression: expect.any(String),
      ExpressionAttributeNames: expect.any(Object),
      ExpressionAttributeValues: {
        ":description": "sample desc",
        ":detailedDescription": "sample detailed desc",
        ":status": "status",
        ":reporting": "yes",
        ":lastAltered": 20,
        ":lastAlteredBy": "branchUser",
        ":data": {},
      },
    });
  });
});
