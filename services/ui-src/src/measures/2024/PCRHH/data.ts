import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PCR-HH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "For health home enrollees ages 18 to 64, the number of acute inpatient and observation stays during the measurement year that were followed by an unplanned acute readmission for any diagnosis within 30 days and the predicted probability of an acute readmission.  Data are reported in the following categories:",
  ],
  questionListItems: [
    "Count of Index Hospital Stays (IHS) ",
    "Count of Observed 30-Day Readmissions",
    "Count of Expected 30-Day Readmissions",
  ],
  categories,
  qualifiers,
};
