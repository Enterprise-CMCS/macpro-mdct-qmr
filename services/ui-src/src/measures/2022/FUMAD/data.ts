import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUM-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of emergency department (ED) visits for beneficiaries age 18 and Older with a principal diagnosis of mental illness or intentional self-harm and who had a follow-up visit for mental illness. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of ED visits for mental illness for which the beneficiary received follow-up within 30 days of the ED visit (31 total days)",
      "Percentage of ED visits for mental illness for which the beneficiary received follow-up within 7 days of the ED visit (8 total days)",
    ],
    categories,
    qualifiers,
  },
};
