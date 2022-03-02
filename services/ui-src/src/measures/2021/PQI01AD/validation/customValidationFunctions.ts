import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import { PMD } from "../questions/data";
const PQI01Validation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const dateRange = data["DateRange"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const validateDualPopInformationArray = [performanceMeasureArray?.[1]];

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-groups"]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-groups",
    ]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, [
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

export const validationFunctions = [PQI01Validation];
