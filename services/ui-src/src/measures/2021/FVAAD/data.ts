import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = ["Ages 18 to 64"];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 18 to 64 who received a flu vaccination between July 1 of the measurement year and the date when the CAHPS 5.1H Adult Survey was completed.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};

export const dataSourceData: DataDrivenTypes.DataSource = {
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
