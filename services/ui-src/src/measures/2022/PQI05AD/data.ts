import { positiveNumbersWithMaxDecimalPlaces } from "utils";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PQI05-AD");

export const data: MeasureTemplateData = {
  type: "AHRQ",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Number of inpatient hospital admissions for chronic obstructive pulmonary disease (COPD) or asthma per 100,000 beneficiary months for beneficiaries age 40 and older.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    rateScale: 100000,
    allowNumeratorGreaterThanDenominator: true,
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
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
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
  override: {
    validateDualPopInformationPM: {
      dualPopInfoArray: true,
      ageIndex: 0,
    },
  },
};
