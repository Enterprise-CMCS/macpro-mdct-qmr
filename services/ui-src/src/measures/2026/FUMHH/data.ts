import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUM-HH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Percentage of emergency department (ED) visits for enrollees age 6 and older with a principal diagnosis of mental illness, or any diagnosis of intentional self-harm, and had a mental health follow-up service. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of ED visits for which the enrollee received follow-up within 30 days of the ED visit (31 total days)",
      "Percentage of ED visits for which the enrollee received follow-up within 7 days of the ED visit (8 total days)",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
  },
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateFfsRadioButtonCompletion",
    "validateAtLeastOneDataSourceType",
    "validateOneCatRateHigherThanOtherCatOMS",
    "validateOneCatRateHigherThanOtherCatPM",
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
    "validateNumeratorLessThanDenominatorOMS",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateAtLeastOneDeliverySystem",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateOMSTotalNDR",
    "validateTotalNDR",
    "validateEqualQualifierDenominatorsOMS",
    "validateEqualQualifierDenominatorsPM",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 0,
      dualPopInfoArray: true,
    },
  },
};
