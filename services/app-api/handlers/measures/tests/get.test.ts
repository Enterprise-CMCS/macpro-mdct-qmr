import {
  getMeasure,
  listMeasures,
  getMeasureListInfo,
  getReportingYears,
} from "../get";

import dbLib from "../../../libs/dynamodb-lib";

import { testEvent } from "../../../test-util/testEvents";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  get: jest.fn().mockResolvedValue("single measure"),
  queryAll: jest
    .fn()
    .mockResolvedValue([{ measure: "CSQ" }, { measure: "LBW-CH" }]),
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

const event = { ...testEvent };
process.env.MeasuresTable = "SAMPLE TABLE";

describe("Test Get Measure Handlers", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => false);
    event.headers = { "cognito-identity-id": "test" };
    event.body = `{"data": {}, "description": "sample desc"}`;
    event.pathParameters = {
      state: "IN",
      year: "2022",
      coreSet: "ACS",
      measure: "AAB-AD",
    };
  });

  test("Test getMeasure unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await getMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Fetching a Measure", async () => {
    const res = await getMeasure(event, null);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("single measure");
    expect(dbLib.get).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      Key: {
        compoundKey: "IN2022ACS",
        measure: "AAB-AD",
      },
    });
  });

  test("Test Fetching a Measure with missing params", async () => {
    event.pathParameters = null;

    const res = await getMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test Fetching a Measure with invalid params", async () => {
    event.pathParameters = {
      state: "YA",
      year: "2020",
      coreSet: "YLTR",
      measure: "EEE-EE",
    };

    const res = await getMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test listMeasures unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    event.pathParameters = {
      state: "IN",
      year: "2022",
      coreSet: "ACS",
    };

    const res = await listMeasures(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successfully Fetching a List of Measures", async () => {
    event.pathParameters = { coreSet: "ACS", state: "FL", year: "2021" };

    const res = await listMeasures(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("CSQ");
    expect(res.body).toContain("LBW-CH");
    expect(dbLib.queryAll).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: {
        ":compoundKey": "FL2021ACS",
      },
    });
  });

  test("Test fetching List of Measures with no Path Parameters", async () => {
    event.pathParameters = null;

    const res = await listMeasures(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test fetching List of Measures with invalid Path Parameters", async () => {
    event.pathParameters = {
      state: "YA",
      year: "2020",
      coreSet: "YLTR",
    };

    const res = await listMeasures(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test getReportingYears", async () => {
    event.body = `{ "year1": true, "year2": true, "year3": true }`;

    const res = await getReportingYears(event, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toBe('["2021","2022","2023","2024","2025"]');
  });

  test("Test getMeasureListInfo works when called with an empty object", async () => {
    event.body = `{{}}`;
    const res = await getMeasureListInfo(event, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });
});
