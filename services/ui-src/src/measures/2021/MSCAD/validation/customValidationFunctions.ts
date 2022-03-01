import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";

const MSCADValidation = (data: Measure.Form) => {
  const ageGroups = ["Ages 18 to 64", "Age 65 and Older"];
  const age65PlusIndex = 1;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-AdvisingUsers"],
    data["PerformanceMeasure-AgeRates-DiscussingMedications"],
    data["PerformanceMeasure-AgeRates-DiscussingStrategies"],
    data["PerformanceMeasure-AgeRates-PercentageUsers"],
  ];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

  let errorArray: any[] = [];
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
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [MSCADValidation];
