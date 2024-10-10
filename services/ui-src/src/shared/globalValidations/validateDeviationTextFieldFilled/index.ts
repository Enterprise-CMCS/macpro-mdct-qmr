import { getMeasureYear } from "utils/getMeasureYear";

// When a user indicates that there is a deviation, they must add an explanation in the textarea.
const getLabels = (year: number) => {
  switch (year) {
    case 2021:
    case 2022:
    case 2023:
      return {
        location: "Deviations from Measure Specifications",
        message: "Deviation(s) must be explained",
      };
    default:
      return {
        location: "Variations from Measure Specifications",
        message: "Variation(s) must be explained",
      };
  }
};

export const validateDeviationTextFieldFilled = (
  didCalculationsDeviate: boolean,
  deviationReason: string,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;

  const year = getMeasureYear();
  const labels = getLabels(year);

  if (didCalculationsDeviate) {
    if (!!deviationReason) {
      reasonGiven = true;
    }

    if (!reasonGiven) {
      errorArray.push({
        errorLocation: labels.location,
        errorMessage: errorMessage ?? labels.message,
      });
    }
  }
  return errorArray;
};
