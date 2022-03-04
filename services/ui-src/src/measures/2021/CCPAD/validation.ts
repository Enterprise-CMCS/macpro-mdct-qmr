import { FormData } from "./types";
import * as PMD from "./data";
import {
  getPerfMeasureRateArray,
  getDeviationNDRArray,
} from "measures/globalValidations";

import {
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  ensureBothDatesCompletedInRange,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
const CCPADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data["DateRange"];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...ensureBothDatesCompletedInRange(dateRange),
  ];
  return errorArray;
};

export const validateNoNonZeroNumOrDenom = (
  performanceMeasureArray: any[][],
  OPM: any,
  ageGroups: string[]
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray.forEach((performanceMeasure) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].denominator &&
        performanceMeasure[i].numerator &&
        performanceMeasure[i].rate
      ) {
        if (
          parseFloat(performanceMeasure[i].rate) !== 0 &&
          parseFloat(performanceMeasure[i].numerator) === 0
        ) {
          nonZeroRateError = true;
        }
        if (
          parseFloat(performanceMeasure[i].rate) === 0 &&
          parseFloat(performanceMeasure[i].numerator) !== 0 &&
          parseFloat(performanceMeasure[i].denominator) !== 0
        ) {
          zeroRateError = true;
        }
      }
    });
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
      errorLocation: "Performance Measure",
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Manually entered rate should not be 0 if numerator and denominator are not 0`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};

const validateThirtyDayNumeratorLessThanDenominator = (data: FormData) => {
  const thirtyDays = getPerfMeasureRateArray(data, PMD.data)[0];
  let error;
  const errorArray: any[] = [];

  if (thirtyDays) {
    thirtyDays.forEach((thirtyDay, index) => {
      if (
        thirtyDay &&
        thirtyDay.numerator &&
        thirtyDay.denominator &&
        parseFloat(thirtyDay?.numerator) > parseFloat(thirtyDay?.denominator)
      ) {
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Most Effective/Moderately Effective Contraceptive: Numerator must be less than or equal to Denominator for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateSevenDayNumeratorLessThanDenominator = (data: FormData) => {
  const sevenDays = getPerfMeasureRateArray(data, PMD.data)[1];
  let error;
  const errorArray: any[] = [];

  if (sevenDays) {
    sevenDays.forEach((sevenDay, index) => {
      if (
        sevenDay &&
        sevenDay.numerator &&
        sevenDay.denominator &&
        parseFloat(sevenDay?.numerator) > parseFloat(sevenDay?.denominator)
      ) {
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Long-acting Reversible Contraceptive (LARC): Numerator must be less than or equal to Denominator for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validate7DaysGreaterThan30Days = (data: FormData) => {
  const perfMeasure = getPerfMeasureRateArray(data, PMD.data);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        parseFloat(sevenDays[index]?.rate ?? "") >
          parseFloat(thirtyDays[index]?.rate ?? "")
      ) {
        const ageGroup =
          index === 0 ? "3 Days Postpartum" : "60 Days Postpartum";
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Long-acting Reversible Contraception (LARC) Rate should not be higher than Most Effective or Moderately Effective Contraception Rate for ${ageGroup} Rates`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateAtLeastOneNDRSet = (data: FormData) => {
  let error;
  const measureSpecification = data["MeasurementSpecification"];
  const perfMeasure = getPerfMeasureRateArray(data, PMD.data);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];
  const otherPerformanceRates = data["OtherPerformanceMeasure-Rates"] ?? [];
  const isHEDIS = measureSpecification === "OPA";

  let doesOtherNDRExist = false;
  otherPerformanceRates.forEach((ndr) => {
    const ndrRate = ndr?.rate?.[0]?.rate;
    if (ndrRate) {
      doesOtherNDRExist = true;
    }
  });

  if (
    isHEDIS &&
    !sevenDays?.[0]?.rate &&
    !sevenDays?.[1]?.rate &&
    !thirtyDays?.[0]?.rate &&
    !thirtyDays?.[1]?.rate
  ) {
    error = {
      errorLocation: "Performance Measure",
      errorMessage:
        "At least one Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  } else if (measureSpecification && !isHEDIS && !doesOtherNDRExist) {
    error = {
      errorLocation: "Other Performance Measure",
      errorMessage:
        "At least one Other Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  }

  return error;
};

const validate3daysLessOrEqualTo30days = (data: FormData) => {
  const perfMeasure = getPerfMeasureRateArray(data, PMD.data);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (
      parseFloat(sevenDays[0].rate ?? "") > parseFloat(sevenDays[1].rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The rate value of the 3 Day Postpartum rate must be less than or equal to the Sixty Day Postpartum rate within Long-acting Reversible Method of Contraception (LARC)",
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (
      parseFloat(thirtyDays[0].rate ?? "") >
      parseFloat(thirtyDays[1].rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The rate value of the 3 Day Postpartum rate must be less than or equal to the Sixty Day Postpartum rate within Most Effective or Moderately Effective Method of Contraception",
      });
    }
  }

  return errorArray;
};

const validateDenominatorsAreEqual = (data: FormData) => {
  const perfMeasure = getPerfMeasureRateArray(data, PMD.data);
  const larcCont = perfMeasure[1];
  const memeCont = perfMeasure[0];
  const errorArray: any[] = [];

  if (larcCont?.length && memeCont?.length) {
    for (const larcRate of larcCont) {
      for (const memeRate of memeCont) {
        if (larcRate?.denominator && memeRate?.denominator) {
          const larcParsedInt = parseFloat(larcRate.denominator);
          const memeParsedInt = parseFloat(memeRate.denominator);
          if (larcParsedInt !== memeParsedInt) {
            errorArray.push({
              errorLocation: "Performance Measure",
              errorMessage:
                "All denominators of Long-acting Reversible Method of Contraception (LARC) Rates and Most Effective and Moderately Effective Method of Contraception must be the same.",
            });
            break;
          }
        }
      }
      if (errorArray.length) break;
    }
  }

  return errorArray;
};

export const validationFunctions = [
  CCPADValidation,
  validateSevenDayNumeratorLessThanDenominator,
  validateThirtyDayNumeratorLessThanDenominator,
  validateAtLeastOneNDRSet,
  validate7DaysGreaterThan30Days,
  validate3daysLessOrEqualTo30days,
  validateDenominatorsAreEqual,
  validateRequiredRadioButtonForCombinedRates,
];
