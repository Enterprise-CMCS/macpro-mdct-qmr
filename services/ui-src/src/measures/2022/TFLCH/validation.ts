import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

const TFLCHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const dateRange = data[DC.DATE_RANGE];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );
  let errorArray: any[] = [];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    // Dental Services rate cannot be larger than the Dental or Oral Health Services rate
    ...GV.validateOneCatRateHigherThanOtherCatPM(
      data,
      PMD.data.performanceMeasure
    ),
    // Oral Health Services rate cannot be larger than the Dental or Oral Health Services rate
    ...GV.validateOneCatRateHigherThanOtherCatPM(
      data,
      PMD.data.performanceMeasure,
      0,
      2
    ),
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, ageGroups, data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateTotalNDR(performanceMeasureArray),
    ...GV.validateEqualQualifierDenominatorsPM(
      performanceMeasureArray,
      ageGroups
    ),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2022, true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        // Dental Services rate cannot be larger than the Dental or Oral Health Services rate
        GV.validateOneCatRateHigherThanOtherCatOMS(),
        // Oral Health Services rate cannot be larger than the Dental or Oral Health Services rate
        GV.validateOneCatRateHigherThanOtherCatOMS(0, 2),
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateRateZeroOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateOMSTotalNDR(),
        GV.validateEqualQualifierDenominatorsOMS(),
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [TFLCHValidation];
