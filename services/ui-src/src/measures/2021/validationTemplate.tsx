import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";
import {
  MeasureTemplateData,
  ValidationFunction,
} from "shared/types/MeasureTemplate";

const omsValidations = (func: ValidationFunction) => {
  switch (func) {
    case GV.validateNumeratorLessThanDenominatorOMS:
      return GV.validateNumeratorLessThanDenominatorOMS();
    case GV.validateRateZeroOMS:
      return GV.validateRateZeroOMS();
    case GV.validateRateNotZeroOMS:
      return GV.validateRateNotZeroOMS();
    case GV.validateOneQualDenomHigherThanOtherDenomOMS:
      return GV.validateOneQualDenomHigherThanOtherDenomOMS();
    default:
      throw new Error(
        `Validation function ${func.name} not recognized! See validationTemplate.tsx`
      );
  }
};

export const validationTemplate = (
  data: FormData,
  PMD: MeasureTemplateData
) => {
  const categories = PMD.performanceMeasure.categories!;
  const qualifiers = PMD.performanceMeasure.qualifiers!;

  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.performanceMeasure
  );
  const validations = PMD.validations;

  //if user selects no on "are you reporting on this measure?"
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  if (data[DC.DID_REPORT] === DC.NO) {
    return [...GV.validateReasonForNotReporting(whyNotReporting)];
  }

  const dateRange = data[DC.DATE_RANGE];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const OPM = data[DC.OPM_RATES];

  const validationList = (func: ValidationFunction) => {
    switch (func) {
      case GV.validateReasonForNotReporting:
        return GV.validateReasonForNotReporting(whyNotReporting);
      case GV.validateRequiredRadioButtonForCombinedRates:
        return GV.validateRequiredRadioButtonForCombinedRates(data);
      case GV.validateBothDatesCompleted:
        return GV.validateBothDatesCompleted(dateRange);
      case GV.validateYearFormat:
        return GV.validateYearFormat(dateRange);
      case GV.validateAtLeastOneDeviationFieldFilled:
        return GV.validateAtLeastOneDeviationFieldFilled(
          performanceMeasureArray,
          qualifiers,
          deviationArray,
          didCalculationsDeviate
        );
      case GV.validateAtLeastOneDataSource:
        return GV.validateAtLeastOneDataSource(data);
      case GV.validateAtLeastOneRateComplete:
        return GV.validateAtLeastOneRateComplete(
          performanceMeasureArray,
          OPM,
          qualifiers,
          categories
        );
      case GV.validateRateZeroPM:
        return GV.validateRateZeroPM(
          performanceMeasureArray,
          OPM,
          qualifiers,
          data
        );
      case GV.validateRateNotZeroPM:
        return GV.validateRateNotZeroPM(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.validateNumeratorsLessThanDenominatorsPM:
        return GV.validateNumeratorsLessThanDenominatorsPM(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.validateOneQualDenomHigherThanOtherDenomPM:
        return GV.validateOneQualDenomHigherThanOtherDenomPM(data, {
          categories,
          qualifiers,
        });
      default:
        throw new Error(
          `Validation function ${func.name} not recognized! See validationTemplate.tsx`
        );
    }
  };

  let errorArray: any[] = [];

  //run validation without oms validation functions as the returns are different
  for (const validation of validations!.filter(
    (validation) => !validation.name.includes("OMS")
  )) {
    errorArray.push(...validationList(validation));
  }

  //oms validation functions are called a little differently so we need to filter them out
  const omsCallbacks = validations!
    .filter((validation) => validation.name.includes("OMS"))
    .map((validation) => omsValidations(validation));

  errorArray.push(
    ...GV.omsValidations({
      data,
      qualifiers: qualifiers,
      categories: categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2021, true),
        qualifiers,
        categories
      ),
      validationCallbacks: [...omsCallbacks],
    })
  );

  return errorArray;
};

export const validationFunctions = [validationTemplate];
