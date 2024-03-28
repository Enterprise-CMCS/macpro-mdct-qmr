import { LabelData, cleanString } from "utils";

//this function is to convert legacy data structure that's used for 2021 & 2022 data to work with year >= 2023 components
export const stringToLabelData = (arr: string[] | LabelData[]): LabelData[] => {
  if (typeof arr[0] === "string") {
    (arr as string[]).map((qual: string) => {
      return { id: cleanString(qual), label: qual, text: qual };
    });
  }
  return arr as LabelData[];
};
