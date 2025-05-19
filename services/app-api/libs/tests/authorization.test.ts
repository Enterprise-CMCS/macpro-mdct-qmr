import { testEvent } from "../../test-util/testEvents";
import {
  isAuthenticated,
  hasStatePermissions,
  hasRolePermissions,
  getUserNameFromJwt,
} from "../authorization";
import { APIGatewayProxyEvent, UserRoles } from "../../types";
import jwtDecode from "jwt-decode";

jest.mock("jwt-decode", () => jest.fn());
const mockedDecode = jwtDecode as jest.MockedFunction<typeof jwtDecode>;

describe("isAuthenticated checks if user is authenticated", () => {
  beforeEach(() => {
    mockedDecode.mockReturnValue({
      "custom:cms_roles": UserRoles.ADMIN,
    });
  });

  test("returns true with correctly formatted jwt key", () => {
    const event = { ...testEvent };
    event.headers = { "x-api-key": "test" };
    expect(isAuthenticated(event)).toEqual(true);
  });

  test("returns false if missing jwt key", () => {
    const event = { ...testEvent };
    event.headers = {};
    expect(isAuthenticated(event)).toEqual(false);
  });
});

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

describe("getUserNameFromJwt", () => {
  const mockEventWithToken = {
    ...testEvent,
    headers: { "x-api-key": "mock JWT" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a default if there is no event", () => {
    const mockEvent = undefined as unknown as APIGatewayProxyEvent;
    expect(getUserNameFromJwt(mockEvent)).toBe("branchUser");
  });

  it("should return a default if the event has no headers", () => {
    const mockEvent = {} as APIGatewayProxyEvent;
    expect(getUserNameFromJwt(mockEvent)).toBe("branchUser");
  });

  it("should return a default if the event has no token", () => {
    const mockEvent = { headers: {} } as APIGatewayProxyEvent;
    expect(getUserNameFromJwt(mockEvent)).toBe("branchUser");
  });

  it("should return a default if the event token has no names or identities", () => {
    mockedDecode.mockReturnValueOnce({});
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("branchUser");
  });

  it("should return a default if the event token has only a first name, and no identities", () => {
    mockedDecode.mockReturnValueOnce({
      given_name: "Rosa",
    });
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("branchUser");
  });

  it("should return a default if the event token has only a last name, and no identities", () => {
    mockedDecode.mockReturnValueOnce({
      family_name: "Parks",
    });
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("branchUser");
  });

  it("should return a default if the event token has no names, and the identities array is empty", () => {
    mockedDecode.mockReturnValueOnce({
      identities: [],
    });
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("branchUser");
  });

  it("should return a default if the event token has no names, and the 1st identity has no userId", () => {
    mockedDecode.mockReturnValueOnce({
      identities: [{}],
    });
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("branchUser");
  });

  it("should return first and last name if they are both present", () => {
    mockedDecode.mockReturnValueOnce({
      given_name: "Rosa",
      family_name: "Parks",
    });
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("Rosa Parks");
  });

  it("should return userId if there is no name, but userId can be found", () => {
    mockedDecode.mockReturnValueOnce({
      identities: [{ userId: "mockUserId" }],
    });
    expect(getUserNameFromJwt(mockEventWithToken)).toBe("mockUserId");
  });
});
