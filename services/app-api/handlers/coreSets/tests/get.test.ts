import { getCoreSet, coreSetList } from "../get";

import { testEvent } from "../../../test-util/testEvents";

import dynamodbLib from "../../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../../libs/updateCoreProgress";
import { CoreSet, CoreSetAbbr } from "../../../types";
import { createCoreSet } from "../create";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { getCoreSetFromTable, postCoreSet } from "../../../storage/table";

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

jest.mock("../../../storage/table", () => ({
  __esModule: true,
  getCoreSetFromTable: jest.fn().mockReturnValue({ status: 200, body: {} }),
  postCoreSet: jest.fn().mockReturnValue({ status: 200, body: {} }),
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

    expect(getCoreSetFromTable).toHaveBeenCalled();
    expect(getCoreSetFromTable).toHaveBeenCalledWith({
      state: undefined,
      year: undefined,
      coreSet: "ACS",
    });
  });

  test("Test coreSetList unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await coreSetList(
      { ...testEvent, pathParameters: { coreSet: "ACS" } },
      null
    );
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test coreSetList should autopopulate adult core sets in 2023", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => true);
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2023", state: "FL" },
      },
      null
    );
    expect(postCoreSet).toBeCalled();
    expect(res.statusCode).toBe(200);
  });

  test("Test coreSetList should not autopopulate core sets in 2024", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => true);
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);

    expect(createCoreSet).not.toBeCalled();
  });

  test("Test coreSetList with no existing core sets and creating them fails", async () => {
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);
    (postCoreSet as jest.Mock).mockResolvedValue({ status: 500 });

    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2023", state: "FL" },
      },
      null
    );
    expect(res.statusCode).toBe(500);
    expect(postCoreSet).toHaveBeenCalled();
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
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
