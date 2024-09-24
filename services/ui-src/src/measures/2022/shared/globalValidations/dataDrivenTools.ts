import * as DC from "dataConstants";
import * as Types from "shared/types";
import { DataDrivenTypes as DDT } from "shared/types";
import { LabelData, cleanString } from "utils";
import { FormRateField as PM, RateData } from "./types";

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
        formData.PerformanceMeasure?.rates?.[cat.id] ?? []
      );
    }
  } else if (renderData.qualifiers?.length) {
    performanceMeasureData.push(
      formData.PerformanceMeasure?.rates?.[DC.SINGLE_CATEGORY] ?? []
    );
  }

  return performanceMeasureData;
};

/**
 * Extracts OPM into double array for validation.
 */
export const getOtherPerformanceMeasureRateArray = (
  opmRates: Types.OtherRatesFields[]
) => {
  const otherPmData: PM[][] = [];
  if (opmRates && opmRates?.length) {
    for (const rates of opmRates) {
      if (rates.rate) {
        otherPmData.push(rates.rate);
      }
    }
  }
  return otherPmData;
};

/** Utility function for converting oms data to be the same as returned performance measure. Encourages shared validations. */
export const convertOmsDataToRateArray = (
  categories: LabelData[],
  qualifiers: LabelData[],
  rateData: RateData
) => {
  const rateArray: PM[][] = [];

  for (const cat of categories.map((c) => c.id)) {
    const tempArr: PM[] = [];
    for (const qual of qualifiers.map((q) => q.id)) {
      tempArr.push(rateData.rates?.[qual]?.[cat]?.[0] ?? {});
    }
    rateArray.push(tempArr);
  }

  return rateArray;
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
    errorDict[cat.id] = cat.label;
  }

  errorDict[DC.SINGLE_CATEGORY] = DC.PERFORMANCE_MEASURE;

  return errorDict;
};

/**
 * Takes render data for OMS and creates a cleaned dictionary of node locations for error generation.
 */
export const omsLocationDictionary = (
  renderData: DDT.OptionalMeasureStrat,
  qualifiers?: LabelData[],
  categories?: LabelData[]
) => {
  const dictionary: { [cleanedLabel: string]: string } = {};
  const checkNode = (node: DDT.SingleOmsNode) => {
    // dive a layer
    for (const option of node.options ?? []) {
      checkNode(option);
    }
    dictionary[cleanString(node.id)] = node.id;
  };

  for (const node of renderData) {
    checkNode(node);
  }

  for (const qual of qualifiers ?? []) {
    dictionary[qual.id] = qual.label;
  }

  for (const cat of categories ?? []) {
    dictionary[cat.id] = cat.label;
  }

  dictionary[DC.SINGLE_CATEGORY] = "";

  return (labels: string[]) =>
    labels.reduce((prevValue, currentValue, index) => {
      if (index === 0) {
        return dictionary[currentValue] ?? currentValue;
      }
      if (prevValue === "") {
        return `${dictionary[currentValue] ?? currentValue}`;
      }
      if (dictionary[currentValue] === "") {
        return prevValue;
      }
      return `${prevValue} - ${dictionary[currentValue] ?? currentValue}`;
    }, "");
};

export const getDeviationNDRArray = (
  deviationOptions: Types.DeviationFromMeasureSpecificationCheckboxes[typeof DC.DEVIATION_OPTIONS],
  data: Types.DeviationFromMeasureSpecificationCheckboxes[typeof DC.DEVIATIONS],
  ageGroups?: boolean
) => {
  let deviationArray: any[] = [];
  deviationOptions?.forEach((option) => {
    const objectToSearch = ageGroups && data ? data[option] : data;
    if (objectToSearch) {
      if (ageGroups) {
        if (objectToSearch.RateDeviationsSelected) {
          deviationArray.push(objectToSearch);
        } else {
          for (const key of Object.keys(objectToSearch).filter(
            (prop) => prop !== DC.SELECTED_OPTIONS
          )) {
            deviationArray.push(data[option][key as Types.DeviationKeys]);
          }
        }
      } else if (data) {
        deviationArray = Object.values(data);
      }
    }
  });
  return deviationArray;
};
