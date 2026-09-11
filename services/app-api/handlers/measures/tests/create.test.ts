import { createMeasure } from "../create";
import { testEvent } from "../../../test-util/testEvents";
import { StatusCodes, Errors } from "../../../utils/constants/constants";
import dynamodbLib from "../../../libs/dynamodb-lib";
import { Measure } from "../../../types";

jest.mock("../../../libs/dynamodb-lib", () => ({
  put: jest.fn(),
  get: jest.fn().mockResolvedValue(undefined),
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

const event = { ...testEvent };

describe("Test Create Measure Handler", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => false);
    event.headers = { "cognito-identity-id": "test" };
    event.body = `{"data": {}, "description": "sample desc"}`;
    event.pathParameters = {
      state: "IA",
      year: "2026",
      coreSet: "HHCS_20-0011",
      measure: "SS-1-HH",
    };
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Measure Creation with description", async () => {
    event.body = `{"data": {}, "description": "sample desc", "detailedDescription": "sample detailed desc"}`;

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("sample desc");
    expect(res.body).toContain("sample detailed desc");
    expect(res.body).toContain("IA2026HHCS_20-0011");
  });

  test("Test Successful Run of Measure Creation without description", async () => {
    event.body = `{"data": {}}`;

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("test");
    expect(res.body).toContain("IA2026HHCS_20-0011");
  });

  test("Fails with bad request when path params are missing", async () => {
    event.pathParameters = null;

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Fails with bad request when params exist but are not valid", async () => {
    event.pathParameters = {
      state: "YA",
      year: "2020",
      coreSet: "YLTR",
      measure: "EEE-EE",
    };

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Fails with Conflict when measure already exists", async () => {
    event.body = `{"data": {}}`;

    const existingMeasure = {
      userCreated: true,
      placeholder: false,
    } as Measure;
    jest.mocked(dynamodbLib.get).mockResolvedValueOnce(existingMeasure);

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.CONFLICT);
    expect(res.body).toContain("Cannot overwrite");
  });
});
