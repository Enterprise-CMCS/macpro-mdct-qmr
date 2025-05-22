import { createCoreSet } from "../create";

import { testEvent } from "../../../test-util/testEvents";
import dynamoDb from "../../../libs/dynamodb-lib";
import { measures } from "../../dynamoUtils/measureList";
import { CoreSetAbbr } from "../../../types";
import { getCoreSet } from "../get";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    put: jest.fn(),
    post: jest.fn().mockReturnValue({}),
  },
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../get", () => ({
  __esModule: true,
  getCoreSet: jest.fn(),
}));

const event = { ...testEvent };

describe("Testing the Create CoreSet Functions", () => {
  beforeEach(() => {
    (getCoreSet as jest.Mock).mockReset();
    mockHasRolePermissions.mockImplementation(() => false);
    event.pathParameters = {
      state: "FL",
      year: "2021",
      coreSet: CoreSetAbbr.ACS,
    };
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    (getCoreSet as jest.Mock).mockReturnValue({ body: JSON.stringify({}) });
    const res = await createCoreSet(event, null);
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test createCoreSet", async () => {
    (getCoreSet as jest.Mock).mockReturnValue({ body: JSON.stringify({}) });
    const list = measures[2021].filter((measure) => measure.type === "A");
    const res = await createCoreSet(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(dynamoDb.put).toHaveBeenCalledTimes(list.length + 1);
  });

  test("Test createCoreSet but coreSet exists", async () => {
    (getCoreSet as jest.Mock).mockReturnValue({
      body: JSON.stringify({ test: "test" }),
    });
    const res = await createCoreSet(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.CORESET_ALREADY_EXISTS);
  });

  test("Test createCoreSet with missing path params", async () => {
    event.pathParameters = null;
    (getCoreSet as jest.Mock).mockReturnValue({ body: JSON.stringify({}) });
    const res = await createCoreSet(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });
  test("Test createCoreSet with invalid path params", async () => {
    event.pathParameters = {
      state: "FL",
      year: "2019", // invalid year
      coreSet: CoreSetAbbr.ACS,
    };
    (getCoreSet as jest.Mock).mockReturnValue({ body: JSON.stringify({}) });
    const res = await createCoreSet(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
