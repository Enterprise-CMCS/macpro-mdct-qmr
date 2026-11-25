import {
  isCoreSetAbbr,
  isCoreSetIdentifier,
  isCoreSetStatus,
  parseCoreSet,
} from "./coreSet";

describe("Core Set type utilities", () => {
  describe("isCoreSetAbbr", () => {
    it("should accept known values", () => {
      expect(isCoreSetAbbr("ACS")).toBe(true);
      expect(isCoreSetAbbr("ACSC")).toBe(true);
      expect(isCoreSetAbbr("ACSM")).toBe(true);
      expect(isCoreSetAbbr("CCS")).toBe(true);
      expect(isCoreSetAbbr("CCSC")).toBe(true);
      expect(isCoreSetAbbr("CCSM")).toBe(true);
      expect(isCoreSetAbbr("HHCS")).toBe(true);
    });

    it("should reject HHCS identifiers", () => {
      expect(isCoreSetAbbr("HHCS_24-0024")).toBe(false);
    });

    it("should reject other values", () => {
      expect(isCoreSetAbbr("HHCSfoo")).toBe(false);
      expect(isCoreSetAbbr("ACSZ")).toBe(false);
      expect(isCoreSetAbbr("foo")).toBe(false);
      expect(isCoreSetAbbr("")).toBe(false);
      expect(isCoreSetAbbr(null as any)).toBe(false);
      expect(isCoreSetAbbr(undefined as any)).toBe(false);
      expect(isCoreSetAbbr(42 as any)).toBe(false);
    });
  });

  describe("isCoreSetIdentifier", () => {
    it("should accept non-HHCS CoreSetAbbr values", () => {
      expect(isCoreSetIdentifier("ACS")).toBe(true);
      expect(isCoreSetIdentifier("ACSC")).toBe(true);
      expect(isCoreSetIdentifier("ACSM")).toBe(true);
      expect(isCoreSetIdentifier("CCS")).toBe(true);
      expect(isCoreSetIdentifier("CCSC")).toBe(true);
      expect(isCoreSetIdentifier("CCSM")).toBe(true);
    });

    it("should reject the HHCS CoreSetAbbr", () => {
      expect(isCoreSetIdentifier("HHCS")).toBe(false);
    });

    it("should accept HHCS identifiers", () => {
      expect(isCoreSetIdentifier("HHCS_24-0024")).toBe(true);
      expect(isCoreSetIdentifier("HHCS_anything")).toBe(true);
    });

    it("should reject other values", () => {
      expect(isCoreSetIdentifier("HHCSfoo")).toBe(false);
      expect(isCoreSetIdentifier("ACSZ")).toBe(false);
      expect(isCoreSetIdentifier("ACS_foo")).toBe(false);
      expect(isCoreSetIdentifier("foo")).toBe(false);
      expect(isCoreSetIdentifier("")).toBe(false);
      expect(isCoreSetIdentifier(null as any)).toBe(false);
      expect(isCoreSetIdentifier(undefined as any)).toBe(false);
      expect(isCoreSetIdentifier(42 as any)).toBe(false);
    });
  });

  describe("isCoreSetStatus", () => {
    it("should accept known values", () => {
      expect(isCoreSetStatus("in progress")).toBe(true);
      expect(isCoreSetStatus("submitted")).toBe(true);
    });

    it("should reject other values", () => {
      expect(isCoreSetStatus(" in progress")).toBe(false);
      expect(isCoreSetStatus("in progress ")).toBe(false);
      expect(isCoreSetStatus("In Progress")).toBe(false);
      expect(isCoreSetStatus("")).toBe(false);
      expect(isCoreSetStatus(null)).toBe(false);
      expect(isCoreSetStatus(undefined)).toBe(false);
      expect(isCoreSetStatus(42)).toBe(false);
    });
  });

  describe("parseCoreSet", () => {
    it("should parse non-HHCS CoreSetAbbr values", () => {
      expect(parseCoreSet("ACS")).toEqual(["ACS", undefined]);
      expect(parseCoreSet("ACSC")).toEqual(["ACSC", undefined]);
      expect(parseCoreSet("ACSM")).toEqual(["ACSM", undefined]);
      expect(parseCoreSet("CCS")).toEqual(["CCS", undefined]);
      expect(parseCoreSet("CCSC")).toEqual(["CCSC", undefined]);
      expect(parseCoreSet("CCSM")).toEqual(["CCSM", undefined]);
    });

    it("should pass through the HHCS CoreSetAbbr", () => {
      expect(parseCoreSet("HHCS")).toEqual(["HHCS", undefined]);
    });

    it("should parse HHCS identifiers", () => {
      expect(parseCoreSet("HHCS_24-0024")).toEqual(["HHCS", "24-0024"]);
      expect(parseCoreSet("HHCS_anything")).toEqual(["HHCS", "anything"]);
    });

    it("should ignore apparent SPA IDs on non-HHCS identifiers", () => {
      expect(parseCoreSet("ACS_foo")).toEqual(["ACS", undefined]);
    });

    it("should reject other values", () => {
      expect(parseCoreSet("HHCSfoo")).toEqual([undefined, undefined]);
      expect(parseCoreSet("ACSZ")).toEqual([undefined, undefined]);
      expect(parseCoreSet("foo")).toEqual([undefined, undefined]);
      expect(parseCoreSet("")).toEqual([undefined, undefined]);
      expect(parseCoreSet(null as any)).toEqual([undefined, undefined]);
      expect(parseCoreSet(undefined as any)).toEqual([undefined, undefined]);
    });
  });
});
