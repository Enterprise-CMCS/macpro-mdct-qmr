export interface OptionNode {
  value: string;
  descriptionField?: boolean;
  subOptions?: {
    label?: string;
    options: OptionNode[];
  };
}

export interface DataSourceData {
  options: OptionNode[];
  optionsLabel: string;
}

export const defaultData: DataSourceData = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: "Administrative Data",
      subOptions: {
        label: "What is the Administrative Data Source?",
        options: [
          {
            value: "Medicaid Management Information System (MMIS)",
          },
          {
            value: "Administrative Data Other",
            descriptionField: true,
          },
        ],
      },
    },
    {
      value: "Electronic Health Records",
      descriptionField: true,
    },
    {
      value: "Other Data Source",
      descriptionField: true,
    },
  ],
};
