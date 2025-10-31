import {
  validateEqualQualifierOfCategoryDenominatorsOMS,
  validateEqualQualifierOfCategoryDenominatorsPM,
} from ".";
import {
  generateOmsCategoryRateData,
  locationDictionary,
  simpleRate,
  partialRate,
  generatePmQualifierRateData,
} from "utils/testUtils/validationHelpers";

describe("Testing Equal Denominators For All Qualifiers Validation", () => {
  const categories = [
    { label: "TestCat1", text: "TestCat1", id: "TestCat1" },
    { label: "TestCat2", text: "TestCat2", id: "TestCat2" },
  ];
  const qualifiers = [
    { label: "TestQual1", text: "TestQual1", id: "TestQual1" },
    { label: "TestQual2", text: "TestQual2", id: "TestQual2" },
  ];
  const pmd = { categories, qualifiers };

  const rates = {
    TestCat1: [
      {
        numerator: "1",
        denominator: "2",
        rate: "50.0",
        label: "TestQual1",
      },
      {
        numerator: "2",
        denominator: "4",
        rate: "50.0",
        label: "TestQual2",
      },
    ],
    TestCat2: [
      {
        numerator: "1",
        denominator: "3",
        rate: "50.0",
        label: "TestQual1",
      },
      {
        numerator: "2",
        denominator: "6",
        rate: "50.0",
        label: "TestQual2",
      },
    ],
  };

  const rateData = {
    PerformanceMeasure: {
      rates: rates,
    },
  };

  const baseOMSInfo = {
    qualifiers,
    categories,
    locationDictionary,
    isOPM: false,
    label: ["TestLabel"],
  };

  const omsRateData = {
    options: ["TestQual1", "TestQual2"],
    rates: {
      TestCat1: {
        TestQual1: [
          {
            numerator: "1",
            denominator: "2",
            rate: "50.0",
            label: "TestQual1",
          },
        ],
      },
      TestCat2: {
        TestQual1: [
          {
            numerator: "2",
            denominator: "4",
            rate: "50.0",
            label: "TestQual1",
          },
        ],
      },
    },
  };

  // PM
  describe("PM/OPM Validation", () => {
    it("should return NO errors", () => {
      const errors = validateEqualQualifierOfCategoryDenominatorsPM(
        generatePmQualifierRateData(pmd, [simpleRate, simpleRate]),
        categories,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const errors = validateEqualQualifierOfCategoryDenominatorsPM(
        rateData,
        categories,
        qualifiers
      );

      expect(errors).toHaveLength(2);
      expect(errors[0].errorList).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `The following must have the same denominator:`
      );
      expect(errors[0].errorList![0]).toContain("TestCat1: TestQual1");
      expect(errors[0].errorList![1]).toContain("TestCat2: TestQual1");
      expect(errors[1].errorList![0]).toContain("TestCat1: TestQual2");
      expect(errors[1].errorList![1]).toContain("TestCat2: TestQual2");
    });

    it("should NOT have error from empty rate value", () => {
      const errors = validateEqualQualifierOfCategoryDenominatorsPM(
        generatePmQualifierRateData(pmd, [partialRate, partialRate]),
        categories,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessage", () => {
      const errorMessage = "Another one bites the dust.";
      const errorArray = validateEqualQualifierOfCategoryDenominatorsPM(
        rateData,
        categories,
        qualifiers,
        errorMessage
      );
      expect(errorArray.length).toBe(2);
      expect(errorArray[0].errorMessage).toBe(errorMessage);
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return NO errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);

      const errors = validateEqualQualifierOfCategoryDenominatorsOMS(
        categories,
        qualifiers
      )({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should return no errors if OPM", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = validateEqualQualifierOfCategoryDenominatorsOMS(
        categories,
        qualifiers
      )({
        ...baseOMSInfo,
        rateData: data,
        isOPM: true,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have errors, list qualifiers", () => {
      const locationDictionaryJestFunc = jest.fn();
      const errors = validateEqualQualifierOfCategoryDenominatorsOMS(
        categories,
        qualifiers
      )({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: omsRateData,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(errors[0].errorMessage).toBe(
        `The following must have the same denominator:`
      );
      expect(errors[0].errorList![0]).toContain("TestCat1: TestQual1");
      expect(errors[0].errorList![1]).toContain("TestCat2: TestQual1");
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    });
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessage = "Another one bites the dust.";
    const locationDictionaryJestFunc = jest.fn();

    const errors = validateEqualQualifierOfCategoryDenominatorsOMS(
      categories,
      qualifiers,
      errorMessage
    )({
      ...baseOMSInfo,
      locationDictionary: locationDictionaryJestFunc,
      rateData: omsRateData,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0].errorLocation).toContain(
      "Optional Measure Stratification:"
    );
    expect(errors[0].errorMessage).toBe(errorMessage);
  });
});
