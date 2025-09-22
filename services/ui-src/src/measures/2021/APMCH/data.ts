import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("APM-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of children and adolescents ages 1 to 17 who had two or more antipsychotic prescriptions and had metabolic testing. Three rates are reported:",
    ],
    questionListItems: [
      "Percentage of children and adolescents on antipsychotics who received blood glucose testing",
      "Percentage of children and adolescents on antipsychotics who received cholesterol testing",
      "Percentage of children and adolescents on antipsychotics who received blood glucose and cholesterol testing",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
  },
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateAtLeastOneDeviationFieldFilled",
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
    "validateOMSTotalNDR",
    "validateTotalNDR",
    "validateEqualQualifierDenominatorsOMS",
    "validateEqualQualifierDenominatorsPM",
    "validateYearFormat",
  ],
  override: {
    validateTotalNDR: { categories, errorMessage: true },
    validateEqualQualifierDenominatorsPM: {
      category: false,
      errorMessage: true,
    },
  },
};
