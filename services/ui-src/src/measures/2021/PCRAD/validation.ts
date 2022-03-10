import { Measure } from "./types";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  ensureBothDatesCompletedInRange,
  validateNoNonZeroNumOrDenom,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import * as PMD from "./data";

const PCRADValidation = (data: Measure.Form) => {
  let errorArray: any[] = [];
  const ageGroups = PMD.qualifiers;
  const dateRange = data["DateRange"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const OPM = data["OtherPerformanceMeasure-Rates"];

  console.log(performanceMeasureArray);
  errorArray = [
    ...PCRADatLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...ensureBothDatesCompletedInRange(dateRange),
  ];
  return errorArray;
};

const validateNonZeroDenom = (data: Measure.Form) => {
  const memeRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[1].replace(/[^\w]/g, "")}`
    ] ?? [];

  return validateNoNonZeroNumOrDenom(
    [memeRates, larcRates],
    data["OtherPerformanceMeasure-Rates"],
    [""]
  );
};

/* At least one NDR set must be complete (OPM or PM) */
const PCRADatLeastOneRateComplete = (
  performanceMeasureArray: any,
  OPM: any,
  ageGroups: string[]
) => {
  let error = true;
  let errorArray: any[] = [];
  // Check OPM first
  OPM &&
    OPM.forEach((measure: any) => {
      if (measure.rate && measure.rate[0] && measure.rate[0].rate) {
        error = false;
      }
    });

  // Then check regular Performance Measures if cannot validate OPM
  // For each Performance Measure
  //    Check that the performance measure has a field representation for each age groups
  //    Check that each field has a "value" and it is not an empty string
  //    For a complete measure the sum of the booleans will equal the length of the age groups
  if (error) {
    performanceMeasureArray?.forEach((_performanceObj: any) => {
      if (_performanceObj.length === ageGroups.length) {
        const values = _performanceObj.map((obj: any) => {
          if (obj?.value && obj.value) return true;
          return false;
        });
        const sum = values.reduce((x: any, y: any) => x + y);
        if (sum === ageGroups.length) error = false;
      }
    });
  }

  if (error) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `A Performance Measure section must be completed.`,
    });
  }
  return error ? errorArray : [];
};

export const validationFunctions = [
  PCRADValidation,
  validateNonZeroDenom,
  validateRequiredRadioButtonForCombinedRates,
];
