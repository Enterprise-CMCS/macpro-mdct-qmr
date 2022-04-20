import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import {
  omsValidations,
  validateRateNotZero,
  validateRateZero,
} from "measures/globalValidations/omsValidationsLib";
import {
  getPerfMeasureRateArray,
  atLeastOneRateComplete,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  getDeviationNDRArray,
  validateOneDataSource,
} from "../../globalValidations";
import { FormData } from "./types";
import * as DC from "dataConstants";
import * as PMD from "./data";
import { omsLocationDictionary } from "measures/globalValidations";
const PQI15Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];

  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;
  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];

  if (data.DidReport === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateOneDataSource(data),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [validateRateZero, validateRateNotZero],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
