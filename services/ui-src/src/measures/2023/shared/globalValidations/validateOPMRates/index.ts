import { OtherPerformanceMeasure } from "measures/2023/shared/CommonQuestions/types";

/* Other Performance Measure Rate Description. Check all rate descriptions 
to make sure there are no identical descriptions */

export const validateOPMRates = (
  otherPerformanceMeasure: OtherPerformanceMeasure["OtherPerformanceMeasure-Rates"],
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];

  if (otherPerformanceMeasure) {
    const opm_descriptions = otherPerformanceMeasure.map(
      (item) => item.description
    );
    const hasDuplicates = opm_descriptions.some((desc, index) => {
      return opm_descriptions.indexOf(desc) !== index;
    });

    if (hasDuplicates) {
      errorArray.push({
        errorLocation: "Other Performance Measure",
        errorMessage: errorMessage ?? "Measure description must be unique.",
      });
    }
  }

  return errorArray;
};
