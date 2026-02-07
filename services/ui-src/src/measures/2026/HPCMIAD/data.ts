import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("HPCMI-AD");

export const data: MeasureTemplateData = {
  type: "NCQA",
  coreset: "adult",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries ages 18 to 75 with a serious mental illness and diabetes (type 1 and type 2) who had a glycemic status assessment result of > 9.0%.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data collection methods, please select all applicable data sources used below.",
    options: [
      {
        value: DC.ADMINISTRATIVE_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              { value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
        ],
      },
      {
        value: DC.HYBRID_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              { value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
          {
            label: "What is the Medical Records Data Source?",
            options: [{ value: DC.EHR_DATA }, { value: DC.PAPER }],
          },
        ],
      },
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
    "validateHybridMeasurePopulation",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    omsValidations: {
      dataSource: true,
    },
    validateDualPopInformationPM: {
      ageIndex: 1,
      errorLabel: qualifiers[1].label,
    },
  },
};
