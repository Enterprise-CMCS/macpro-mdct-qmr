import * as DC from "dataConstants";
import * as GV from "measures/2021/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { OMSData } from "measures/2021/CommonQuestions/OptionalMeasureStrat/data";

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
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateNoNonZeroNumOrDenomPM(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.validateOneQualRateHigherThanOtherQualPM(data, PMD),
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
        GV.validateNumeratorLessThanDenominatorOMS,
        GV.validateRateZeroOMS,
        GV.validateRateNotZeroOMS,
        GV.validateEqualCategoryDenominatorsOMS,
        GV.validateOneQualRateHigherThanOtherQualOMS(),
      ],
    }),
    ...GV.validateEqualCategoryDenominatorsPM(
      data,
      PMD.categories,
      PMD.qualifiers
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
  ];

  return errorArray;
};

export const validationFunctions = [CCWCHValidation];
