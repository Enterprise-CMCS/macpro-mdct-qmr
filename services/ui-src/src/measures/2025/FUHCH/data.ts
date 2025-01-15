import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUH-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of discharges for beneficiaries ages 6 to 17 who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of discharges for which the beneficiary received follow-up within 30 days after discharge",
      "Percentage of discharges for which the beneficiary received follow-up within 7 days after discharge",
    ],
    categories,
    qualifiers,
  },
};
