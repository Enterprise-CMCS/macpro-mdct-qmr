import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";

import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const PQI08Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const age65PlusIndex = 0;
  const dateRange = data["DateRange"];
  const definitionOfDenominator = data["DefinitionOfDenominator"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  const validateDualPopInformationArray = [
    performanceMeasureArray?.[0].filter((pm) => {
      return pm?.label === "Age 65 and older";
    }),
  ];
  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateOneDataSource(data),
    ...GV.validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      definitionOfDenominator
    ),
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      data
    ),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [GV.validateRateZero, GV.validateRateNotZero],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [PQI08Validation];
