import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

const AISADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray =
    GV.getPerfMeasureRateArray(data, PMD.data.performanceMeasure) ?? [];
  const dateRange = data[DC.DATE_RANGE];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationReason = data[DC.DEVIATION_REASON];

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  //Influenza & Td/Tdap, age group Age 19 to 65
  const categoryGroup1 = ["VZ0nYO", "2Bh7J8"];
  const ageGroup1 = ["xz7TUf", "VooeEU"];

  //Zoster & Pneumococcal, age group Age 66 and older
  const categoryGroup2 = ["HCnSrs", "B4SxBy"];
  const ageGroup2 = ["VooeEU"];

  errorArray = [
    ...errorArray,
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2025),
        PMD.qualifiers,
        PMD.categories
      ),
      dataSource: data[DC.DATA_SOURCE],
      validationCallbacks: [
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateRateZeroOMS(),
        GV.validateEqualQualifierOfCategoryDenominatorsOMS(
          PMD.categories.filter((cat) => categoryGroup1.includes(cat.id)),
          ageGroups.filter((age) => ageGroup1.includes(age.id))
        ),
        GV.validateEqualQualifierOfCategoryDenominatorsOMS(
          PMD.categories.filter((cat) => categoryGroup2.includes(cat.id)),
          ageGroups.filter((age) => ageGroup2.includes(age.id))
        ),
      ],
    }),
    ...GV.validateDeviationTextFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
    ...GV.validateHybridMeasurePopulation(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateEqualQualifierOfCategoryDenominatorsPM(
      data,
      PMD.categories.filter((cat) => categoryGroup1.includes(cat.id)),
      ageGroups.filter((age) => ageGroup1.includes(age.id))
    ),
    ...GV.validateEqualQualifierOfCategoryDenominatorsPM(
      data,
      PMD.categories.filter((cat) => categoryGroup2.includes(cat.id)),
      ageGroups.filter((age) => ageGroup2.includes(age.id))
    ),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, ageGroups, data),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateOPMRates(OPM),
  ];

  return errorArray;
};

export const validationFunctions = [AISADValidation];
