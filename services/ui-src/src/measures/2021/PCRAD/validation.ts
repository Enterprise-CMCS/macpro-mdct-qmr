import { FormData } from "./types";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  ensureBothDatesCompletedInRange,
  validateRequiredRadioButtonForCombinedRates,
  OmsValidationCallback,
  omsLocationDictionary,
  omsValidations,
} from "../../globalValidations";
import * as PMD from "./data";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

interface NDRforumla {
  numerator: number;
  denominator: number;
  rateIndex: number;
}

const ndrForumlas = [
  {
    numerator: 1,
    denominator: 0,
    rateIndex: 2,
  },
  {
    numerator: 3,
    denominator: 0,
    rateIndex: 4,
  },
  {
    numerator: 1,
    denominator: 3,
    rateIndex: 5,
  },
  {
    numerator: 7,
    denominator: 6,
    rateIndex: 8,
  },
];

const PCRADValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const ageGroups = PMD.qualifiers;
  const dateRange = data["DateRange"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const OPM = data["OtherPerformanceMeasure-Rates"];

  // Quick reference list of all rate indices
  // const rateLocations = ndrForumlas.map((ndr) => ndr.rateIndex);
  errorArray = [
    ...PCRADatLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...PCRADnoNonZeroNumOrDenom(performanceMeasureArray, OPM, ndrForumlas),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [OMSValidations],
      checkIsFilled: false,
    }),
  ];
  return errorArray;
};

const OMSValidations: OmsValidationCallback = ({
  rateData,
  locationDictionary,
  label,
}) => {
  return [
    ...PCRADnoNonZeroNumOrDenom(
      [rateData?.["pcrad-rate"] ?? []],
      [],
      ndrForumlas,
      `Optional Measure Stratification: ${locationDictionary(label)}`
    ),
    ...PCRADatLeastOneRateComplete(
      [rateData?.["pcrad-rate"] ?? []],
      [],
      PMD.qualifiers,
      `Optional Measure Stratification: ${locationDictionary(label)}`
    ),
  ];
};

/* Validation for manually entered rates */
const PCRADnoNonZeroNumOrDenom = (
  performanceMeasureArray: any,
  OPM: any,
  ndrFormulas: NDRforumla[],
  errorLocation: string = "Performance Measure/Other Performance Measure"
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];
  performanceMeasureArray?.forEach((performanceMeasure: any) => {
    if (performanceMeasure) {
      ndrFormulas.forEach((ndr: NDRforumla) => {
        if (
          performanceMeasure[ndr.numerator].value &&
          performanceMeasure[ndr.denominator].value &&
          performanceMeasure[ndr.rateIndex].value
        ) {
          if (
            parseFloat(performanceMeasure[ndr.rateIndex].value!) !== 0 &&
            parseFloat(performanceMeasure[ndr.numerator].value!) === 0
          ) {
            nonZeroRateError = true;
          }
          if (
            parseFloat(performanceMeasure[ndr.rateIndex].value!) === 0 &&
            parseFloat(performanceMeasure[ndr.numerator].value!) !== 0 &&
            parseFloat(performanceMeasure[ndr.denominator].value!) !== 0
          ) {
            zeroRateError = true;
          }
        }
      });
    }
  });

  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate.forEach((rate: any) => {
        if (parseFloat(rate.numerator) === 0 && parseFloat(rate.rate) !== 0) {
          nonZeroRateError = true;
        }
        if (
          parseFloat(rate.numerator) !== 0 &&
          parseFloat(rate.denominator) !== 0 &&
          parseFloat(rate.rate) === 0
        ) {
          zeroRateError = true;
        }
      });
    });
  if (nonZeroRateError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};

/* At least one NDR set must be complete (OPM or PM) */
const PCRADatLeastOneRateComplete = (
  performanceMeasureArray: any,
  OPM: any,
  ageGroups: string[],
  errorLocation: string = "Performance Measure/Other Performance Measure"
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

  // Check regular Performance Measures if cannot validate OPM
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
      errorLocation: errorLocation,
      errorMessage: `At least one data section must be completed.`,
    });
  }
  return error ? errorArray : [];
};

export const validationFunctions = [
  PCRADValidation,
  validateRequiredRadioButtonForCombinedRates,
];
