import * as PMD from "./data";
import * as GV from "measures/globalValidations";
import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import * as DC from "dataConstants";

const validateLarcRateGreater = (data: FormData) => {
  const errorArray: FormError[] = [];
  const memeRates = data.PerformanceMeasure?.rates?.singleCategory?.[0];
  const larcRates = data.PerformanceMeasure?.rates?.singleCategory?.[1];

  if (memeRates && larcRates && memeRates.rate && larcRates.rate) {
    if (parseFloat(larcRates.rate) > parseFloat(memeRates.rate)) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate",
      });
    }
  }

  return errorArray;
};

const CCWCHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data[DC.DATE_RANGE];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );

  errorArray = [
    ...validateLarcRateGreater(data),
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateDenominatorGreaterThanNumerator,
        GV.validateRateZero,
        GV.validateRateNotZero,
        GV.validateAllDenomsAreTheSameCrossQualifier,
        GV.validateOneQualifierRateLessThanTheOther,
      ],
    }),
    ...GV.validateAllDenomsTheSameCrossQualifier(
      data,
      PMD.categories,
      PMD.qualifiers
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
  ];

  return errorArray;
};

export const validationFunctions = [CCWCHValidation];
