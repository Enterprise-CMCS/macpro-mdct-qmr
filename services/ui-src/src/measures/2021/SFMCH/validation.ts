import * as PMD from "./data";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateReasonForNotReporting,
  omsLocationDictionary,
} from "../../globalValidations";
import { getPerfMeasureRateArray } from "../../globalValidations";
import { FormData } from "./types";
import {
  OmsValidationCallback,
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateOneRateLessThanOther,
  validateRateNotZero,
  validateRateZero,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const cleanString = (s: string) => s.replace(/[^\w]/g, "");
const validateOneSealantGreaterThanFourMolarsSealed = (data: FormData) => {
  if (
    !(
      data?.PerformanceMeasure?.rates?.Rate1AtLeastOneSealant ||
      data?.PerformanceMeasure?.rates?.Rate2AllFourMolarsSealed
    )
  ) {
    console.log(data["PerformanceMeasure"]);
    return [];
  }
  const oneSealant =
    data["PerformanceMeasure"]["rates"]["Rate1AtLeastOneSealant"];
  const fourMolarsSealed =
    data["PerformanceMeasure"]["rates"]["Rate2AllFourMolarsSealed"];
  let error;
  const errorArray: any[] = [];

  if (oneSealant && fourMolarsSealed) {
    oneSealant.forEach((_oneSealantObj: any, index: number) => {
      if (
        oneSealant[index] &&
        fourMolarsSealed[index] &&
        parseFloat(oneSealant[index]?.rate ?? "") <
          parseFloat(fourMolarsSealed[index]?.rate ?? "")
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage:
            "Rate 2 (All Four Molars Sealed) should not be higher than Rate 1 (At Least One Sealant).",
        };

        errorArray.push(error);
      }
    });
  }
  return error ? errorArray : [];
};

const sameDenominatorSets: OmsValidationCallback = ({
  rateData,
  locationDictionary,
  categories,
  qualifiers,
  isOPM,
  label,
}) => {
  if (isOPM) return [];
  const errorArray: FormError[] = [];

  for (const qual of qualifiers.map((s) => cleanString(s))) {
    for (let initiation = 0; initiation < categories.length; initiation += 2) {
      const engagement = initiation + 1;
      const initRate =
        rateData.rates?.[qual]?.[cleanString(categories[initiation])]?.[0];
      const engageRate =
        rateData.rates?.[qual]?.[cleanString(categories[engagement])]?.[0];

      if (
        initRate &&
        engageRate &&
        initRate.denominator !== engageRate.denominator
      ) {
        errorArray.push({
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            [...label, qual]
          )}`,
          errorMessage: `Denominators must be the same for ${locationDictionary(
            [categories[initiation]]
          )} and ${locationDictionary([categories[engagement]])}.`,
        });
      }
    }
  }

  return errorArray;
};

const SFMCHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  let unfilteredSameDenominatorErrors: any[] = [];
  for (let i = 0; i < performanceMeasureArray.length; i += 2) {
    unfilteredSameDenominatorErrors = [
      ...unfilteredSameDenominatorErrors,
      ...validateEqualDenominators(
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

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateOneSealantGreaterThanFourMolarsSealed(data),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...filteredSameDenominatorErrors,
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        validateOneRateLessThanOther,
        validateDenominatorGreaterThanNumerator,
        validateRateZero,
        validateRateNotZero,
        sameDenominatorSets,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [SFMCHValidation];
