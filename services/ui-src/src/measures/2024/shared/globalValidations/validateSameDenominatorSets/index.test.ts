import { validateSameDenominatorSets } from ".";
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
