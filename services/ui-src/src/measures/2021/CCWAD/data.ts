import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

export const { categories, qualifiers } = getCatQualLabels("CCW-AD");

export const data: MeasureTemplateData = {
  type: "OPA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Among women ages 21 to 44 at risk of unintended pregnancy, the percentage that:",
    ],
    questionListItems: [
      "Were provided a most effective or moderately effective method of contraception",
      "Were provided a long-acting reversible method of contraception (LARC)",
    ],
    categories,
    qualifiers,
  },
  opm: {
    excludeOptions: ["Sex"],
  },
  override: {
    deviationFieldFilled: (data: FormData) => {
      const memeRates =
        data.PerformanceMeasure?.rates?.[categories[0].id] ?? [];
      const larcRates =
        data.PerformanceMeasure?.rates?.[categories[1].id] ?? [];

      return [memeRates, larcRates];
    },
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateOneCatRateHigherThanOtherCatOMS,
    GV.validateOneCatRateHigherThanOtherCatPM,
    GV.validateReasonForNotReporting,
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
