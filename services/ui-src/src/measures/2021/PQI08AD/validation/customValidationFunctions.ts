import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
} from "measures/globalValidations/validationsLib";
import { PMD } from "../questions/data";
import { Measure } from "./types";

const PQI01Validation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const dateRange = data["DateRange"];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  const validateDualPopInformationArray = [performanceMeasureArray?.[1]];

  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-group"]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(performanceMeasureArray, OPM, [
      "age-group",
    ]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ["age-group"]),
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
