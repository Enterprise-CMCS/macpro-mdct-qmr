import {
  getMeasure,
  listMeasures,
  getMeasureListInfo,
  getReportingYears,
} from "../get";

import dbLib from "../../../libs/dynamodb-lib";

import { APIGatewayProxyEvent } from "../../../types";
import { testEvent } from "../../../test-util/testEvents";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  get: jest.fn().mockResolvedValue("single measure"),
  scanAll: jest
    .fn()
    .mockResolvedValue([{ measure: "CSQ" }, { measure: "LBW-CH" }]),
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
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

describe("Test Get Measure Handlers", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => false);
  });

  test("Test getMeasure unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc"}`,
      headers: { "cognito-identity-id": "test" },
      pathParameters: { coreSet: "ACS" },
    };
    process.env.measureTableName = "SAMPLE TABLE";

    const res = await getMeasure(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Fetching a Measure", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc"}`,
      headers: { "cognito-identity-id": "test" },
      pathParameters: { coreSet: "ACS" },
    };
    process.env.measureTableName = "SAMPLE TABLE";

    const res = await getMeasure(event, null);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("single measure");
    expect(dbLib.get).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      Key: {
        compoundKey: "FL2020ACSFUA-AD",
        coreSet: "ACS",
      },
    });
  });

  test("Test listMeasures unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc"}`,
      headers: { "cognito-identity-id": "test" },
      pathParameters: { coreSet: "ACS" },
    };
    process.env.measureTableName = "SAMPLE TABLE";

    const res = await listMeasures(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successfully Fetching a List of Measures", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc"}`,
      headers: { "cognito-identity-id": "test" },
      pathParameters: { coreSet: "ACS", state: "FL", year: "2020" },
    };
    process.env.measureTableName = "SAMPLE TABLE";

    const res = await listMeasures(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("CSQ");
    expect(res.body).toContain("LBW-CH");
    expect(dbLib.scanAll).toHaveBeenCalledWith({
      TableName: "SAMPLE TABLE",
      testValue: "test",
    });
  });

  test("Test Fetching a List of Measures with no Path Parameters", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc"}`,
      headers: { "cognito-identity-id": "test" },
      pathParameters: null,
    };
    process.env.measureTableName = "SAMPLE TABLE";

    const res = await listMeasures(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(convertToDynamoExpression).toHaveBeenCalledWith(
      { state: undefined, year: NaN, coreSet: undefined },
      "list"
    );
  });

  test("Test getReportingYears", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{ "year1": true, "year2": true, "year3": true }`,
      headers: { "cognito-identity-id": "test" },
    };
    const res = await getReportingYears(event, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toBe('["2021","2022","2023","2024"]');
  });

  test("Test getMeasureListInfo works when called with an empty object", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{{}}`,
      headers: { "cognito-identity-id": "test" },
    };
    const res = await getMeasureListInfo(event, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });
});
