import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("AIS-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "The percentage of beneficiaries age 19 and older who are up to date on recommended routine vaccines for influenza, tetanus and diphtheria (Td) or tetanus, diphtheria and acellular pertussis (Tdap), zoster and pneumococcal.",
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
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
  },
  validations: [
    "validateFfsRadioButtonCompletion",
    "validateAtLeastOneDataSourceType",
    "validateReasonForNotReporting",
    "validateDateRangeRadioButtonCompletion",
    "validateAtLeastOneDataSource",
    "validateEqualQualifierOfCategoryDenominatorsOMS",
    "validateEqualQualifierOfCategoryDenominatorsPM",
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
  ],
  override: {
    validateEqualQualifierOfCategoryDenominators: [
      { categories: ["VZ0nYO", "2Bh7J8"], ageGroups: ["xz7TUf", "VooeEU"] },
      { categories: ["HCnSrs", "B4SxBy"], ageGroups: ["VooeEU"] },
    ],
  },
};
