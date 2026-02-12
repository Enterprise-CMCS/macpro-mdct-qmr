export interface OptionNode {
  value: string;
  subOptions?: {
    label?: string;
    options: OptionNode[];
  };
  description?: boolean;
}

export interface DataSourceData {
  options: OptionNode[];
  optionsLabel: string;
}

export const defaultData: DataSourceData = {
  optionsLabel: "Which version of the CAHPS survey was used for reporting?",
  options: [
    {
      value: "CAHPS 5.1H",
    },
    {
      value: "Other Data Source",
      description: true,
    },
  ],
};

export const defaultData2026AndBeyond: DataSourceData = {
  optionsLabel: "Which version of the CAHPS survey was used for reporting?",
  options: [
    {
      value: "CAHPS 5.1H",
    },
    {
      value: "Other",
      description: true,
    },
  ],
};
