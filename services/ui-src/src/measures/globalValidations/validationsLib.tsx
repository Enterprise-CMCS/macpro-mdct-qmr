import * as Types from "../CommonQuestions/types";
import { PerformanceMeasure } from "./types";
import { DateRange } from "measures/CommonQuestions/types";
import * as DC from "dataConstants";
import { getPerfMeasureRateArray } from "./dataDrivenTools";

export const atLeastOneRateComplete = (
  performanceMeasureArray: PerformanceMeasure[][],
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

  // Then Check regular Performance Measures
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator &&
        performanceMeasureArray[index][i].numerator
      ) {
        error = false;
      }
    });
  });
  if (error) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `At least one Performance Measure Numerator, Denominator, and Rate must be completed`,
    });
  }
  return error ? errorArray : [];
};

export const validateDualPopInformation = (
  performanceMeasureArray: PerformanceMeasure[][],
  OPM: any,
  age65PlusIndex: number,
  DefinitionOfDenominator: any
) => {
  if (OPM) {
    return [];
  }
  let dualEligible;
  if (DefinitionOfDenominator) {
    dualEligible =
      DefinitionOfDenominator.indexOf(
        "DenominatorIncMedicareMedicaidDualEligible"
      ) !== -1;
  } else {
    dualEligible = false;
  }
  let error;
  let errorArray: any[] = [];
  let filledInData: any[] = [];
  const i = age65PlusIndex;
  performanceMeasureArray?.forEach((performanceMeasure) => {
    if (
      performanceMeasure &&
      performanceMeasure[i] &&
      performanceMeasure[i].denominator &&
      performanceMeasure[i].numerator &&
      performanceMeasure[i].rate
    ) {
      filledInData.push(performanceMeasure[i]);
    }
  });
  if (!dualEligible && filledInData.length > 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage:
        "Information has been included in the Age 65 and older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
    });
  }
  if (dualEligible && filledInData.length === 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage:
        "The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Age 65 and Older",
    });
  }
  return error ? errorArray : [];
};

// For every performance measure the Numerators must always be less than the denominators
export const validateNumeratorsLessThanDenominators = (
  performanceMeasureArray: PerformanceMeasure[][],
  OPM: any,
  ageGroups: string[]
) => {
  let error = false;
  let errorArray: any[] = [];
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((performanceMeasure) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].denominator &&
        performanceMeasure[i].numerator
      ) {
        if (
          parseFloat(performanceMeasure[i].denominator!) <
          parseFloat(performanceMeasure[i].numerator!)
        ) {
          error = true;
        }
      }
    });
  });
  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate.forEach((rate: any) => {
        if (parseFloat(rate.numerator) > parseFloat(rate.denominator)) {
          error = true;
        }
      });
    });
  if (error) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `Numerators must be less than Denominators for all applicable performance measures`,
    });
  }
  return error ? errorArray : [];
};

// For each age group the denominators need to be the same for both
// Initiation AND Engagement
export const validateEqualDenominators = (
  performanceMeasureArray: PerformanceMeasure[][],
  ageGroups: string[]
) => {
  let error;
  let errorArray: any[] = [];
  ageGroups.forEach((ageGroup, i) => {
    let filledInData: any[] = [];
    performanceMeasureArray?.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator
      ) {
        filledInData.push(performanceMeasureArray[index][i]);
      }
    });
    if (filledInData.length > 1) {
      let firstDenominator = filledInData[0].denominator;
      let denominatorsNotEqual = false;
      filledInData.forEach((_filledInDataObj, index) => {
        if (filledInData[index].denominator !== firstDenominator) {
          denominatorsNotEqual = true;
        }
      });
      if (denominatorsNotEqual) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for each category of performance measures for ${ageGroup}`,
        };
        errorArray.push(error);
      }
    }
  });
  return errorArray;
};

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero or
// It Must be greater than zero if the Num and Denom are greater than zero
export const validateNoNonZeroNumOrDenom = (
  performanceMeasureArray: PerformanceMeasure[][],
  OPM: any,
  ageGroups: string[]
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray?.forEach((performanceMeasure) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].denominator &&
        performanceMeasure[i].numerator &&
        performanceMeasure[i].rate
      ) {
        if (
          parseFloat(performanceMeasure[i].rate!) !== 0 &&
          parseFloat(performanceMeasure[i].numerator!) === 0
        ) {
          nonZeroRateError = true;
        }
        if (
          parseFloat(performanceMeasure[i].rate!) === 0 &&
          parseFloat(performanceMeasure[i].numerator!) !== 0 &&
          parseFloat(performanceMeasure[i].denominator!) !== 0
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
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: `Performance Measure/Other Performance Measure`,
      errorMessage: `Manually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};

// Ensure the user populates the data range
export const ensureBothDatesCompletedInRange = (
  dateRange: DateRange["DateRange"]
) => {
  let errorArray: any[] = [];
  let error;

  if (dateRange) {
    const startDateCompleted =
      !!dateRange.startDate?.selectedMonth &&
      !!dateRange.startDate?.selectedYear;

    const endDateCompleted =
      !!dateRange.endDate?.selectedMonth && !!dateRange.endDate?.selectedYear;

    if (!startDateCompleted || !endDateCompleted) {
      error = true;
    }

    if (error) {
      errorArray.push({
        errorLocation: `Date Range`,
        errorMessage: `Date Range must be completed`,
      });
    }
  }

  return error ? errorArray : [];
};

export const validateReasonForNotReporting = (
  whyNotReporting: any,
  collecting?: boolean
) => {
  let error = false;
  const errorArray: any[] = [];

  if (!(whyNotReporting && whyNotReporting.length > 0)) {
    error = true;
  }
  if (error) {
    errorArray.push({
      errorLocation: `Why Are You Not ${
        collecting ? "Collecting" : "Reporting"
      } On This Measure`,
      errorMessage: `You must select at least one reason for not ${
        collecting ? "collecting" : "reporting"
      } on this measure`,
    });
  }
  return errorArray;
};

export const validateRequiredRadioButtonForCombinedRates = (
  data: Types.CombinedRates
) => {
  const errorArray: any[] = [];

  if (data.CombinedRates && data.CombinedRates === DC.YES) {
    if (!data["CombinedRates-CombinedRates"]) {
      errorArray.push({
        errorLocation: "Combined Rate(s)",
        errorMessage:
          "You must select at least one option for Combined Rate(s) Details if Yes is selected.",
      });
    }
  }

  return errorArray;
};

export const validateOneRateHigherThanOther = (
  data: Types.DefaultFormData,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  const lowerRate = perfMeasure[1];
  const higherRate = perfMeasure[0];
  let error;
  const errorArray: any[] = [];

  if (lowerRate && higherRate) {
    lowerRate.forEach((_lowerRateObj, index) => {
      if (
        lowerRate[index] &&
        higherRate[index] &&
        parseFloat(lowerRate[index]?.rate ?? "") >
          parseFloat(higherRate[index]?.rate ?? "")
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `${performanceMeasureData.categories?.[1]} Rate should not be higher than ${performanceMeasureData.categories?.[0]} Rate for ${performanceMeasureData.qualifiers?.[index]} Rates`,
        };

        errorArray.push(error);
      }
    });
  }

  return errorArray;
};
