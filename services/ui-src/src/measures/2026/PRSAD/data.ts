import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("PRS-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "The percentage of deliveries in the measurement period in which beneficiaries had received influenza and tetanus, diphtheria toxoids and acellular pertussis (Tdap) vaccinations.",
    ],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data collection methods, please select all that are applicable below.",
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
      { value: DC.OTHER, description: true },
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
    "validateAtLeastOneDeliverySystem",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateEqualQualifierDenominatorsOMS",
    "validateEqualQualifierDenominatorsPM",
    "validateEqualCategoryDenominatorsOMS",
    "validateEqualCategoryDenominatorsPM",
    "validateYearFormat",
  ],
  override: {
    validateEqualQualifierDenominatorsPM: {
      category: true,
      errorMessage: false,
    },
    validateEqualCategoryDenominatorsPM: {
      qualifiers,
    },
  },
};
