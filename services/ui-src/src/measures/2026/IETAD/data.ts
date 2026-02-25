import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";
import { IETRate } from "components";

export const { categories, qualifiers } = getCatQualLabels("IET-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of new substance use disorder (SUD) episodes that result in treatment initiation and engagement. Two rates are reported:",
    ],
    questionListItems: [
      "Initiation of SUD Treatment. The percentage of new SUD episodes that result in treatment initiation through an inpatient SUD admission, outpatient visit, intensive outpatient encounter, partial hospitalization, telehealth visit, or medication treatment within 14 days.",
      "Engagement of SUD Treatment. The percentage of new SUD episodes that have evidence of treatment engagement within 34 days of initiation.",
    ],
    categories,
    qualifiers,
    measureName: "IET-AD",
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
      { value: DC.ELECTRONIC_HEALTH_RECORDS, description: true },
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
  },
  custom: {
    RateComponent: IETRate,
  },
  validations: [
    "validateFfsRadioButtonCompletion",
    "validateAtLeastOneDataSourceType",
    "validateOneCatRateHigherThanOtherCatOMS",
    "validateOneCatRateHigherThanOtherCatPM",
    "validateReasonForNotReporting",
    "validateDateRangeRadioButtonCompletion",
    "validateAtLeastOneDataSource",
    "validateDeviationTextFieldFilled",
    "validateSameDenominatorSetsOMS",
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
    "validateEqualQualifierDenominatorsPM",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateEqualQualifierDenominatorsPM: {
      category: true,
      errorMessage: true,
    },
    validateOneCatRateHigherThanOtherCat: [
      {
        increment: 2,
      },
    ],
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
