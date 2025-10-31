import { FormError } from "error";
import { featuresByYear } from "utils/featuresByYear";

// When a user indicates that there is a deviation, they must add an explanation in the textarea.
const getLabels = () => {
  if (featuresByYear.displayDeviationlanguage) {
    return {
      location: "Deviations from Measure Specifications",
      message: "Deviation(s) must be explained",
    };
  }
  return {
    location: "Variations from Measure Specifications",
    message: "Variation(s) must be explained",
  };
};

export const validateDeviationTextFieldFilled = (
  didCalculationsDeviate: boolean,
  deviationReason: string,
  errorMessage?: string
) => {
  let errorArray: FormError[] = [];
  let reasonGiven: boolean = false;

  const labels = getLabels();

  if (didCalculationsDeviate) {
    if (deviationReason) {
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
