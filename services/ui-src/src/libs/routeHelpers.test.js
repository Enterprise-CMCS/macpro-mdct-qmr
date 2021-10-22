import { getRedirectRoute } from "./routeHelpers";
import { roles } from "./authHelpers";

describe("get routes by role", () => {
  it("should output correct route", () => {
    expect(getRedirectRoute(roles.approver)).toBe("/adminhome");
    expect(getRedirectRoute(roles.businessOwner)).toBe("/bohome");
    expect(getRedirectRoute(roles.stateUser)).toBe("/statehome");
    expect(getRedirectRoute("")).toBe("/");
  });
});
