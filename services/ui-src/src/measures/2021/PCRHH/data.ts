import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PCR-HH");

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

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "For Health Home enrollees ages 18 to 64, the number of acute inpatient and observation stays during the measurement year that were followed by an unplanned acute readmission for any diagnosis within 30 days and the predicted probability of an acute readmission.  Data are reported in the following categories:",
    ],
    questionListItems: [
      "Count of Index Hospital Stays (IHS) ",
      "Count of Observed 30-Day Readmissions",
      "Count of Expected 30-Day Readmissions",
    ],
    categories,
    qualifiers,
    ndrFormulas,
    measureName: "PCRHH",
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateReasonForNotReporting,
    GV.validateAtLeastOneDataSource,
    GV.validateBothDatesCompleted,
    GV.validateYearFormat,
    GV.PCRatLeastOneRateComplete,
    GV.PCRnoNonZeroNumOrDenom,
    GV.PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec,
  ],
};
