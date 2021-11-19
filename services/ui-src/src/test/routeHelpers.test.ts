import { getRedirectRoute } from "libs/routeHelpers";
import { roles } from "libs/authHelpers";

describe("Test RouteHelper.ts", () => {
  test("Expect routeHelper to return the correct routes", () => {
    expect(getRedirectRoute(roles.approver)).toBe("/adminhome");
    expect(getRedirectRoute(roles.businessOwner)).toBe("/bohome");
    expect(getRedirectRoute(roles.stateUser)).toBe("/statehome");
    expect(getRedirectRoute(roles.helpDesk)).toBe("/helpdeskhome");
    expect(getRedirectRoute("wrong choice")).toBe("/");
  });
});
