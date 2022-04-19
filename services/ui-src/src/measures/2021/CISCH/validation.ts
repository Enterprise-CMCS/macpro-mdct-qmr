import * as PMD from "./data";
import * as DC from "dataConstants";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateAllDenomsTheSameCrossQualifier,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  getPerfMeasureRateArray,
  getDeviationNDRArray,
  omsLocationDictionary,
} from "../../globalValidations";
import { FormData } from "./types";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateRateNotZero,
  validateRateZero,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const CISCHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const includesHybridDataSource =
    data["DataSource"]?.includes(
      DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
    )

  errorArray = [
    ...errorArray,
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateRateNotZero,
        ...(includesHybridDataSource ? [] : [validateRateZero]),
      ],
    }),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateAllDenomsTheSameCrossQualifier(
      data,
      PMD.categories,
      PMD.qualifiers
    ),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      includesHybridDataSource
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...ensureBothDatesCompletedInRange(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [CISCHValidation];
