import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("CIS-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of children age 2 who had four diphtheria, tetanus and acellular pertussis (DTaP); three polio (IPV); one measles, mumps and rubella (MMR); three haemophilus influenza type B (HiB); three hepatitis B (Hep B), one chicken pox (VZV); four pneumococcal conjugate (PCV); one hepatitis A (HepA); two or three rotavirus (RV); and two influenza (flu) vaccines by their second birthday. The measure calculates a rate for each vaccine and three combination rates.",
    ],
    questionListItems: [],
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
              { value: DC.IMMUNIZATION_REGISTRY_INFORMATION_SYSTEM },
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
              { value: DC.IMMUNIZATION_REGISTRY_INFORMATION_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
          {
            label: "What is the Medical Records Data Source?",
            options: [{ value: DC.EHR_DATA }, { value: DC.PAPER }],
          },
        ],
      },
      {
        value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
        description: true,
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
    "validateHybridMeasurePopulation",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateEqualCategoryDenominatorsOMS",
    "validateEqualCategoryDenominatorsPM",
    "validateYearFormat",
  ],
  override: {
    omsValidations: {
      dataSource: true,
    },
    validateEqualCategoryDenominatorsPM: {
      qualifiers,
    },
  },
};
