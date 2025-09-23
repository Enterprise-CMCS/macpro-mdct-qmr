import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";

export const { categories, qualifiers } = getCatQualLabels("PQI92-HH");

export const data: MeasureTemplateData = {
  type: "AHRQ",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Hospitalizations for ambulatory care sensitive chronic conditions per 100,000 enrollee months for health home enrollees age 18 and older. This measure includes adult hospitalizations for diabetes with short-term complications, diabetes with long-term complications, uncontrolled diabetes without complications, diabetes with lower-extremity amputation, chronic obstructive pulmonary disease, asthma, hypertension, or heart failure without a cardiac procedure.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
    rateScale: 100000,
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
    allowNumeratorGreaterThanDenominator: true,
  },
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateFfsRadioButtonCompletion",
    "validateAtLeastOneDataSourceType",
    "validateReasonForNotReporting",
    "validateDateRangeRadioButtonCompletion",
    "validateAtLeastOneDataSource",
    "validateDeviationTextFieldFilled",
    "validateAtLeastOneRateComplete",
    "validateOPMRates",
    "validateRateZeroOMS",
    "validateRateZeroPM",
    "validateRateNotZeroOMS",
    "validateRateNotZeroPM",
    "validateAtLeastOneDeliverySystem",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateOMSTotalNDR",
    "validateTotalNDR",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateDualPopInformationPM: {
      dualPopInfoArray: true,
      ageIndex: 0,
    },
  },
};
