import * as Types from "measures/CommonQuestions/types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
} from "measures/globalValidations/validationsLib";
import {
  getPerfMeasureRateArray,
  omsLocationDictionary,
} from "measures/globalValidations";
import * as PMD from "./data";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const MSCADValidation = (data: Types.DefaultFormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray = [
    // ...(data["DeviationFields-DiscussingCessationMedications"] || []),
    // ...(data["DeviationFields-AdvisingUsersToQuit"] || []),
    // ...(data["DeviationFields-DiscussingCessationStrategies"] || []),
    // ...(data["DeviationFields-PercentageOfUsers"] || []),
  ].filter((data) => data);

  let errorArray: any[] = [];
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
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

export const validationFunctions = [MSCADValidation];
