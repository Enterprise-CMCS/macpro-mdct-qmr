import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PQI92-HH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Hospitalizations for ambulatory care sensitive chronic conditions per 100,000 enrollee months for health home enrollees age 18 and older. This measure includes adult hospitalizations for diabetes with short-term complications, diabetes with long-term complications, uncontrolled diabetes without complications, diabetes with lower-extremity amputation, chronic obstructive pulmonary disease, asthma, hypertension, or heart failure without a cardiac procedure.",
  ],
  categories,
  qualifiers,
};
