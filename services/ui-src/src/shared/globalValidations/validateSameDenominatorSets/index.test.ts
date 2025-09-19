import { validateSameDenominatorSets, validateSameDenominatorSetsOMS } from ".";
import {
  generateOmsCategoryRateData,
  locationDictionary,
  simpleRate,
  doubleRate,
  lowerRate,
  higherRate,
} from "utils/testUtils/validationHelpers";

describe("Testing Same Denominator Set Validation", () => {
  const categories = [
    { label: "TestCat1", text: "TestCat1", id: "TestCat1" },
    { label: "TestCat2", text: "TestCat2", id: "TestCat2" },
  ];
  const qualifiers = [
    { label: "TestQual1", text: "TestQual1", id: "TestQual1" },
    { label: "TestQual2", text: "TestQual2", id: "TestQual2" },
  ];

  const baseOMSInfo = {
    categories,
    qualifiers,
    locationDictionary,
    isOPM: false,
    label: ["TestLabel"],
  };

  describe("PM Validation", () => {
    it("Denominator should return no errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        lowerRate,
        higherRate,
      ]);

      const errors = validateSameDenominatorSets()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("Denominator should return errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        doubleRate,
      ]);

      const errors = validateSameDenominatorSets()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(2);
    });
  });

  describe("OMS Validation", () => {
    it("should return NO errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        lowerRate,
        higherRate,
      ]);

      const errors = validateSameDenominatorSetsOMS()({
        ...baseOMSInfo,
        rateData: data,
      });
      expect(errors).toHaveLength(0);
    });
    it("should return no errors if OPM", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        lowerRate,
        higherRate,
      ]);
      const errors = validateSameDenominatorSetsOMS()({
        ...baseOMSInfo,
        rateData: data,
        isOPM: true,
      });
      expect(errors).toHaveLength(0);
    });
    it("should have errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        doubleRate,
      ]);

      if (data.rates) {
        data.rates["TestCat1"]["TestQual2"][0] = {
          numerator: "3",
          denominator: "4",
          rate: "0",
        };
        data.rates["TestCat2"]["TestQual2"][0] = {
          numerator: "5",
          denominator: "6",
          rate: "0",
        };
      }

      const errors = validateSameDenominatorSetsOMS()({
        ...baseOMSInfo,
        rateData: data,
      });
      expect(errors).toHaveLength(2);
      expect(errors[0].errorMessage).toBe(
        `Denominators must be the same for ${categories[0].label} and ${categories[1].label}.`
      );
    });
  });
});
