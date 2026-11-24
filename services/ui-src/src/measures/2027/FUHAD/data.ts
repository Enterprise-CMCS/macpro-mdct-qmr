import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUH-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of discharges for beneficiaries age 18 and older who were hospitalized for a principal diagnosis of mental illness, or any diagnosis of intentional self-harm, and had a mental health follow-up service . Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of discharges for which the enrollee received follow-up within 30 days after discharge",
      "Percentage of discharges for which the enrollee received follow-up within 7 days after discharge",
    ],
    categories,
    qualifiers,
  },
  validations: [
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
    "validateEqualQualifierDenominatorsOMS",
    "validateEqualQualifierDenominatorsPM",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateEqualQualifierDenominatorsPM: {
      category: true,
      errorMessage: false,
    },
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
