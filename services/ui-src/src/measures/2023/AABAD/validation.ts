import * as DC from "dataConstants";
import * as GV from "measures/2023/shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "measures/2023/shared/CommonQuestions/types";

const AABADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const dateRange = data[DC.DATE_RANGE];
  const deviationReason = data[DC.DEVIATION_REASON];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

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
    ...GV.validateDualPopInformationPM(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateHedisYear(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
    ...GV.validateOPMRates(OPM),

    // OMS Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2023),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [GV.validateNumeratorLessThanDenominatorOMS()],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [AABADValidation];
