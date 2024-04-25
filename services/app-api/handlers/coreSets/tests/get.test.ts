import { getCoreSet, coreSetList } from "../get";

import { testEvent } from "../../../test-util/testEvents";

import dynamodbLib from "../../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../../libs/updateCoreProgress";
import { createCompoundKey } from "../../dynamoUtils/createCompoundKey";
import { CoreSetAbbr } from "../../../types";
import { createCoreSet } from "../create";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    scanAll: jest.fn(),
  },
}));

jest.mock("../create", () => ({
  __esModule: true,
  createCoreSet: jest.fn(),
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../../libs/updateCoreProgress", () => ({
  __esModule: true,
  updateCoreSetProgress: jest.fn(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

jest.mock("../../dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

describe("Test Get Core Set Functions", () => {
  beforeAll(() => {
    process.env.coreSetTableName = "EXAMPLE TABLE";
  });

  beforeEach(() => {
    (createCoreSet as jest.Mock).mockReset();
    (dynamodbLib.scanAll as jest.Mock).mockReset();
    (updateCoreSetProgress as jest.Mock).mockReset();
    mockHasRolePermissions.mockImplementation(() => false);
  });

  test("Test getCoreSet unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await getCoreSet(
      { ...testEvent, pathParameters: { coreSet: "ACS" } },
      null
    );
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test getCoreSet", async () => {
    await getCoreSet(
      { ...testEvent, pathParameters: { coreSet: "ACS" } },
      null
    );

    expect(dynamodbLib.get).toHaveBeenCalled();
    expect(createCompoundKey).toHaveBeenCalled();
    expect(createCompoundKey).toHaveBeenCalledWith({
      ...testEvent,
      pathParameters: { coreSet: "ACS" },
    });
  });

  test("Test coreSetList unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue({ Count: 0 });
    (createCoreSet as jest.Mock).mockResolvedValue({ statusCode: 200 });
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test coreSetList with no existing core sets and creating them successful", async () => {
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);
    (createCoreSet as jest.Mock).mockResolvedValue({ statusCode: 200 });

    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );

    expect(createCoreSet).toHaveBeenCalled();
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
  });

  test("Test coreSetList with no existing core sets and creating them fails", async () => {
    console.log = jest.fn();
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);
    (createCoreSet as jest.Mock).mockResolvedValue({ statusCode: 500 });

    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: {
          coreSet: CoreSetAbbr.HHCS,
          year: "2024",
          state: "FL",
        },
      },
      null
    );

    expect(res.statusCode).toBe(500);
    expect(console.log).toHaveBeenCalledWith(new Error("Creation failed"));
    expect(res.body).toContain("Failed to create new coreset");
  });

  test("Test coreSetList with no existing core sets and creating them REALLY fails", async () => {
    console.log = jest.fn();
    const testError = new Error("test error");
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);
    (createCoreSet as jest.Mock).mockImplementationOnce(() => {
      throw testError;
    });
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2024", state: "FL" },
      },
      null
    );

    expect(res.statusCode).toBe(500);
    expect(console.log).toHaveBeenCalledWith(testError);
    expect(res.body).toContain("Failed to create new coreset");
  });

  test("Test coreSetList with existing core sets and updateCoreSetProgress successful", async () => {
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([
      { coreSet: "ACS", progress: {} },
    ]);
    (updateCoreSetProgress as jest.Mock).mockImplementation((coreSets) =>
      coreSets.forEach((cs: any) => (cs.progress.numComplete = 1))
    );
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );

    expect(res.body).toContain('"progress":{"numComplete":1}');
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
  });
});
