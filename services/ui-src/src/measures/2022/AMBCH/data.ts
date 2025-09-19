import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";
export const { categories, qualifiers } = getCatQualLabels("AMB-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Rate of emergency department (ED) visits per 1,000 beneficiary months among children up to age 19.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
    rateScale: 1000,
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
    allowNumeratorGreaterThanDenominator: true,
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateOneCatRateHigherThanOtherCatOMS,
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
    GV.validateEqualQualifierDenominatorsOMS,
    GV.validateYearFormat,
  ],
};
