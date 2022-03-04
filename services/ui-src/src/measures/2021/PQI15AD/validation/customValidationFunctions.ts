import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";
import { PMD } from "../questions/data";
const PQI15Validation = (data: any) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const ageGroups = ["18 to 39"];
  const whyNotReporting = data["WhyAreYouNotReporting"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];

  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, ageGroups),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
