import { deleteCoreSet } from "../delete";
import db from "../../../libs/dynamodb-lib";
import { testEvent, testMeasure } from "../../../test-util/testEvents";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { CoreSetAbbr } from "../../../types";

jest.mock("../../../libs/dynamodb-lib", () => ({
  delete: jest.fn(),
  queryAll: jest.fn(),
}));

const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../../libs/updateCoreProgress", () => ({
  __esModule: true,
  updateCoreSetProgress: jest.fn(),
}));

const event = { ...testEvent };

describe("Testing Delete Core Set Functions", () => {
  beforeEach(() => {
    (db.queryAll as jest.Mock).mockReset();
    (db.delete as jest.Mock).mockReset();
    mockHasStatePermissions.mockImplementation(() => true);
    event.pathParameters = {
      state: "FL",
      year: "2021",
      coreSet: CoreSetAbbr.ACS,
    };
  });

  test("Test deleteCoreSet with missing path params", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    event.pathParameters = null;
    const res = await deleteCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test deleteCoreSet with invalid path params", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    event.pathParameters = {
      state: "FL",
      year: "2021",
      coreSet: "BCS", // invalid coreset
    };
    const res = await deleteCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasStatePermissions.mockImplementation(() => false);
    const res = await deleteCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test deleteCoreSet with associated measures", async () => {
    (db.queryAll as jest.Mock).mockReturnValue([
      testMeasure,
      testMeasure,
      testMeasure,
    ]);

    await deleteCoreSet(event, null);

    expect(db.queryAll).toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalledTimes(4);
  });

  test("Test deleteCoreSet with no associated measures", async () => {
    (db.queryAll as jest.Mock).mockReturnValue([]);

    await deleteCoreSet(event, null);

    expect(db.queryAll).toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalled();
  });
});
