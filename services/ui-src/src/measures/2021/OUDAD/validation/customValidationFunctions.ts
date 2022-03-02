import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";
import {
  getPerfMeasureRateArray,
  getDeviationNDRArray,
} from "measures/2021/globalValidations";
import { PMD } from "../questions/data";

const OUDValidation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  let errorArray: any[] = [];

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    false
  );
  const performanceMeasureArrayToCheck: any = [];
  performanceMeasureArray?.forEach((item) => {
    item.forEach((ndr) => {
      if (ndr) {
        performanceMeasureArrayToCheck.push([ndr]);
      }
    });
  });

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
    ...validateEqualDenominators(performanceMeasureArray, ["age-group"]),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ["age-group"]),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
