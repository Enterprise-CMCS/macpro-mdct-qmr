import * as PMD from "./data";
import * as GV from "measures/globalValidations";
import * as DC from "dataConstants";
import { getPerfMeasureRateArray } from "../../globalValidations";
import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const validateInitiationDenomGreater = (data: FormData) => {
  const errorArray: FormError[] = [];
  const InitiationRates = data.PerformanceMeasure?.rates?.singleCategory?.[0];
  const cmRates = data.PerformanceMeasure?.rates?.singleCategory?.[1];

  if (
    InitiationRates &&
    cmRates &&
    InitiationRates.denominator &&
    cmRates.denominator
  ) {
    if (
      parseFloat(cmRates.denominator) > parseFloat(InitiationRates.denominator)
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "Continuation and Maintenance (C&M) Phase denominator must be less than or equal to Initiation Phase denominator",
      });
    }
  }

  return errorArray;
};

const ADDCHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const dateRange = data[DC.DATE_RANGE];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  errorArray = [
    ...errorArray,
    ...validateInitiationDenomGreater(data),
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateOneDataSource(data),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
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
        GV.validateOneQualifierDenomLessThanTheOther,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [ADDCHValidation];
