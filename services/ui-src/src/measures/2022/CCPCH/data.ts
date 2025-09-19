import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("CCP-CH");

export const data: MeasureTemplateData = {
  type: "OPA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Among women ages 15 to 20 who had a live birth, the percentage that:",
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
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateOneCatRateHigherThanOtherCatOMS,
    GV.validateOneCatRateHigherThanOtherCatPM,
    GV.validateReasonForNotReporting,
    GV.validateOneQualRateHigherThanOtherQualOMS,
    GV.validateOneQualRateHigherThanOtherQualPM,
    GV.validateAtLeastOneDataSource,
    GV.validateAtLeastOneRateComplete,
    GV.validateRateZeroOMS,
    GV.validateRateZeroPM,
    GV.validateRateNotZeroOMS,
    GV.validateRateNotZeroPM,
    GV.validateNumeratorLessThanDenominatorOMS,
    GV.validateNumeratorsLessThanDenominatorsPM,
    GV.validateBothDatesCompleted,
    GV.validateEqualCategoryDenominatorsOMS,
    GV.validateEqualCategoryDenominatorsPM,
    GV.validateYearFormat,
  ],
};
