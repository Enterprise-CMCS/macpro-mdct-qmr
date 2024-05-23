import { getMeasureYear } from "./getMeasureYear";

export const displayYearSpecificQuestionText = (
  year: number,
  questionText: string
) => {
  return getMeasureYear() >= year ? questionText : "";
};
