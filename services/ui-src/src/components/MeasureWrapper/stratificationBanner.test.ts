import { CoreSetAbbr } from "types";
import { getStratificationBannerDescription } from "./stratificationBanner";

describe("getStratificationBannerDescription", () => {
  describe("generic banner (hasTailoredStratificationBanner = false)", () => {
    it("returns the single generic sentence with the given year", () => {
      expect(
        getStratificationBannerDescription("2025", CoreSetAbbr.ACSM, false)
      ).toBe(
        "For 2025 Core Sets reporting, states are expected to report stratified data for this measure."
      );
    });

    it("ignores the core set", () => {
      expect(
        getStratificationBannerDescription("2025", CoreSetAbbr.HHCS, false)
      ).toBe(
        getStratificationBannerDescription("2025", CoreSetAbbr.ACS, false)
      );
    });
  });

  describe("tailored banner (hasTailoredStratificationBanner = true)", () => {
    it("names the required stratification standards", () => {
      const text = getStratificationBannerDescription(
        "2026",
        CoreSetAbbr.ACS,
        true
      );
      expect(text).toContain(
        "For 2026 Core Sets reporting, states are expected to report stratified data for this measure for each of the following required stratification standards: race and ethnicity, sex, and geography."
      );
    });

    it.each([
      [
        CoreSetAbbr.ACS,
        "States are encouraged, but not required, to report stratified data for Medicaid expansion.",
      ],
      [
        CoreSetAbbr.ACSM,
        "States are encouraged, but not required, to report stratified data for Medicaid expansion.",
      ],
      [
        CoreSetAbbr.CCS,
        "States are encouraged, but not required, to report stratified data for foster care.",
      ],
      [
        CoreSetAbbr.CCSM,
        "States are encouraged, but not required, to report stratified data for foster care.",
      ],
      [
        CoreSetAbbr.HHCS,
        "States are encouraged, but not required, to report stratified data for foster care and Medicaid expansion.",
      ],
    ])("appends the optional sentence for %s", (coreSet, optionalSentence) => {
      const text = getStratificationBannerDescription("2026", coreSet, true);
      expect(text).toContain(`geography. ${optionalSentence}`);
    });
  });
});
