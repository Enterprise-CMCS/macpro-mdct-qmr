import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("BCS-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries ages 50 to 74 who were recommended for routine breast cancer screening and had a mammogram to screen for breast cancer.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data collection methods, please select all that are applicable below. If your state followed the 2026 Core Set technical specifications and used administrative data only, select ECDS > Administrative.",
    options: [
      {
        value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
        subOptions: [
          {
            options: [
              { value: DC.ADMINISTRATIVE },
              { value: DC.ELECTRONIC_HEALTH_RECORDS_PERSONAL_HEALTH_REGISTRY },
              { value: DC.HEALTH_INFORMATION_EXCHANGE },
              { value: DC.CLINICAL_REGISTRY },
              { value: DC.CASE_MANAGEMENT_SYSTEM },
            ],
          },
        ],
        description: true,
      },
      { value: DC.ELECTRONIC_HEALTH_RECORDS, description: true },
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
  },
  opm: {
    excludeOptions: ["O8BrOa"],
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
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
