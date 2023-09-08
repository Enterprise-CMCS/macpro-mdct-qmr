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
    scan: jest.fn(),
  },
}));

jest.mock("../create", () => ({
  __esModule: true,
  createCoreSet: jest.fn(),
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthorized: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../../libs/debug-lib", () => ({
  __esModule: true,
  init: jest.fn(),
  flush: jest.fn(),
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
    (dynamodbLib.scan as jest.Mock).mockReset();
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
    (dynamodbLib.scan as jest.Mock).mockReturnValue({ Count: 0 });
    (createCoreSet as jest.Mock).mockReturnValue({ statusCode: 200 });
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

  test("Test coreSetList with results.Count being 0 and statusCode 200", async () => {
    (dynamodbLib.scan as jest.Mock).mockReturnValue({ Count: 0 });
    (createCoreSet as jest.Mock).mockReturnValue({ statusCode: 200 });

    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );

    expect(createCoreSet).toHaveBeenCalled();
    expect(dynamodbLib.scan).toHaveBeenCalled();
  });

  test("Test coreSetList with results.Count being 0 and statusCode !== 200", async () => {
    console.log = jest.fn();
    (dynamodbLib.scan as jest.Mock).mockReturnValue({ Count: 0 });
    (createCoreSet as jest.Mock).mockReturnValue({ statusCode: 500 });

    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );

    expect(res.statusCode).toBe(500);
    expect(console.log).toHaveBeenCalledWith(new Error("Creation failed"));
    expect(res.body).toContain("Failed to create new coreset");
  });

  test("Test coreSetList with results.Count being 0 but error thrown", async () => {
    console.log = jest.fn();
    const testError = new Error("test error");
    (dynamodbLib.scan as jest.Mock).mockReturnValue({ Count: 0 });
    (createCoreSet as jest.Mock).mockImplementationOnce(() => {
      throw testError;
    });
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );

    expect(res.statusCode).toBe(500);
    expect(console.log).toHaveBeenCalledWith(testError);
    expect(res.body).toContain("Failed to create new coreset");
  });

  test("Test coreSetList with results.Count being non-zero and updateCoreSetProgress returns a value", async () => {
    (dynamodbLib.scan as jest.Mock).mockReturnValue({ Count: 1 });
    (updateCoreSetProgress as jest.Mock).mockReturnValue({
      Count: 1,
    });
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );

    expect(res.body).toContain('"Count":1');
    expect(dynamodbLib.scan).toHaveBeenCalled();
  });

  test("Test coreSetList with results.Count being non-zero and updateCoreSetProgress returns undefined", async () => {
    (dynamodbLib.scan as jest.Mock).mockReturnValue({ Count: 1 });
    (updateCoreSetProgress as jest.Mock).mockReturnValue(undefined);
    const res = await coreSetList(
      {
        ...testEvent,
        pathParameters: { coreSet: CoreSetAbbr.ACS, year: "2021", state: "FL" },
      },
      null
    );
    expect(res.body).toContain('"Count":1');
  });
});
