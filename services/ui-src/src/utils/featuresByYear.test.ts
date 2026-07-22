import {
  featuresByYear,
  isStratificationReminderBannerEnabled,
} from "./featuresByYear";

describe("isStratificationReminderBannerEnabled", () => {
  it("uses the provided year when one is passed", () => {
    expect(isStratificationReminderBannerEnabled(2025)).toBe(false);
    expect(isStratificationReminderBannerEnabled("2026")).toBe(true);
  });

  it("matches the feature getters when deriving the year from the route", () => {
    window.history.pushState({}, "", "/OH/2025/ACSM/AMM-AD");
    expect(featuresByYear.showStratificationReminderBanner).toBe(false);
    expect(featuresByYear.hasTailoredStratificationBanner).toBe(false);

    window.history.pushState({}, "", "/OH/2026/ACSM/AMM-AD");
    expect(featuresByYear.showStratificationReminderBanner).toBe(true);
    expect(featuresByYear.hasTailoredStratificationBanner).toBe(true);
  });
});
