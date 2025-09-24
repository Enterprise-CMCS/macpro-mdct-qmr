import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("CCP-AD");

export const data: MeasureTemplateData = {
  type: "OPA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Among women ages 21 to 44 who had a live birth, the percentage that:",
    ],
    questionListItems: [
      "Were provided a most effective or moderately effective method of contraception within 3 and 60 days of delivery",
      "Were provided a long-acting reversible method of contraception (LARC) within 3 and 60 days of delivery",
    ],
    categories,
    qualifiers,
  },
  opm: {
    excludeOptions: ["Sex"],
  },
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateAtLeastOneDeviationFieldFilled",
    "validateOneCatRateHigherThanOtherCatOMS",
    "validateOneCatRateHigherThanOtherCatPM",
    "validateReasonForNotReporting",
    "validateOneQualRateHigherThanOtherQualOMS",
    "validateOneQualRateHigherThanOtherQualPM",
    "validateAtLeastOneDataSource",
    "validateAtLeastOneRateComplete",
    "validateRateZeroOMS",
    "validateRateZeroPM",
    "validateRateNotZeroOMS",
    "validateRateNotZeroPM",
    "validateNumeratorLessThanDenominatorOMS",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateBothDatesCompleted",
    "validateEqualCategoryDenominatorsOMS",
    "validateEqualCategoryDenominatorsPM",
    "validateYearFormat",
  ],
  override: {
    validateOneQualRateHigherThanOtherQual: {
      higherIndex: 1,
      lowerIndex: 0,
    },
  },
};
