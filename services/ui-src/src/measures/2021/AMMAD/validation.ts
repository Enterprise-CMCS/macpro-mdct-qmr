import * as PMD from "./data";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "../../globalValidations";
import { FormData } from "./types";

const validateContinuationGreaterThanAccute = (data: any) => {
  if (
    !(
      data["PerformanceMeasure"]["rates"]["EffectiveAcutePhaseTreatment"] ||
      data["PerformanceMeasure"]["rates"]["EffectiveContinuationPhaseTreatment"]
    )
  ) {
    return [];
  }
  const accute =
    data["PerformanceMeasure"]["rates"]["EffectiveAcutePhaseTreatment"];
  const continuation =
    data["PerformanceMeasure"]["rates"]["EffectiveContinuationPhaseTreatment"];
  let error;
  const errorArray: any[] = [];

  if (accute && continuation) {
    accute.forEach((_accuteObj: any, index: number) => {
      if (
        accute[index] &&
        continuation[index] &&
        parseFloat(continuation[index]?.rate) > parseFloat(accute[index]?.rate)
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage:
            "Rate value for Effective Continuation Phase Treatment must be less than or equal to the Rate value for Effective Acute Phase Treatment",
        };

        errorArray.push(error);
      }
    });
  }
  return error ? [errorArray[0]] : [];
};

const AMMADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data["DateRange"];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let unfilteredSameDenominatorErrors: any[] = [];
  for (let i = 0; i < performanceMeasureArray.length; i += 2) {
    unfilteredSameDenominatorErrors = [
      ...unfilteredSameDenominatorErrors,
      ...validateEqualDenominators(
        [performanceMeasureArray[i], performanceMeasureArray[i + 1]],
        ageGroups
      ),
    ];
  }

  let filteredSameDenominatorErrors: any = [];
  let errorList: string[] = [];
  unfilteredSameDenominatorErrors.forEach((error) => {
    if (!(errorList.indexOf(error.errorMessage) > -1)) {
      errorList.push(error.errorMessage);
      filteredSameDenominatorErrors.push(error);
    }
  });

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...filteredSameDenominatorErrors,
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateContinuationGreaterThanAccute(data),
  ];

  return errorArray;
};

export const validationFunctions = [AMMADValidation];
