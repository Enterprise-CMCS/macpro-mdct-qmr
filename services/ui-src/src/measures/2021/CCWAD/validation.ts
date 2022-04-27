import * as PMD from "./data";
import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";

import { FormData } from "./types";
import { cleanString } from "utils/cleanString";
import {
  getPerfMeasureRateArray,
  omsLocationDictionary,
} from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const CCWADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  const memeRates =
    data.PerformanceMeasure?.rates?.[cleanString(PMD.categories[0])] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[cleanString(PMD.categories[1])] ?? [];

  let errorArray: any[] = [];
  if (data["DidReport"] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups
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
    ...GV.validateBothDatesInRange(dateRange),
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
      locationDictionary: omsLocationDictionary(
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
