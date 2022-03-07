import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
} from "measures/globalValidations/validationsLib";
import {
  getPerfMeasureRateArray,
  omsLocationDictionary,
} from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const OUDValidation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  let errorArray: any[] = [];

  const performanceMeasureArrayToCheck = performanceMeasureArray;
  // ?.map(
  //   (item) => {
  //     return [item];
  //   }
  // );

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray: any = [];
  // data["DeviationFields"]?.filter((data) => data) ||
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-group"]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-group",
    ]),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArrayToCheck,
      ["age-group"],
      deviationArray
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...validateEqualDenominators(performanceMeasureArray, ["age-group"]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ["age-group"]),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateDenominatorsAreTheSame,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
