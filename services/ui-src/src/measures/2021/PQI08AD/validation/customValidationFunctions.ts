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
import { PerformanceMeasure as PM } from "../../globalValidations/types";
import {
  getPerfMeasureRateArray,
  getDeviationNDRArray,
} from "measures/2021/globalValidations";

const PQI01Validation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const dateRange = data["DateRange"];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const performanceMeasureArrayToCheck: PM[][] = [];
  performanceMeasureArray?.forEach((item) => {
    item.forEach((ndr) => {
      if (ndr) {
        performanceMeasureArrayToCheck.push([ndr]);
      }
    });
  });

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );
  const validateDualPopInformationArray = [
    performanceMeasureArrayToCheck?.filter(
      (pmArray) => pmArray[0]?.label === "Age 65 and older"
    )[0],
  ];

  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArrayToCheck, OPM, [
      "age-group",
    ]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArrayToCheck,
      OPM,
      ["age-group"]
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArrayToCheck, OPM, [
      "age-group",
    ]),
    ...validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArrayToCheck,
      ["age-groups"],
      deviationArray
    ),
  ];

  return errorArray;
};

export const validationFunctions = [PQI01Validation];
