import { FormData } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateRequiredRadioButtonForCombinedRates,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "measures/globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as PMD from "./data";

const PQI01Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  // const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
  //   (pma: PerformanceMeasure[]) => [pma]
  // );
  // const validateDualPopInformationArray = [performanceMeasureArray?.[1]];
  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray: any = [];
  // data["DeviationFields"]?.filter((data: any) => data) ||
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
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ["age-groups"],
      deviationArray
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
