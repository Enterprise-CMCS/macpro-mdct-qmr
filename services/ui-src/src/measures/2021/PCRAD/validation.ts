import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import * as Types from "measures/CommonQuestions/types";
import { FormData } from "./types";
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
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    false
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  // Quick reference list of all rate indices
  // const rateLocations = ndrForumlas.map((ndr) => ndr.rateIndex);
  errorArray = [
    ...PCRADatLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateOneDataSource(data),
    ...PCRADnoNonZeroNumOrDenom(performanceMeasureArray, OPM, ndrForumlas),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [OMSValidations],
    }),
    ...PCRADvalidateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ndrForumlas,
      deviationArray,
      didCalculationsDeviate
    ),
  ];
  return errorArray;
};

const OMSValidations: GV.OmsValidationCallback = ({
  rateData,
  locationDictionary,
  label,
}) => {
  const rates = Object.keys(rateData?.rates ?? {}).map((x) => {
    return { rate: [rateData?.rates?.[x].OPM[0]] };
  });
  return [
    ...PCRADnoNonZeroNumOrDenom(
      [rateData?.["pcrad-rate"] ?? []],
      rates ?? [],
      ndrForumlas,
      `Optional Measure Stratification: ${locationDictionary(label)}`
    ),
    ...PCRADatLeastOneRateComplete(
      [rateData?.["pcrad-rate"] ?? []],
      rates ?? [],
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
    if (performanceMeasure && performanceMeasure.length > 0) {
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
      performanceMeasure.rate?.forEach((rate: any) => {
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
      errorMessage: `Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.`,
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
      if (measure?.rate && measure?.rate?.[0]?.rate) {
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
      errorMessage: "All data fields must be completed.",
    });
  }
  return error ? errorArray : [];
};

/*
 * If the user indicates that there is a deviation from the measure spec, they must
 * indicate where the deviation is.
 */
export const PCRADvalidateAtLeastOneNDRInDeviationOfMeasureSpec = (
  performanceMeasureArray: any,
  ndrFormulas: NDRforumla[],
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean
) => {
  let errorArray: FormError[] = [];
  let ndrCount = 0;

  if (didCalculationsDeviate) {
    performanceMeasureArray?.forEach((performanceMeasure: any) => {
      if (performanceMeasure && performanceMeasure.length > 0) {
        ndrFormulas.forEach((ndr: NDRforumla) => {
          if (
            performanceMeasure[ndr.numerator].value &&
            performanceMeasure[ndr.denominator].value &&
            performanceMeasure[ndr.rateIndex].value
          ) {
            ndrCount++;
          }
        });
      }
    });

    let deviationArrayLength = 0;
    deviationArray.forEach((itm: string) => {
      if (itm) deviationArrayLength++;
    });

    if (ndrCount > 0) {
      const atLeastOneDevSection = deviationArrayLength > 0 ? true : false;

      if (!atLeastOneDevSection) {
        errorArray.push({
          errorLocation: "Deviations from Measure Specifications",
          errorMessage:
            "At least one item must be selected and completed (Numerator, Denominator, or Other)",
        });
      }
    }
  }

  return errorArray;
};

export const validationFunctions = [
  PCRADValidation,
  GV.validateRequiredRadioButtonForCombinedRates,
];
