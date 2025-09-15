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
    case GV.validateOMSTotalNDR():
      return GV.validateOMSTotalNDR();
    case GV.validateEqualQualifierDenominatorsOMS:
      return GV.validateEqualQualifierDenominatorsOMS();
    default:
      throw new Error(
        `Validation function ${func.name} not recognized! See validationTemplate.tsx`
      );
  }
};

const validateTotalNDRErrorMessage = (qualifier: string, fieldType: string) => {
  return `${fieldType} for the ${qualifier} Total rate is not equal to the sum of the ${qualifier} age-specific ${fieldType.toLowerCase()}s.`;
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

  const locationDictionary = GV.omsLocationDictionary(
    OMSData(2021, true),
    qualifiers,
    categories
  );

  const validateDualPopInformationArray = [
    performanceMeasureArray?.[0].filter((pm) => {
      return pm?.label === "Age 65 and older";
    }),
  ];

  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];

  const validationList = (func: ValidationFunction) => {
    switch (func) {
      case GV.validateReasonForNotReporting: //good
        return GV.validateReasonForNotReporting(whyNotReporting);
      case GV.validateRequiredRadioButtonForCombinedRates: //good
        return GV.validateRequiredRadioButtonForCombinedRates(data);
      case GV.validateBothDatesCompleted: //good
        return GV.validateBothDatesCompleted(dateRange);
      case GV.validateYearFormat: //good
        return GV.validateYearFormat(dateRange);
      case GV.validateAtLeastOneDeviationFieldFilled: //good
        return GV.validateAtLeastOneDeviationFieldFilled(
          PMD.override?.deviationFieldFilled?.(data) ?? performanceMeasureArray,
          qualifiers,
          deviationArray,
          didCalculationsDeviate
        );
      case GV.validateAtLeastOneDataSource: //good
        return GV.validateAtLeastOneDataSource(data);
      case GV.validateAtLeastOneRateComplete: //good
        return GV.validateAtLeastOneRateComplete(
          performanceMeasureArray,
          OPM,
          qualifiers,
          categories
        );
      case GV.validateRateZeroPM: //good
        return GV.validateRateZeroPM(
          performanceMeasureArray,
          OPM,
          qualifiers,
          data
        );
      case GV.validateRateNotZeroPM: //good
        return GV.validateRateNotZeroPM(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.validateNumeratorsLessThanDenominatorsPM: //good
        return GV.validateNumeratorsLessThanDenominatorsPM(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.validateOneQualDenomHigherThanOtherDenomPM: //good
        return GV.validateOneQualDenomHigherThanOtherDenomPM(data, {
          categories,
          qualifiers,
        });
      case GV.validateTotalNDR:
        return GV.validateTotalNDR(
          performanceMeasureArray,
          undefined,
          PMD.override?.validateTotalNDR?.category ? categories : undefined,
          PMD.override?.validateTotalNDR?.errorMessage
            ? validateTotalNDRErrorMessage
            : undefined
        );
      case GV.validateEqualQualifierDenominatorsPM:
        //AMM-AD, FUH-AD, FUH-CH, IET-AD, IET-HH, SFM-CH, W30-CH
        if (PMD.override?.validateEqualQualifierDenominatorsPM?.category) {
          let unfilteredSameDenominatorErrors: any[] = [];
          let filteredSameDenominatorErrors: any = [];
          let errorList: string[] = [];

          for (let i = 0; i < performanceMeasureArray.length; i += 2) {
            //errorMsg used for IET-AD & IET-HH
            const errorMsg = (qual: string) =>
              `Denominators must be the same for ${locationDictionary([
                qual,
              ])} for ${categories[i].label} and ${categories[i + 1].label}.`;

            unfilteredSameDenominatorErrors = [
              ...unfilteredSameDenominatorErrors,
              ...GV.validateEqualQualifierDenominatorsPM(
                [performanceMeasureArray[i], performanceMeasureArray[i + 1]],
                qualifiers,
                undefined,
                PMD.override?.validateEqualQualifierDenominatorsPM?.errorMessage
                  ? errorMsg
                  : undefined
              ),
            ];
          }
          unfilteredSameDenominatorErrors.forEach((error) => {
            if (!(errorList.indexOf(error.errorMessage) > -1)) {
              errorList.push(error.errorMessage);
              filteredSameDenominatorErrors.push(error);
            }
          });

          return filteredSameDenominatorErrors;
        }

        //APM-CH & WCC-CH
        const validateEqualQualifierDenominatorsErrorMessage = (
          qualifier: string
        ) => {
          const isTotal = qualifier.split(" ")[0] === "Total";
          return `${
            isTotal ? "" : "The "
          }${qualifier} denominator must be the same for each indicator.`;
        };

        //APM-CH, FUA-AD, FUA-HH, FUH-HH, FUM-AD & WCC-CH
        return GV.validateEqualQualifierDenominatorsPM(
          performanceMeasureArray,
          qualifiers,
          undefined,
          PMD.override?.validateEqualQualifierDenominatorsPM?.errorMessage
            ? validateEqualQualifierDenominatorsErrorMessage
            : undefined
        );
      case GV.validateOneCatRateHigherThanOtherCatPM:
        return GV.validateOneCatRateHigherThanOtherCatPM(
          data,
          PMD.performanceMeasure,
          0,
          1,
          PMD.override?.validateOneCatRateHigherThanOtherCatPM?.increment ??
            undefined
        );
      case GV.validateDualPopInformationPM:
        return GV.validateDualPopInformationPM(
          PMD.override?.validateDualPopInformationPM?.dualPopInfoArray
            ? validateDualPopInformationArray
            : performanceMeasureArray,
          OPM,
          PMD.override?.validateDualPopInformationPM?.ageIndex ?? 0,
          DefinitionOfDenominator,
          PMD.override?.validateDualPopInformationPM?.errorLabel
        );
      case GV.validateEqualCategoryDenominatorsPM:
        return GV.validateEqualCategoryDenominatorsPM(
          data,
          categories,
          PMD.override?.validateEqualCategoryDenominatorsPM?.qualifiers
        );
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
