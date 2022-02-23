import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
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

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray = [
    ...(data["DeviationFields-DiscussingCessationMedications"] || []),
    ...(data["DeviationFields-AdvisingUsersToQuit"] || []),
    ...(data["DeviationFields-DiscussingCessationStrategies"] || []),
    ...(data["DeviationFields-PercentageOfUsers"] || []),
  ].filter((data) => data);

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
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray
    ),
  ];

  return errorArray;
};

export const validationFunctions = [MSCADValidation];
