import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("W30-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of children who had the following number of well-child visits with a primary care practitioner (PCP) during the last 15 months. The following rates are reported:",
    ],
    questionListItems: [
      " Children who turned age 15 months during the measurement year: Six or more well-child visits.",
      " Children who turned age 30 months during the measurement year: Two or more well-child visits.",
    ],
    questionListTitles: [
      "Well-Child Visits in the First 15 Months.",
      "Well-Child Visits for Age 15 Months-30 Months.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    showtextbox: false,
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
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
    GV.validateEqualQualifierDenominatorsPM,
    GV.validateYearFormat,
  ],
};
