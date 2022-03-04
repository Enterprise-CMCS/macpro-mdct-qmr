import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
} from "measures/globalValidations/validationsLib";
import * as PMD from "./data";
import { FormData } from "./types";

const PQI15Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  const validateDualPopInformationArray = [performanceMeasureArray?.[1]];

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ["age-groups"]),

    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, [
      "age-groups",
    ]),
    ...validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
  ];

  return errorArray;
};

export const validationFunctions = [PQI15Validation];
