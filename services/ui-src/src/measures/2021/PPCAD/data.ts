import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PPC-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of deliveries of live births on or between October 8 of the year prior to the measurement year and October 7 of the measurement year that had a postpartum visit on or between 7 and 84 days after delivery.",
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
        value: DC.HYBRID_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              {
                value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
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
  opm: {
    excludeOptions: ["Sex"],
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
  ],
  override: {
    omsValidations: {
      dataSource: true,
    },
  },
};
