import { deleteCoreSet } from "../delete";
import db from "../../../libs/dynamodb-lib";
import { testEvent, testMeasure } from "../../../test-util/testEvents";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  delete: jest.fn(),
  scanAll: jest.fn(),
}));

const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

jest.mock("../../../libs/updateCoreProgress", () => ({
  __esModule: true,
  updateCoreSetProgress: jest.fn(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

describe("Testing Delete Core Set Functions", () => {
  beforeEach(() => {
    (db.scanAll as jest.Mock).mockReset();
    (db.delete as jest.Mock).mockReset();
    mockHasStatePermissions.mockImplementation(() => true);
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await deleteCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2020", coreSet: "ACS" },
      },
      null
    );
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test deleteCoreSet with associated measures", async () => {
    (db.scanAll as jest.Mock).mockReturnValue([
      testMeasure,
      testMeasure,
      testMeasure,
    ]);

    await deleteCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2020", coreSet: "ACS" },
      },
      null
    );

    expect(db.scanAll).toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalledTimes(4);
  });

  test("Test deleteCoreSet with no associated measures", async () => {
    (db.scanAll as jest.Mock).mockReturnValue([]);

    await deleteCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2020", coreSet: "ACS" },
      },
      null
    );

    expect(db.scanAll).toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalled();
  });
});
