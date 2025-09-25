import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";
import { DataDrivenTypes } from "shared/types";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("CPU-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries receiving long-term services and supports (LTSS) services ages 18 and older who have documentation of a comprehensive long-term services and supports (LTSS) care plan in a specified time frame that includes core elements. The following rates are reported:",
      'In addition, states should report the number of exclusions by type: "Could Not Be Reached for Care Planning", and "Refusal to Participate in Care Planning."',
    ],
    questionListItems: [
      "Care Plan with Core Elements Documented. Beneficiaries who had a comprehensive LTSS care plan with 9 core elements documented within 120 days of enrollment (for new beneficiaries) or during the measurement year (for established beneficiaries).",
      "Care Plan with Supplemental Elements Documented. Beneficiaries who had a comprehensive LTSS care plan with 9 core elements and at least 4 supplemental elements documented within 120 days of enrollment (for new beneficiaries) or during the measurement year (for established beneficiaries).",
    ],
    categories,
    qualifiers,
  },
  validations: [
    "validateFfsRadioButtonCompletion",
    "validateAtLeastOneDataSourceType",
    "validateReasonForNotReporting",
    "validateOneQualRateHigherThanOtherQualPM",
    "validateDateRangeRadioButtonCompletion",
    "validateAtLeastOneDataSource",
    "validateDeviationTextFieldFilled",
    "validateAtLeastOneRateComplete",
    "validateOPMRates",
    "validateRateZeroPM",
    "validateRateNotZeroPM",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateHedisYear",
    "validateAtLeastOneDeliverySystem",
    "validateHybridMeasurePopulation",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateEqualCategoryDenominatorsPM",
    "validateYearFormat",
  ],
  override: {
    validateEqualCategoryDenominatorsPM: {
      qualifiers,
    },
  },
};

export const dataSourceData: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If Reporting entities (e.g. health plans) used different data sources, please select all applicable data sources used below",
  options: [
    {
      value: DC.CASE_MANAGEMENT_RECORD_REVIEW,
      description: false,
      subOptions: [
        {
          label: "What is the case management record data source?",
          options: [
            {
              value: DC.EHR_DATA,
            },
            {
              value: DC.PAPER,
            },
          ],
        },
      ],
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
