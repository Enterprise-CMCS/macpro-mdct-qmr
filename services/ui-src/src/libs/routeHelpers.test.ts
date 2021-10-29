import { getRedirectRoute } from "@/src/libs/routeHelpers";
import { roles } from "@/src/libs/authHelpers";

describe("get routes by role", () => {
  it("should output correct route", () => {
    expect(getRedirectRoute(roles.approver)).toBe("/adminhome");
    expect(getRedirectRoute(roles.businessOwner)).toBe("/bohome");
    expect(getRedirectRoute(roles.stateUser)).toBe("/statehome");
    expect(getRedirectRoute("")).toBe("/");
  });
});
