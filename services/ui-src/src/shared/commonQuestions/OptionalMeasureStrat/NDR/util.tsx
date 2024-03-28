import { LabelData, cleanString } from "utils";

export const stringToLabelData = (arr: string[] | LabelData[]): LabelData[] => {
  if (typeof arr[0] === "string") {
    (arr as string[]).map((qual: string) => {
      return { id: cleanString(qual), label: qual, text: qual };
    });
  }
  return arr as LabelData[];
};
