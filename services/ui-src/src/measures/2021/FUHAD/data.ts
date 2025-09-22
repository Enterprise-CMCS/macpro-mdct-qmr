import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUH-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "The percentage of discharges for beneficiaries age 18 and older who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of discharges for which the beneficiary received follow-up within 30 days after discharge",
      "Percentage of discharges for which the beneficiary received follow-up within 7 days after discharge",
    ],
    categories,
    qualifiers,
  },
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateAtLeastOneDeviationFieldFilled",
    "validateOneCatRateHigherThanOtherCatOMS",
    "validateOneCatRateHigherThanOtherCatPM",
    "validateReasonForNotReporting",
    "validateAtLeastOneDataSource",
    "validateAtLeastOneRateComplete",
    "validateRateZeroOMS",
    "validateRateZeroPM",
    "validateRateNotZeroOMS",
    "validateRateNotZeroPM",
    "validateNumeratorLessThanDenominatorOMS",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateBothDatesCompleted",
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
