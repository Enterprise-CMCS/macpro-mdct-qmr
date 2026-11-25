import {
  isFieldsRateShape,
  isLegacyFieldsRateShape,
  isLegacyNdrRateShape,
  isLegacyValueRateShape,
  isMeasureStatus,
  isNdrRateShape,
  isValueRateShape,
} from "./measure";

describe("Measure type utilities", () => {
  describe("isMeasureStatus", () => {
    it("should accept known values", () => {
      expect(isMeasureStatus("complete")).toBe(true);
      expect(isMeasureStatus("incomplete")).toBe(true);
    });

    it("should reject other values", () => {
      expect(isMeasureStatus("CoMpLeTe")).toBe(false);
      expect(isMeasureStatus(" complete")).toBe(false);
      expect(isMeasureStatus("complete ")).toBe(false);
      expect(isMeasureStatus("foo")).toBe(false);
      expect(isMeasureStatus("")).toBe(false);
      expect(isMeasureStatus(null)).toBe(false);
      expect(isMeasureStatus(undefined)).toBe(false);
    });
  });

  describe("Rate Shape typeguards", () => {
    it("Should recognize NdrRateShape", () => {
      const rate = { label: "NDR", numerator: "4", uid: "u" };
      expect(isNdrRateShape(rate)).toBe(true);
      expect(isLegacyNdrRateShape(rate)).toBe(true);
      expect(isFieldsRateShape(rate)).toBe(false);
      expect(isLegacyFieldsRateShape(rate)).toBe(false);
      expect(isValueRateShape(rate)).toBe(false);
      expect(isLegacyValueRateShape(rate)).toBe(false);
    });

    it("Should recognize LegacyNdrRateShape", () => {
      const rate = { label: "Legacy NDR", numerator: "4" };
      expect(isNdrRateShape(rate)).toBe(false);
      expect(isLegacyNdrRateShape(rate)).toBe(true);
      expect(isFieldsRateShape(rate)).toBe(false);
      expect(isLegacyFieldsRateShape(rate)).toBe(false);
      expect(isValueRateShape(rate)).toBe(false);
      expect(isLegacyValueRateShape(rate)).toBe(false);
    });

    it("Should recognize FieldsRateShape", () => {
      const rate = {
        label: "Fields",
        uid: "u",
        fields: [{ label: "field", uid: "v" }],
      };
      expect(isNdrRateShape(rate)).toBe(false);
      expect(isLegacyNdrRateShape(rate)).toBe(false);
      expect(isFieldsRateShape(rate)).toBe(true);
      expect(isLegacyFieldsRateShape(rate)).toBe(true);
      expect(isValueRateShape(rate)).toBe(false);
      expect(isLegacyValueRateShape(rate)).toBe(false);
    });

    it("Should recognize LegacyFieldsRateShape", () => {
      const rate = { label: "Legacy Fields", fields: [{ label: "field" }] };
      expect(isNdrRateShape(rate)).toBe(false);
      expect(isLegacyNdrRateShape(rate)).toBe(false);
      expect(isFieldsRateShape(rate)).toBe(false);
      expect(isLegacyFieldsRateShape(rate)).toBe(true);
      expect(isValueRateShape(rate)).toBe(false);
      expect(isLegacyValueRateShape(rate)).toBe(false);
    });

    it("Should recognize ValueRateShape", () => {
      const rate = { uid: "v", label: "Legacy Value", value: "4" };
      expect(isNdrRateShape(rate)).toBe(false);
      expect(isLegacyNdrRateShape(rate)).toBe(false);
      expect(isFieldsRateShape(rate)).toBe(false);
      expect(isLegacyFieldsRateShape(rate)).toBe(false);
      expect(isValueRateShape(rate)).toBe(true);
      expect(isLegacyValueRateShape(rate)).toBe(true);
    });

    it("Should recognize LegacyValueRateShape", () => {
      const rate = { label: "Legacy Value", value: "4" };
      expect(isNdrRateShape(rate)).toBe(false);
      expect(isLegacyNdrRateShape(rate)).toBe(false);
      expect(isFieldsRateShape(rate)).toBe(false);
      expect(isLegacyFieldsRateShape(rate)).toBe(false);
      expect(isValueRateShape(rate)).toBe(false);
      expect(isLegacyValueRateShape(rate)).toBe(true);
    });
  });
});
