import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("EDV-AD");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Number of emergency department (ED) visits for ambulatory care sensitive non-traumatic dental conditions per 100,000 beneficiary months for adults age 18 and older",
    ],
    categories,
    qualifiers,
  },
  custom: {
    rateScale: 100000,
    allowNumeratorGreaterThanDenominator: true,
  },
  validations: [
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
  ],
};
