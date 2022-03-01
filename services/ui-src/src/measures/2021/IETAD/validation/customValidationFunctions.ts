import { Measure } from "./types";
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

const IEDValidation = (data: Measure.Form) => {
  const ageGroups = ["Ages 18 to 64", "Age 65 and Older"];
  const age65PlusIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const dateRange = data["DateRange"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let unfilteredSameDenominatorErrors = [
    ...validateEqualDenominators(
      [
        data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
        data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
      ],
      ageGroups
    ),
    ...validateEqualDenominators(
      [
        data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
        data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
      ],
      ageGroups
    ),
    ...validateEqualDenominators(
      [
        data["PerformanceMeasure-AgeRates-Initiation-Other"],
        data["PerformanceMeasure-AgeRates-Engagement-Other"],
      ],
      ageGroups
    ),
    ...validateEqualDenominators(
      [
        data["PerformanceMeasure-AgeRates-Initiation-Total"],
        data["PerformanceMeasure-AgeRates-Engagement-Total"],
      ],
      ageGroups
    ),
  ];

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
  ];

  return errorArray;
};

export const validationFunctions = [IEDValidation];
