import { Measure } from "./types";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  ensureBothDatesCompletedInRange,
  validateNoNonZeroNumOrDenom,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import * as PMD from "./data";

const validateReversibleNumeratorLessThanDenominator = (data: Measure.Form) => {
  const reversibleRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[0].replace(/[^\w]/g, "")}`
    ];
  let error;
  const errorArray: any[] = [];

  if (reversibleRates) {
    reversibleRates.forEach((reversibleRate, _index) => {
      if (
        reversibleRate &&
        reversibleRate?.numerator &&
        reversibleRate?.denominator &&
        parseFloat(reversibleRate?.numerator) >
          parseFloat(reversibleRate?.denominator)
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Reversible Method of Contraception Rate: Numerator must be less than or equal to Denominator for Age`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};
const validateModeratelyNumeratorLessThanDenominator = (data: Measure.Form) => {
  const moderatelyRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[0].replace(/[^\w]/g, "")}`
    ];
  let error;
  const errorArray: any[] = [];

  if (moderatelyRates) {
    moderatelyRates.forEach((moderatelyRate, _index) => {
      if (
        moderatelyRate &&
        moderatelyRate.numerator &&
        moderatelyRate.denominator &&
        parseFloat(moderatelyRate?.numerator) >
          parseFloat(moderatelyRate?.denominator)
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Moderately Effective Method of Contraception Rate: Numerator must be less than or equal to Denominator for Age`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateLarcRateGreater = (data: Measure.Form) => {
  let error;
  const memeRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[1].replace(/[^\w]/g, "")}`
    ] ?? [];

  if (memeRates && larcRates && memeRates[0]?.rate && larcRates[0]?.rate) {
    if (parseFloat(larcRates[0].rate) > parseFloat(memeRates[0].rate)) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate",
      };
    }
  }

  return error;
};

const validateDenominatorsAreTheSame = (data: Measure.Form) => {
  let error;
  const memeRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.qualifiers[1].replace(/[^\w]/g, "")}`
    ] ?? [];

  if (
    memeRates &&
    larcRates &&
    memeRates[0]?.denominator &&
    larcRates[0]?.denominator
  ) {
    if (
      parseFloat(memeRates[0].denominator) !==
      parseFloat(larcRates[0].denominator)
    ) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Long-acting reversible method of contraception (LARC) rate must have the same denominator as Most effective or moderately effective method of contraception rate",
      };
    }
  }

  return error;
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

const validateAtLeastOneNDR = (data: Measure.Form) => {
  const ageGroups = PMD.qualifiers;
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const OPM = data["OtherPerformanceMeasure-Rates"];
  return atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups);
};

const atLeastOneRateComplete = (
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
      errorMessage: `Performance Measure must be completed`,
    });
  }
  return error ? errorArray : [];
};

const validateBothDatesCompletedInRange = (data: Measure.Form) => {
  const dateRange = data["DateRange"];
  return [...ensureBothDatesCompletedInRange(dateRange)];
};

export const validationFunctions = [
  validateBothDatesCompletedInRange,
  validateReversibleNumeratorLessThanDenominator,
  validateModeratelyNumeratorLessThanDenominator,
  validateLarcRateGreater,
  validateDenominatorsAreTheSame,
  validateNonZeroDenom,
  validateAtLeastOneNDR,
  validateRequiredRadioButtonForCombinedRates,
];
