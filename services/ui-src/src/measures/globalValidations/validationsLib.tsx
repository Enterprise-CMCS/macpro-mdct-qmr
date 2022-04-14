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
  let errorArray: FormError[] = [];
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
  DefinitionOfDenominator: any,
  errorReplacementText: string = "Age 65 and Older"
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
  let errorArray: FormError[] = [];
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
      errorMessage: `Information has been included in the ${errorReplacementText} Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`,
    });
  }
  if (dualEligible && filledInData.length === 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for ${errorReplacementText}`,
    });
  }
  return error ? [errorArray[0]] : [];
};

// For every performance measure the Numerators must always be less than the denominators
export const validateNumeratorsLessThanDenominators = (
  performanceMeasureArray: PerformanceMeasure[][],
  OPM: any,
  ageGroups: string[]
) => {
  let error = false;
  let errorArray: FormError[] = [];
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
  ageGroups: string[],
  explicitErrorMessage?: string
) => {
  let error;
  let errorArray: FormError[] = [];
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
          errorMessage:
            explicitErrorMessage ||
            `Denominators must be the same for each category of performance measures for ${ageGroup}`,
        };
        errorArray.push(error);
      }
    }
  });
  return errorArray;
};

/** Checks all rates have the same denominator for both categories and qualifiers. NOTE: only pass qualifiers if category is empty */
export const validateAllDenomsTheSameCrossQualifier = (
  data: Types.DefaultFormData,
  categories: string[],
  qualifiers?: string[]
) => {
  const cleanString = (s: string) => s.replace(/[^\w]/g, "");
  const denomArray: string[] = [];
  const locationArray: string[] = [];
  const checkedCats = categories.length ? categories : ["singleCategory"];

  for (const category of checkedCats) {
    const cat = cleanString(category);
    // for (const ndr of data.PerformanceMeasure?.rates?.[cat] ?? []) {
    for (
      let i = 0;
      i < (data?.PerformanceMeasure?.rates?.[cat]?.length ?? 0);
      i++
    ) {
      const ndr = data?.PerformanceMeasure?.rates?.[cat]?.[i];
      if (ndr?.denominator) {
        denomArray.push(ndr.denominator);
        locationArray.push(qualifiers ? qualifiers[i] : category);
      }
    }
  }

  const areTheSame = denomArray.every((denom) => denom === denomArray[0]);

  return !areTheSame
    ? [
        {
          errorLocation: "Performance Measure",
          errorMessage: `The following categories must have the same denominator:`,
          errorList: locationArray.filter((v, i, a) => a.indexOf(v) === i),
        },
      ]
    : [];
};

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero or
// It Must be greater than zero if the Num and Denom are greater than zero
export const validateNoNonZeroNumOrDenom = (
  performanceMeasureArray: PerformanceMeasure[][],
  OPM: any,
  ageGroups: string[],
  hybridData: boolean = false
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
  if (nonZeroRateError && !hybridData) {
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

/*
Validate that the values represented in the Total NDR fields are the sum of the respective non-total fields.
e.g. numerator === sumOfAllOtherNumerators

This validation can be applied for both Performance Measure and OMS sections.
Default assumption is that this is run for Performance Measure unless specified.
*/
export const validateTotalNDR = (
  performanceMeasureArray: PerformanceMeasure[][],
  errorLocation = "Performance Measure",
  categories?: string[]
): FormError[] => {
  let errorArray: FormError[] = [];

  performanceMeasureArray.forEach((ndrSet, idx) => {
    // If this measure has a totalling NDR, the last NDR set is the total.
    let numeratorSum: any = null;
    let denominatorSum: any = null;
    ndrSet.slice(0, -1).forEach((item: any) => {
      if (
        item !== undefined &&
        item !== null &&
        !item["isTotal"] &&
        item.rate
      ) {
        let x;
        if (!isNaN((x = parseFloat(item["numerator"])))) {
          numeratorSum = numeratorSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item["denominator"])))) {
          denominatorSum = denominatorSum + x; // += syntax does not work if default value is null
        }
      }
    });

    let totalNDR: any = ndrSet[ndrSet.length - 1];
    if (totalNDR?.denominator && totalNDR?.numerator) {
      // If we wanted to get fancy we could offer expected values in here quite easily.

      const parsedNum = parseFloat(totalNDR.numerator ?? "");
      const parsedDen = parseFloat(totalNDR.denominator ?? "");
      if (
        parsedNum !== numeratorSum &&
        numeratorSum !== null &&
        !isNaN(parsedNum)
      ) {
        errorArray.push({
          errorLocation: errorLocation,
          errorMessage: `${
            (categories && categories[idx]) || totalNDR.label
          } numerator field is not equal to the sum of other numerators.`,
        });
      }
      if (
        parsedDen !== denominatorSum &&
        denominatorSum !== null &&
        !isNaN(parsedDen)
      ) {
        errorArray.push({
          errorLocation: errorLocation,
          errorMessage: `${
            (categories && categories[idx]) || totalNDR.label
          } denominator field is not equal to the sum of other denominators.`,
        });
      }
    } else if (numeratorSum && denominatorSum) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${
          (categories &&
            categories[idx] &&
            `${categories[idx]} - ${totalNDR.label}`) ||
          totalNDR.label
        } must contain values if other fields are filled.`,
      });
    }
  });

  return errorArray;
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
  const errorArray: FormError[] = [];

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

// When a user inputs data in multiple NDR sets in a performance measure
// Then the user must complete at least one NDR set in the Deviation of measure specification.
export const validateAtLeastOneNDRInDeviationOfMeasureSpec = (
  performanceMeasureArray: PerformanceMeasure[][],
  ageGroups: string[],
  deviationArray: Types.DeviationFields[] | any,
  didCalculationsDeviate: boolean
) => {
  let errorArray: FormError[] = [];
  let ndrCount = 0;
  if (didCalculationsDeviate) {
    ageGroups.forEach((_ageGroup, i) => {
      performanceMeasureArray?.forEach((_performanceObj, index) => {
        if (
          performanceMeasureArray[index] &&
          performanceMeasureArray[index][i] &&
          performanceMeasureArray[index][i].denominator &&
          performanceMeasureArray[index][i].numerator &&
          performanceMeasureArray[index][i].rate
        ) {
          ndrCount++;
        }
      });
    });

    if (ndrCount > 0) {
      const atLeastOneDevNDR = deviationArray.some((deviationNDR: any) => {
        if (
          deviationNDR?.denominator ||
          deviationNDR?.numerator ||
          deviationNDR?.other
        ) {
          return true;
        }
        return false;
      });

      if (!atLeastOneDevNDR) {
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

export const validateRequiredRadioButtonForCombinedRates = (
  data: Types.CombinedRates
) => {
  const errorArray: FormError[] = [];

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
  const errorArray: FormError[] = [];

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

// Built specifically for CCP-AD and CCP-CH
export const validate3daysLessOrEqualTo30days = (
  data: Types.DefaultFormData,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (
      parseFloat(sevenDays[0]?.rate ?? "") >
      parseFloat(sevenDays[1]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `The rate value of the ${performanceMeasureData.qualifiers?.[0]} must be less than or equal to the ${performanceMeasureData.qualifiers?.[1]} within ${performanceMeasureData.categories?.[1]}.`,
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (
      parseFloat(thirtyDays[0]?.rate ?? "") >
      parseFloat(thirtyDays[1]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `The rate value of the ${performanceMeasureData.qualifiers?.[0]} must be less than or equal to the ${performanceMeasureData.qualifiers?.[1]} within ${performanceMeasureData.categories?.[0]}.`,
      });
    }
  }

  return errorArray;
};
