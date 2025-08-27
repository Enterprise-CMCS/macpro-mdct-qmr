import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

const AMMADValidation = (data: FormData, coreSetId?: string) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const deviationReason = data[DC.DEVIATION_REASON];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );
  const dateRange = data[DC.DATE_RANGE];
  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];

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
        ageGroups
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

  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  errorArray = [
    ...errorArray,
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
    ...GV.validateDualPopInformationPM(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator,
      undefined,
      coreSetId
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...filteredSameDenominatorErrors,
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, ageGroups, data),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateOPMRates(OPM),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.validateDeviationTextFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
    ...GV.validateOneCatRateHigherThanOtherCatPM(data, PMD),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2025),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateOneCatRateHigherThanOtherCatOMS(),
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateRateZeroOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateSameDenominatorSets(),
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [AMMADValidation];
