import * as Types from "measures/CommonQuestions/types";
import { DataDrivenTypes as DDT } from "measures/CommonQuestions/types";
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
