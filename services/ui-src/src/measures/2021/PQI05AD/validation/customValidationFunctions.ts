import {
  getPerfMeasureRateArray,
  getDeviationNDRArray,
} from "measures/2021/globalValidations";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";
import { PMD } from "../questions/data";
import { Measure } from "./types";

const PQI01Validation = (data: Measure.Form) => {
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
      return pm?.label === "Age 65 and older";
    }),
  ];

  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
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
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
