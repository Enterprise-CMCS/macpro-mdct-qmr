import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FVA-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries ages 18 to 64 who received a flu vaccination between July 1 of the measurement year and the date when the CAHPS 5.1H Adult Survey was completed.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  custom: {
    dataSrcRadio: true,
    removeLessThan30: true,
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
    "validateYearFormat",
  ],
};
