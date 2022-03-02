import * as Types from "../CommonQuestions/types";
import { DataDrivenTypes as DDT } from "../CommonQuestions/types";
import { PerformanceMeasure as PM } from "./types";

/**
 * Extracts Performance Measure Rates into double array for validation.
 * Should be in order of category string array.
 * If no categories, grabs singleCat backup from data.
 */
export const getPerfMeasureRateArray = (
  formData: Types.PerformanceMeasure,
  renderData: DDT.PerformanceMeasure
) => {
  const performanceMeasureData: PM[][] = [];

  if (renderData.categories?.length) {
    for (const cat of renderData.categories) {
      performanceMeasureData.push(
        formData.PerformanceMeasure?.rates?.[cat.replace(/[^\w]/g, "")] ?? []
      );
    }
  } else if (renderData.qualifiers?.length) {
    performanceMeasureData.push(
      formData.PerformanceMeasure?.rates?.["singleCategory"] ?? []
    );
  }

  return performanceMeasureData;
};

interface PMErrorDictionary {
  [cleanedLabel: string]: string;
}

/** Map the user readable location category to the cleaned category used for data storage. */
export const performanceMeasureErrorLocationDicitonary = (
  renderData: DDT.PerformanceMeasure
) => {
  const errorDict: PMErrorDictionary = {};

  for (const cat of renderData?.categories ?? []) {
    errorDict[cat.replace(/[^\w]/g, "")] = cat;
  }

  errorDict["singleCategory"] = "Performance Measure";
};

export const getDeviationNDRArray = (
  deviationOptions: Types.DeviationFromMeasureSpecification["DeviationOptions"],
  data: Types.DeviationFromMeasureSpecification["Deviations"],
  ageGroups?: boolean
) => {
  let deviationArray: any[] = [];
  deviationOptions?.forEach((option) => {
    const objectToSearch = ageGroups ? data[option] : data;
    if (ageGroups) {
      for (const key of Object.keys(objectToSearch).filter(
        (prop) => prop !== "SelectedOptions"
      )) {
        deviationArray.push(data[option][key as Types.DeviationKeys]);
      }
    } else {
      deviationArray = Object.values(data);
    }
  });
  console.log(deviationArray);
  return deviationArray;
};
