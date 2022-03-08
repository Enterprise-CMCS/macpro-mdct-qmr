import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
} from "measures/globalValidations/omsValidationsLib";
import {
  getPerfMeasureRateArray,
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations";
import { FormData } from "./types";
import * as PMD from "./data";
import { omsLocationDictionary } from "measures/globalValidations";
const PQI15Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];

  if (data.DidReport === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [validateDenominatorGreaterThanNumerator],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
