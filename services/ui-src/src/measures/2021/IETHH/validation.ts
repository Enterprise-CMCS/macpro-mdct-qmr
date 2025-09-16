import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

const IETHHValidation = (data: FormData) => {
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );
  const dateRange = data[DC.DATE_RANGE];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];

  const locationDictionary = GV.omsLocationDictionary(
    OMSData(2021, true),
    PMD.qualifiers,
    PMD.categories
  );

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let unfilteredSameDenominatorErrors: any[] = [];
  for (let i = 0; i < performanceMeasureArray.length; i += 2) {
    unfilteredSameDenominatorErrors = [
      ...unfilteredSameDenominatorErrors,
      ...GV.validateEqualQualifierDenominatorsPM(
        [performanceMeasureArray[i], performanceMeasureArray[i + 1]],
        PMD.qualifiers,
        undefined,
        (qual) =>
          `Denominators must be the same for ${locationDictionary([
            qual,
          ])} for ${PMD.categories[i].label} and ${
            PMD.categories[i + 1].label
          }.`
      ),
    ];
  }

  let filteredSameDenominatorErrors: any = [];
  let errorList: string[] = [];
  unfilteredSameDenominatorErrors.forEach((error) => {
    if (!(errorList.indexOf(error.errorMessage) > -1)) {
      errorList.push(error.errorMessage);
      filteredSameDenominatorErrors.push(error);
    }
  });

  errorArray = [
    ...errorArray,
    ...GV.validateOneCatRateHigherThanOtherCatPM(
      data,
      PMD.data.performanceMeasure,
      0,
      1,
      2
    ),
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...GV.validateTotalNDR(performanceMeasureArray, undefined, undefined),
    ...GV.validateDualPopInformationPM(
      performanceMeasureArray,
      OPM,
      2,
      DefinitionOfDenominator
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...filteredSameDenominatorErrors,
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, PMD.qualifiers),
    ...GV.validateRateZeroPM(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      data
    ),

    // OMS Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary,
      validationCallbacks: [
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateRateZeroOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateOMSTotalNDR(),
        GV.validateSameDenominatorSetsOMS(),
        GV.validateOneCatRateHigherThanOtherCatOMS(0, 1, 2),
      ],
    }),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
  ];

  return errorArray;
};

export const validationFunctions = [IETHHValidation];
