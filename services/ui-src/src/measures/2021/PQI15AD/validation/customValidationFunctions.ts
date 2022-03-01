import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";
const PQI15Validation = (data: any) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const whyNotReporting = data["WhyAreYouNotReporting"];


  const performanceMeasureArray = data["PerformanceMeasure-AgeRates"];
  let errorArray: any[] = [];
  const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
    (pma: PerformanceMeasure[]) => [pma]
  );
  const validateDualPopInformationArray = [performanceMeasureArrayToCheck?.[1]];

  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
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
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
