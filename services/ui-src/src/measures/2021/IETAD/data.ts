import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("IET-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "The percentage of beneficiaries age 18 and older with a new episode of alcohol or other drug (AOD) abuse or dependence who received the following:",
    ],
    questionListItems: [
      "Initiation of AOD Treatment. Percentage of beneficiaries who initiate treatment through an inpatient AOD admission, outpatient visit, intensive outpatient encounter or partial hospitalization, telehealth, or medication treatment within 14 days of the diagnosis.",
      "Engagement of AOD Treatment. Percentage of beneficiaries who initiated treatment and who were engaged in ongoing AOD treatment within 34 days of the initiation visit.",
    ],
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
    GV.validateOneCatRateHigherThanOtherCatOMS,
    GV.validateOneCatRateHigherThanOtherCatPM,
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
    GV.validateEqualQualifierDenominatorsPM,
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
  override: {
    validateEqualQualifierDenominatorsPM: {
      category: true,
      errorMessage: true,
    },
    validateOneCatRateHigherThanOtherCatPM: {
      increment: 2,
    },
    validateOneCatRateHigherThanOtherCatOMS: {
      increment: 2,
    },
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
