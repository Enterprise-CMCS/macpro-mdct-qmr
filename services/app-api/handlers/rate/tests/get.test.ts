import { getRate } from "./../get";
import { testEvent } from "../../../test-util/testEvents";
import dynamodbLib from "../../../libs/dynamodb-lib";
import { StatusCodes } from "../../../utils/constants/constants";

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

describe("Test Get Rate Handler", () => {
  it("Test Fetching a Rate", async () => {
    const res = await getRate(
      {
        ...testEvent,
        pathParameters: { coreSet: "ACS", year: "2024", state: "MA" },
      },
      null
    );

    expect(dynamodbLib.get).toHaveBeenCalled();
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });
});
