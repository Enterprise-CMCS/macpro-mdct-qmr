import * as DC from "dataConstants";
import * as GV from "measures/2021/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "measures/2021/CommonQuestions/types";

const WCCHValidation = (data: FormData) => {
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const dateRange = data[DC.DATE_RANGE];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);

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

  const validateEqualQualifierDenominatorsErrorMessage = (
    qualifier: string
  ) => {
    const isTotal = qualifier.split(" ")[0] === "Total";
    return `${
      isTotal ? "" : "The "
    }${qualifier} denominator must be the same for each indicator.`;
  };

  const validateTotalNDRErrorMessage = (
    qualifier: string,
    fieldType: string
  ) => {
    return `${fieldType} for the ${qualifier} Total rate is not equal to the sum of the ${qualifier} age-specific ${fieldType.toLowerCase()}s.`;
  };

  errorArray = [
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      PMD.categories
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, PMD.qualifiers),
    ...GV.validateRateZeroPM(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      data
    ),
    ...GV.validateEqualQualifierDenominatorsPM(
      performanceMeasureArray,
      PMD.qualifiers,
      undefined,
      validateEqualQualifierDenominatorsErrorMessage
    ),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateTotalNDR(
      performanceMeasureArray,
      undefined,
      PMD.categories,
      validateTotalNDRErrorMessage
    ),

    // OMS Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      dataSource: data[DC.DATA_SOURCE],
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2021, true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateEqualQualifierDenominatorsOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateOMSTotalNDR(),
        GV.validateRateZeroOMS(),
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [WCCHValidation];
