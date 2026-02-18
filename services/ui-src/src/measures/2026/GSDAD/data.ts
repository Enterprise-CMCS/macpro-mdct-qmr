import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("GSD-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries ages 18 to 75 with diabetes (type 1 and type 2) whose most recent glycemic status (hemoglobin A1c [HbA1c] or glucose management indicator [GMI]) was at the following levels during the measurement year:",
    ],
    questionListItems: ["Glycemic Status <8.0%", "Glycemic Status >9.0%"],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data collection methods, please select all that are applicable below.",
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
      { value: DC.OTHER, description: true },
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
    "validateEqualQualifierDenominatorsOMS",
    "validateEqualQualifierDenominatorsPM",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    omsValidations: {
      dataSource: true,
    },
    validateDualPopInformationPM: {
      ageIndex: 1,
      errorLabel: "Ages 65 to 75",
    },
  },
};
