import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("OUD-AD");

export const data: MeasureTemplateData = {
  type: "SAMHSA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of Medicaid beneficiaries age 18 and older with an opioid use disorder (OUD) who filled a prescription for or were administered or dispensed an FDA-approved medication for the disorder during the measurement year. Five rates are reported:",
      "A total (overall) rate capturing any medication used in medication assisted treatment of opioid dependence and addiction (Rate 1).",
      "Four separate rates representing the following types of FDA-approved drug products:",
    ],
    questionListItems: [
      "Buprenorphine (Rate 2)",
      "Oral naltrexone (Rate 3)",
      "Long-acting, injectable naltrexone (Rate 4)",
      "Methadone (Rate 5)",
    ],
    categories,
    qualifiers,
  },
};
