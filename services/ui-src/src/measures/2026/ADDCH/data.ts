import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("ADD-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "The percentage of children newly prescribed attention-deficit/hyperactivity disorder (ADHD) medication who had at least three follow-up care visits within a 300-day (10-month) period, one of which was within 30 days of when the first ADHD medication was dispensed. Two rates are reported.",
    ],
    questionListTitles: [
      "Initiation Phase",
      "Continuation and Maintenance (C&M) Phase",
    ],
    questionListOrderedItems: [
      "The percentage of children ages 6 to 12 with a prescription dispensed for ADHD medication, who had one follow-up visit with a practitioner with prescribing authority during the 30-day Initiation Phase.",
      "The percentage of children ages 6 to 12 with a prescription dispensed for ADHD medication, who remained on the medication for at least 210 days and who, in addition to the visit in the Initiation Phase, had at least two follow-up visits with a practitioner within 270 days (9 months) after the Initiation Phase ended.",
    ],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
      {
        value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
        subOptions: [
          {
            options: [
              { value: DC.ELECTRONIC_HEALTH_RECORDS_PERSONAL_HEALTH_REGISTRY },
              { value: DC.HEALTH_INFORMATION_EXCHANGE_CLINICAL_REGISTRY },
              { value: DC.CASE_MANAGEMENT_SYSTEM },
              { value: DC.ADMINISTRATIVE },
            ],
          },
        ],
        description: true,
      },
      { value: DC.ELECTRONIC_HEALTH_RECORDS, description: true },
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
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
    "validateNumeratorLessThanDenominatorOMS",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateAtLeastOneDeliverySystem",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateOneQualDenomHigherThanOtherDenomOMS",
    "validateOneQualDenomHigherThanOtherDenomPM",
    "validateYearFormat",
  ],
};
