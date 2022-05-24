import * as DC from "dataConstants";
import * as GV from "measures/2022/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { cleanString } from "utils/cleanString";
import { OMSData } from "measures/2022/CommonQuestions/OptionalMeasureStrat/data";

const CCWADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data[DC.DATE_RANGE];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  const memeRates =
    data.PerformanceMeasure?.rates?.[cleanString(PMD.categories[0])] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[cleanString(PMD.categories[1])] ?? [];

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
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
    ...GV.validateOneCatRateHigherThanOtherCatPM(data, PMD),
    ...GV.validateEqualCategoryDenominatorsPM(data, PMD.categories),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      [memeRates, larcRates],
      [""],
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
        GV.validateNumeratorLessThanDenominatorOMS,
        GV.validateEqualCategoryDenominatorsOMS,
        GV.validateOneCatRateHigherThanOtherCatOMS(),
        GV.validateRateZeroOMS,
        GV.validateRateNotZeroOMS,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [CCWADValidation];
