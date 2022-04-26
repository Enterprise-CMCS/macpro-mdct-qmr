import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { omsLocationDictionary } from "measures/globalValidations/dataDrivenTools";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const AMRADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data[DC.DATE_RANGE];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
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
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateBothDatesInRange(dateRange),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateNoNonZeroNumOrDenomPM(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateTotalNDR(performanceMeasureArray),
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
        GV.validateEqualQualifierDenominatorsOMS,
        GV.validateOMSTotalNDR,
        GV.validateOneCatRateLessThanOtherCatOMS(),
        GV.validateRateNotZeroOMS,
        GV.validateRateZeroOMS,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [AMRADValidation];
