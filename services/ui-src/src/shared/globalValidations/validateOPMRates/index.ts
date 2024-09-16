import { OtherPerformanceMeasure } from "shared/types";

/* Other Performance Measure Rate Description. Check all rate descriptions 
to make sure there are no identical descriptions */

export const validateOPMRates = (
  otherPerformanceMeasure: OtherPerformanceMeasure["OtherPerformanceMeasure-Rates"],
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];

  if (otherPerformanceMeasure) {
    const opm_descriptions = otherPerformanceMeasure.filter(
      (item: any) => !!item.description
    );

    const formattedDescriptions = opm_descriptions.map((item: any) =>
      item.description.trim()
    );

    const hasDuplicates = formattedDescriptions.some((desc: any, index) => {
      return formattedDescriptions.indexOf(desc) !== index;
    });

    if (hasDuplicates) {
      errorArray.push({
        errorLocation: "Other Performance Measure",
        errorMessage: errorMessage ?? "Measure description must be unique.",
      });
    }
  }

  //check to see if the rate has been described for other performance measure
  if (otherPerformanceMeasure.find((rates) => !rates.description)) {
    errorArray.push({
      errorLocation: `Other Performance Measure`,
      errorMessage: "Rate name required",
    });
  }

  return errorArray;
};
