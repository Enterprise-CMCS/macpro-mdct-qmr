import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("IMA-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of adolescents age 13 who had one dose of meningococcal vaccine, one tetanus, diphtheria toxoids and acellular pertussis (Tdap) vaccine, and have completed  the human papillomavirus (HPV) vaccine series by their 13th birthday. The measure calculates a rate for each vaccine and two combination rates.",
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
        value: DC.ADMINISTRATIVE_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              {
                value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
              },
              {
                value: DC.IMMUNIZATION_REGISTRY,
              },
              {
                value: DC.ADMINISTRATIVE_DATA_OTHER,
                description: true,
              },
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
              {
                value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
              },
              {
                value: DC.IMMUNIZATION_REGISTRY,
              },
              {
                value: DC.OTHER,
                description: true,
              },
            ],
          },
          {
            label: "What is the Medical Records Data Source?",
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
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateOneCatRateHigherThanOtherCatOMS,
    GV.validateReasonForNotReporting,
    GV.validateAtLeastOneDataSource,
    GV.validateAtLeastOneRateComplete,
    GV.validateRateZeroOMS,
    GV.validateRateZeroPM,
    GV.validateRateNotZeroOMS,
    GV.validateRateNotZeroPM,
    GV.validateNumeratorLessThanDenominatorOMS,
    GV.validateNumeratorsLessThanDenominatorsPM,
    GV.validateBothDatesCompleted,
    GV.validateEqualQualifierDenominatorsOMS,
    GV.validateEqualCategoryDenominatorsOMS,
    GV.validateEqualCategoryDenominatorsPM,
    GV.validateYearFormat,
  ],
  override: {
    validateEqualCategoryDenominatorsPM: {
      qualifiers,
    },
    omsValidations: {
      dataSource: true,
    },
  },
};
