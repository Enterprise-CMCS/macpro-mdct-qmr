import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";

export const { categories, qualifiers } = getCatQualLabels("PCR-AD");

export const ndrFormulas = [
  {
    numerator: 1,
    denominator: 0,
    rateIndex: 2,
  },
  {
    numerator: 3,
    denominator: 0,
    rateIndex: 4,
  },
  {
    numerator: 1,
    denominator: 3,
    rateIndex: 5,
  },
  {
    numerator: 7,
    denominator: 6,
    rateIndex: 8,
  },
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "For beneficiaries ages 18 to 64, the number of acute inpatient and observation stays during the measurement year that were followed by an unplanned acute readmission for any diagnosis within 30 days and the predicted probability of an acute readmission. Data are reported in the following categories:",
  ],
  questionListItems: [
    "Count of Index Hospital Stays (IHS)",
    "Count of Observed 30-Day Readmissions",
    "Count of Expected 30-Day Readmissions",
  ],
  categories,
  qualifiers,
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateReasonForNotReporting,
    GV.validateAtLeastOneDataSource,
    GV.validateBothDatesCompleted,
    GV.validateYearFormat,
  ],
};
