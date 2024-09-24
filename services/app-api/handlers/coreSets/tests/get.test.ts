import { getCoreSet, coreSetList } from "../get";

import { testEvent } from "../../../test-util/testEvents";

import dynamodbLib from "../../../libs/dynamodb-lib";
import { updateCoreSetProgress } from "../../../libs/updateCoreProgress";
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

jest.mock("../../dynamoUtils/convertToDynamoExpressionVars", () => ({
  __esModule: true,
  convertToDynamoExpression: jest.fn().mockReturnValue({ testValue: "test" }),
}));

const event = { ...testEvent };
process.env.coreSetTableName = "EXAMPLE TABLE";

describe("Test Get Core Set Functions", () => {
  beforeEach(() => {
    (createCoreSet as jest.Mock).mockReset();
    (dynamodbLib.scanAll as jest.Mock).mockReset();
    (updateCoreSetProgress as jest.Mock).mockReset();
    mockHasRolePermissions.mockImplementation(() => false);
    event.pathParameters = {
      state: "AL",
      year: "2021",
      coreSet: CoreSetAbbr.ACS,
    };
  });

  test("Test getCoreSet unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await getCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test getCoreSet with missing path params", async () => {
    event.pathParameters = null;
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await getCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test getCoreSet with invalid path params", async () => {
    event.pathParameters = {
      coreSet: "THC", // invalid coreset
      year: "2023",
      state: "FL",
    };

    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await getCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test getCoreSet", async () => {
    await getCoreSet(event, null);

    expect(dynamodbLib.get).toHaveBeenCalled();
  });

  test("Test coreSetList unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await coreSetList(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test coreSetList should autopopulate adult core sets in 2023", async () => {
    event.pathParameters = {
      coreSet: CoreSetAbbr.ACS,
      year: "2023",
      state: "FL",
    };

    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => true);
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([]);
    (createCoreSet as jest.Mock).mockResolvedValue({ statusCode: 200 });
    const res = await coreSetList(event, null);
    expect(createCoreSet).toBeCalled();
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
    (createCoreSet as jest.Mock).mockResolvedValue({ statusCode: 500 });

    const res = await coreSetList(event, null);
    expect(res.statusCode).toBe(500);
    expect(createCoreSet).toHaveBeenCalled();
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
  });

  test("Test coreSetList with existing core sets and updateCoreSetProgress successful", async () => {
    (dynamodbLib.scanAll as jest.Mock).mockResolvedValue([
      { coreSet: "ACS", progress: {} },
    ]);
    (updateCoreSetProgress as jest.Mock).mockImplementation((coreSets) =>
      coreSets.forEach((cs: any) => (cs.progress.numComplete = 1))
    );
    const res = await coreSetList(event, null);

    expect(res.body).toContain('"progress":{"numComplete":1}');
    expect(dynamodbLib.scanAll).toHaveBeenCalled();
  });
});
