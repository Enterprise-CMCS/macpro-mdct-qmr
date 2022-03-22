import * as DC from "dataConstants";

export interface OptionNode {
  value: string;
  subOptions?: {
    label?: string;
    options: OptionNode[];
  }[];
  description?: boolean;
}

export interface DataSourceData {
  describeMultipleSources?: string[];
  options: OptionNode[];
  optionsLabel: string;
}

export const defaultData: DataSourceData = {
  describeMultipleSources: ["Source 1", "Source 2"],
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
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
