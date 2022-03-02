import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";
import {
  getPerfMeasureRateArray,
  getDeviationNDRArray,
} from "measures/2021/globalValidations";
import { PMD } from "../questions/data";
import { PerformanceMeasure as PM } from "../../globalValidations/types";

const PQI01Validation = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

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
      "age-groups",
    ]),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArrayToCheck,
      OPM,
      ["age-groups"]
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArrayToCheck, OPM, [
      "age-groups",
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
