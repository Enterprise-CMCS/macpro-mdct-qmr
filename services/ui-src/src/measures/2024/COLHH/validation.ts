import * as DC from "dataConstants";
import * as GV from "measures/2024/shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "measures/2024/shared/CommonQuestions/types";

const COLHHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 2;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data[DC.DATE_RANGE];
  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];
  const errorReplacementText = "Ages 66 to 75";
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationReason = data[DC.DEVIATION_REASON];

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
    ...GV.validateDualPopInformationPM(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator,
      errorReplacementText
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, ageGroups, data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
    ...GV.validateHedisYear(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.validateOPMRates(OPM),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      dataSource: data[DC.DATA_SOURCE],
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2024),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateRateZeroOMS(),
        GV.validateEqualQualifierDenominatorsOMS(),
      ],
    }),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
  ];

  return errorArray;
};

export const validationFunctions = [COLHHValidation];
