import * as PMD from "./data";
import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import { FormData } from "./types";

const HPCADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray =
    GV.getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data[DC.DATE_RANGE];
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
  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];

  errorArray = [
    ...errorArray,
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      dataSource: data[DC.DATA_SOURCE],
      locationDictionary: GV.omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateDenominatorGreaterThanNumerator,
        GV.validateRateNotZero,
        GV.validateRateZero,
      ],
    }),
    ...GV.validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator,
      "Ages 65 to 75"
    ),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateOneDataSource(data),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [HPCADValidation];
