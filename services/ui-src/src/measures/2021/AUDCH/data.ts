import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("AUD-CH");

export const data: MeasureTemplateData = {
  type: "CDC",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age (90 days).",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
      {
        value: "Electronic Health Records",
        description: true,
      },
      {
        value: "Other",
        description: true,
      },
    ],
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
