import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
const PQI01Validation = (data: any) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const dateRange = data["DateRange"];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const performanceMeasureArray = data["PerformanceMeasure-AgeRates"];
  const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
    (pma: PerformanceMeasure[]) => [pma]
  );
  const validateDualPopInformationArray = [performanceMeasureArrayToCheck?.[1]];

  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArrayToCheck, OPM, [
      "age-group",
    ]),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArrayToCheck,
      OPM,
      ["age-group"]
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArrayToCheck, OPM, [
      "age-group",
    ]),
    ...validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
