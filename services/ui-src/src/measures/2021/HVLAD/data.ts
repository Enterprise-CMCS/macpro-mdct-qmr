import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("HVL-AD");

export const data: MeasureTemplateData = {
  type: "HRSA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries age 18 and older with a diagnosis of Human Immunodeficiency Virus (HIV) who had a HIV viral load less than 200 copies/mL at last HIV viral load test during the measurement year.",
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
                value: DC.ADMINISTRATIVE_DATA_OTHER,
                description: true,
              },
            ],
          },
        ],
      },
      {
        value: DC.ELECTRONIC_HEALTH_RECORDS,
        description: true,
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
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
