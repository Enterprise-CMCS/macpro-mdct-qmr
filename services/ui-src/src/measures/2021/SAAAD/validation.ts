import { FormData } from "./types";
import * as DC from "dataConstants";
import * as PMD from "./data";
import * as GV from "measures/globalValidations";

import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const SAAADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data[DC.DATE_RANGE];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
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
      ],
    }),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateOneDataSource(data),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
  ];

  return errorArray;
};

export const validationFunctions = [SAAADValidation];
