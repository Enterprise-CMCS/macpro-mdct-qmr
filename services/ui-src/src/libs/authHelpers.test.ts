import { determineRole } from "@/src/libs/authHelpers";

describe("determine role from the role value prived by Okta", () => {
  it("should output correct role", () => {
    expect(determineRole(["mdctqmr-approver"])).toBe("APPROVER");
    expect(determineRole(["mdctqmr-bor"])).toBe("BUSINESS_USER");
    expect(determineRole(["mdctqmr-help-desk"])).toBe("HELPDESK");
    expect(determineRole(["mdctqmr-state-user"])).toBe("STATE_USER");
    expect(determineRole([""])).toBe("");
  });
});
