import { DataDrivenTypes } from "shared/types/FormData";
import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("IET-HH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of new substance use disorder (SUD) episodes that result in treatment initiation and engagement. Two rates are reported:",
  ],
  questionListItems: [
    "Initiation of SUD Treatment. The percentage of new SUD episodes that result in treatment initiation through an inpatient SUD admission, outpatient visit, intensive outpatient encounter, partial hospitalization, telehealth visit, or medication treatment within 14 days.",
    "Engagement of SUD Treatment. The percentage of new SUD episodes that have evidence of treatment engagement within 34 days of initiation.",
  ],
  categories,
  qualifiers,
  measureName: "IET-HH",
};

export const dataSourceData: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: DC.ADMINISTRATIVE_DATA,
      subOptions: [
        {
          label: "What is the Administrative Data Source?",
          options: [
            {
              value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
            },
            {
              value: DC.ADMINISTRATIVE_DATA_OTHER,
              description: true,
            },
          ],
        },
      ],
    },
    {
      value: DC.ELECTRONIC_HEALTH_RECORDS,
      description: true,
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
