import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUA-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of emergency department (ED) visits for beneficiaries age 18 and Older with a principal diagnosis of Substance Use Disorder (SUD), or any diagnosis of drug overdose, for which there was follow-up. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of ED visits for which the beneficiary received follow-up within 30 days of the ED visit (31 total days)",
      "Percentage of ED visits for which the beneficiary received follow-up within 7 days of the ED visit (8 total days)",
    ],
    categories,
    qualifiers,
  },
};
