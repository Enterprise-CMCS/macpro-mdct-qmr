import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { AABRateCalculation } from "utils";
export const { categories, qualifiers } = getCatQualLabels("AAB-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    customPrompt:
      "Enter a number for the numerator and the denominator. The measure is reported as an inverted rate. The formula for the Rate = (1 - (Numerator/Denominator)) x 100",
    questionText: [
      "The percentage of episodes for beneficiaries age 18 and older with a diagnosis of acute bronchitis/bronchiolitis that did not result in an antibiotic dispensing event.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  custom: {
    rateCalc: AABRateCalculation,
    customPrompt:
      "Enter a number for the numerator and the denominator. The measure is reported as an inverted rate. The formula for the Rate = (1 - (Numerator/Denominator)) x 100",
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
    "validateNumeratorLessThanDenominatorOMS",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateHedisYear",
    "validateAtLeastOneDeliverySystem",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
