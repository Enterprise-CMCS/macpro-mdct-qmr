import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";
const PQI01Validation = (data: any) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

  const performanceMeasureArray = data["PerformanceMeasure-AgeRates"];
  let errorArray: any[] = [];
  const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
    (pma: PerformanceMeasure[]) => [pma]
  );
  const validateDualPopInformationArray = [performanceMeasureArrayToCheck?.[1]];
  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray =
    data["DeviationFields"]?.filter((data: any) => data) || [];

  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArrayToCheck, OPM, [
      "age-groups",
    ]),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArrayToCheck,
      OPM,
      ["age-groups"]
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArrayToCheck, OPM, [
      "age-groups",
    ]),
    ...validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArrayToCheck,
      ["age-groups"],
      deviationArray
    ),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
