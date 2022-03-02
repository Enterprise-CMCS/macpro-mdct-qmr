import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import { PMD } from "../questions/data";

const MSCADValidation = (data: Measure.Form) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

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
    ...ensureBothDatesCompletedInRange(dateRange),
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
