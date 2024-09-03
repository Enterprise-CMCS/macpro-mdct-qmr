import { createMeasure } from "../create";
import { testEvent } from "../../../test-util/testEvents";
import { StatusCodes, Errors } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  put: jest.fn(),
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
  createMeasureKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

const event = { ...testEvent };
process.env.measureTableName = "SAMPLE TABLE";

describe("Test Create Measure Handler", () => {
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
    expect(res.body).toContain("FL2020ACSFUA-AD");
  });

  test("Test Successful Run of Measure Creation without description", async () => {
    event.body = `{"data": {}}`;

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("test");
    expect(res.body).toContain("FL2020ACSFUA-AD");
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
});
