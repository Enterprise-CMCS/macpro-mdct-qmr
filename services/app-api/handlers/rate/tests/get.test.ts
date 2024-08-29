import { getRate } from "./../get";
import { testEvent } from "../../../test-util/testEvents";
import dynamodbLib from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../../libs/dynamodb-lib", () => ({
  get: jest.fn().mockResolvedValue("single rate"),
}));

const event = { ...testEvent };

describe("Test Get Rate Handler", () => {
  beforeEach(() => {
    event.pathParameters = {
      state: "MA",
      year: "2024",
      coreSet: "ACS",
      measure: "AAB-AD",
    };
  });
  it("Test Fetching a Rate", async () => {
    const res = await getRate(event, null);

    expect(dynamodbLib.get).toHaveBeenCalled();
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });

  it("Test Fetching a Rate with missing path params", async () => {
    event.pathParameters = null;

    const res = await getRate(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  it("Test Fetching a Rate with invalid path params", async () => {
    event.pathParameters = {
      state: "MA",
      year: "2024",
      coreSet: "ACS",
      measure: "EEE-TT", // invalid measure name
    };

    const res = await getRate(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
