import { testEvent } from "../../test-util/testEvents";
import { hasStatePermissions, hasRolePermissions } from "../authorization";
import { UserRoles } from "../../types";

const mockedDecode = jest.fn();

jest.mock("jwt-decode", () => ({
  __esModule: true,
  default: () => {
    return mockedDecode();
  },
}));

describe("hasRolePermissions checks if the user has one of a given set of roles", () => {
  const event = { ...testEvent };
  event.headers = { "x-api-key": "test" };

  beforeEach(() => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.ADMIN,
    });
  });

  test("returns true when user role matches single given role", () => {
    expect(hasRolePermissions(event, [UserRoles.ADMIN])).toEqual(true);
  });

  test("returns true when user role is one of a set of given roles", () => {
    expect(
      hasRolePermissions(event, [UserRoles.ADMIN, UserRoles.STATE_USER])
    ).toEqual(true);
  });

  test("returns false when the asked for role is the given role", () => {
    expect(hasRolePermissions(event, [UserRoles.STATE_USER])).toEqual(false);
  });
});

describe("hasStatePermissions checks if the user's state matches event's state", () => {
  const event = { ...testEvent };
  event.headers = { "x-api-key": "test" };

  beforeEach(() => {
    event.pathParameters = { ...event.pathParameters, state: "MN" };
  });

  test("returns true when user's state matches event's state", () => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.STATE_USER,
      "custom:cms_state": "MN",
    });
    expect(hasStatePermissions(event)).toEqual(true);
  });

  test("returns false if no state parameter is passed", () => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.STATE_USER,
      "custom:cms_state": "MN",
    });
    delete event.pathParameters!.state;
    expect(hasStatePermissions(event)).toEqual(false);
  });

  test("returns false if user role is not state user", () => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.INTERNAL,
      "custom:cms_state": "MN",
    });
    expect(hasStatePermissions(event)).toEqual(false);
  });

  test("returns false if user doesn't have a state", () => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.STATE_USER,
    });
    expect(hasStatePermissions(event)).toEqual(false);
  });

  test("returns false if user's state doesn't match event's state", () => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.STATE_USER,
      "custom:cms_state": "PA",
    });
    expect(hasStatePermissions(event)).toEqual(false);
  });
});
