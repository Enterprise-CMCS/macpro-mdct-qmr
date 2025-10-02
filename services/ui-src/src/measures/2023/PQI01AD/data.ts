import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";

export const { categories, qualifiers } = getCatQualLabels("PQI01-AD");

export const data: MeasureTemplateData = {
  type: "AHRQ",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Hospitalizations for a principal diagnosis of diabetes with short-term complications (ketoacidosis, hyperosmolarity, or coma) per 100,000 beneficiary months for beneficiaries age 18 and older.",
    ],
    categories,
    qualifiers,
  },
  custom: {
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
