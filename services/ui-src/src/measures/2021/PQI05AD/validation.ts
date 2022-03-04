import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateRequiredRadioButtonForCombinedRates,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "measures/globalValidations/validationsLib";
import * as PMD from "./data";
import { FormData } from "./types";

const PQI01Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const dateRange = data["DateRange"];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  // const performanceMeasureArrayToCheck = performanceMeasureArray?.map(
  //   (pma: PerformanceMeasure[]) => [pma]
  // );
  // const validateDualPopInformationArray = [performanceMeasureArrayToCheck?.[1]];
  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray: any = [];
  //  data["DeviationFields"]?.filter((data: any) => data) ||
  const validateDualPopInformationArray = [performanceMeasureArray?.[1]];
  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-group"]),
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
