import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [];
export const qualifiers = [
  "Ages 18 to 64",
  "Age 65 and older",
  "Total (Age 18 and older)",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Number of inpatient hospital admissions for ambulatory care sensitive chronic conditions per 100,000 enrollee months for Health Home enrollees age 18 and older. This measure includes adult hospital admissions for diabetes with short-term complications, diabetes with long-term complications, uncontrolled diabetes without complications, diabetes with lower-extremity amputation, chronic obstructive pulmonary disease, asthma, hypertension, or heart failure without a cardiac procedure.",
  ],
  categories,
  qualifiers,
};
