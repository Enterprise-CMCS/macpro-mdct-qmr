import { getSpaName } from "./util";

describe("ExportAll utils", () => {
  describe("getSpaName", () => {
    const props = {
      coreSetId: "HHCS_24-0020",
      state: "DC",
      year: "2025",
    };

    it("should return undefined if the needed params are missing", () => {
      expect(getSpaName({ ...props, coreSetId: undefined })).toBeUndefined();
      expect(getSpaName({ ...props, state: undefined })).toBeUndefined();
      expect(getSpaName({ ...props, year: undefined })).toBeUndefined();
    });

    it("should return undefined if the coreSetId does not contain an underscore", () => {
      expect(getSpaName({ ...props, coreSetId: "HHCS" })).toBeUndefined();
    });

    it("should return undefined if the year does not have defined SPAs", () => {
      expect(getSpaName({ ...props, year: "1999" })).toBeUndefined();
    });

    it("should return undefined if matching spa info cannot be found", () => {
      expect(getSpaName({ ...props, state: "ZZ" })).toBeUndefined();
      expect(getSpaName({ ...props, coreSetId: "HHCS_nope" })).toBeUndefined();
    });

    it("should find the SPA info for a specific core set ID", () => {
      expect(getSpaName(props)).toBe("DC 24-0020 - Chronic Conditions");
    });
  });
});
