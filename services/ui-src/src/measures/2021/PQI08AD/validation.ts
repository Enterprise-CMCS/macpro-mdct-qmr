import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
} from "measures/globalValidations/omsValidationsLib";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
  getDeviationNDRArray,
  getPerfMeasureRateArray,
  omsLocationDictionary,
} from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";

const PQI08Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const dateRange = data["DateRange"];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );
  const validateDualPopInformationArray = [
    performanceMeasureArray?.[0].filter((pm) => {
      return pm?.label === PMD.qualifiers[1];
    }),
  ];

  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
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

export const validationFunctions = [PQI08Validation];
