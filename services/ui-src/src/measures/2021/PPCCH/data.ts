import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PPC-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of deliveries of live births on or between October 8 of the year prior to the measurement year and October 7 of the measurement year that received a prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  dataSource: {
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
                value: DC.VITAL_DATA_SOURCE,
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
        value: DC.HYBRID_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              {
                value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
              },
              {
                value: DC.VITAL_DATA_SOURCE,
              },
              {
                value: DC.OTHER,
                description: true,
              },
            ],
          },
          {
            label: "What is the Medical Records Data Source?",
            options: [
              {
                value: DC.EHR_DATA,
              },
              {
                value: DC.PAPER,
              },
            ],
          },
        ],
      },
      {
        value: DC.OTHER_DATA_SOURCE,
        description: true,
      },
    ],
  },
  opm: {
    excludeOptions: ["Sex"],
  },
};
