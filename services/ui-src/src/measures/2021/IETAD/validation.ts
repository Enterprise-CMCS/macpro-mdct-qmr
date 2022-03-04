import { FormData } from "./types";
import { omsLocationDictionary } from "measures/globalValidations/dataDrivenTools";
import * as PMD from "./data";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
} from "measures/globalValidations/omsValidationsLib";
import { getPerfMeasureRateArray } from "../../globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const IEDValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data["DateRange"];
  const deviationArray =
    [
      // ...(data["DeviationFields-EngageAlcohol"] || []),
      // ...(data["DeviationFields-EngageOpioid"] || []),
      // ...(data["DeviationFields-EngageOther"] || []),
      // ...(data["DeviationFields-EngageTotal"] || []),
      // ...(data["DeviationFields-InitOther"] || []),
      // ...(data["DeviationFields-InitTotal"] || []),
      // ...(data["DeviationFields-InitAlcohol"] || []),
      // ...(data["DeviationFields-InitOpioid"] || []),
    ].filter((data: any) => data) || [];

  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  const totalInitiation = performanceMeasureArray.filter(
    (_, idx) =>
      PMD.data.categories?.[idx].includes("Initiation") &&
      PMD.data.categories?.[idx].includes("Total")
  )[0];

  const totalEngagement = performanceMeasureArray.filter(
    (_, idx) =>
      PMD.data.categories?.[idx].includes("Engagement") &&
      PMD.data.categories?.[idx].includes("Total")
  )[0];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let unfilteredSameDenominatorErrors: any[] = [];
  for (let i = 0; i < performanceMeasureArray.length; i += 2) {
    unfilteredSameDenominatorErrors = [
      ...unfilteredSameDenominatorErrors,
      ...validateEqualDenominators(
        [performanceMeasureArray[i], performanceMeasureArray[i + 1]],
        ageGroups
      ),
    ];
  }
  unfilteredSameDenominatorErrors = [
    ...unfilteredSameDenominatorErrors,
    ...validateEqualDenominators([totalInitiation, totalEngagement], ageGroups),
  ];

  let filteredSameDenominatorErrors: any = [];
  let errorList: string[] = [];
  unfilteredSameDenominatorErrors.forEach((error) => {
    if (!(errorList.indexOf(error.errorMessage) > -1)) {
      errorList.push(error.errorMessage);
      filteredSameDenominatorErrors.push(error);
    }
  });

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
    ...filteredSameDenominatorErrors,
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateDenominatorsAreTheSame,
      ],
    }),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray
    ),
  ];

  return errorArray;
};

export const validationFunctions = [IEDValidation];
