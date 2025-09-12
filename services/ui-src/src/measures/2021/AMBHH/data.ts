import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";

export const { categories, qualifiers } = getCatQualLabels("AMB-HH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Rate of emergency department (ED) visits per 1,000 enrollee months among Health Home enrollees.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
    customTotalLabel: qualifiers[4].label,
    rateScale: 1000,
    allowNumeratorGreaterThanDenominator: true,
    calcTotal: true,
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
    GV.validateBothDatesCompleted,
    GV.validateOMSTotalNDR,
    GV.validateTotalNDR,
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
};
