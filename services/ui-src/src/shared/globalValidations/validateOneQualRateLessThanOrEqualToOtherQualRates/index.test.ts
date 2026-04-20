import { SINGLE_CATEGORY } from "dataConstants";
import {
  validateOneQualRateLessThanOrEqualToOtherQualRatesOMS,
  validateOneQualRateLessThanOrEqualToOtherQualRatesPM,
} from ".";
import {
  generatePmQualifierRateData,
  generateOmsQualifierRateData,
  locationDictionary,
} from "utils/testUtils/validationHelpers";

const withQualifierUids = (
  categoryId: string,
  qualifierIds: string[],
  rateData: Array<{ rate?: string; numerator?: string; denominator?: string }>
) =>
  rateData.map((rate, index) => ({
    ...rate,
    uid: `${categoryId}.${qualifierIds[index]}`,
  }));

describe("Testing One Qualifier Rate Less Than Or Equal To Other Qualifiers Validation", () => {
  const categories = [
    { label: "Test Cat 1", text: "Test Cat 1", id: "Test Cat 1" },
  ];
  const qualifiers = [
    { label: "Influenza", text: "Influenza", id: "Influenza" },
    { label: "Tdap", text: "Tdap", id: "Tdap" },
    { label: "Combination", text: "Combination", id: "Combination" },
  ];
  const singleCat = [
    { label: SINGLE_CATEGORY, text: SINGLE_CATEGORY, id: SINGLE_CATEGORY },
  ];

  const baseOMSInfo = {
    categories,
    qualifiers,
    locationDictionary,
    isOPM: false,
    label: ["TestLabel"],
  };
  const validationOptions = {
    qualId: "Combination",
    otherQualIds: ["Influenza", "Tdap"],
  };
  const qualifierIds = qualifiers.map((qualifier) => qualifier.id);

  describe("PM Validation", () => {
    it("returns no error when combination is less than or equal to both influenza and tdap", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesPM(
        data,
        {
          categories,
          qualifiers,
        },
        validationOptions
      );
      expect(errors).toHaveLength(0);
    });

    it("returns error when combination is greater than influenza", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesPM(
        data,
        {
          categories,
          qualifiers,
        },
        validationOptions
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("returns error when combination is greater than tdap", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesPM(
        data,
        {
          categories,
          qualifiers,
        },
        validationOptions
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("returns error when combination is greater than both influenza and tdap", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesPM(
        data,
        {
          categories,
          qualifiers,
        },
        validationOptions
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("returns no error for single category label", () => {
      const data = generatePmQualifierRateData(
        { categories: singleCat, qualifiers },
        withQualifierUids(singleCat[0].id, qualifierIds, [
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ])
      );
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesPM(
        data,
        {
          categories: singleCat,
          qualifiers,
        },
        validationOptions
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });
  });

  describe("OMS Validation", () => {
    it("returns no error when combination is less than or equal to both influenza and tdap", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesOMS(
        validationOptions
      )({
        ...baseOMSInfo,
        rateData,
      });
      expect(errors).toHaveLength(0);
    });

    it("returns error when combination is greater than influenza", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesOMS(
        validationOptions
      )({
        ...baseOMSInfo,
        rateData,
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("returns error when combination is greater than tdap", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesOMS(
        validationOptions
      )({
        ...baseOMSInfo,
        rateData,
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("should return error when combination is greater than both influenza and tdap", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesOMS(
        validationOptions
      )({
        ...baseOMSInfo,
        rateData,
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("returns no error for OPM", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
          { rate: "30", numerator: "30", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesOMS(
        validationOptions
      )({
        ...baseOMSInfo,
        isOPM: true,
        rateData,
      });
      expect(errors).toHaveLength(0);
    });

    it("supports qualifier id-based lookup", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        ...withQualifierUids(categories[0].id, qualifierIds, [
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "20", numerator: "20", denominator: "100" },
          { rate: "25", numerator: "25", denominator: "100" },
        ]),
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesOMS(
        validationOptions
      )({
        ...baseOMSInfo,
        rateData,
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });

    it("supports PM qualifier id-based lookup without indices", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        {
          rate: "20",
          numerator: "20",
          denominator: "100",
          uid: "Test Cat 1.Influenza",
        },
        {
          rate: "20",
          numerator: "20",
          denominator: "100",
          uid: "Test Cat 1.Tdap",
        },
        {
          rate: "25",
          numerator: "25",
          denominator: "100",
          uid: "Test Cat 1.Combination",
        },
      ]);
      const errors = validateOneQualRateLessThanOrEqualToOtherQualRatesPM(
        data,
        {
          categories,
          qualifiers,
        },
        {
          qualId: "Combination",
          otherQualIds: ["Influenza", "Tdap"],
        }
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        "Combination rate cannot be greater than the Influenza or Tdap rates"
      );
    });
  });
});
