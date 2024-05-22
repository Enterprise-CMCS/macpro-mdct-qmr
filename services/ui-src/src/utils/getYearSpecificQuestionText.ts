import { getMeasureYear } from "./getMeasureYear";

export const getYearSpecificQuestionText = (
  year: number,
  questionText: string
) => {
  return getMeasureYear() >= year ? questionText : "";
};
