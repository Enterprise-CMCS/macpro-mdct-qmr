import * as DC from "dataConstants";
import {
  OmsValidationCallback,
  locationDictionaryFunction,
  RateData,
} from "../types";
import {
  OmsNodes as OMS,
  OptionalMeasureStratification,
  RateFields,
} from "shared/types";
import { DefaultFormData } from "shared/types/FormData";
import { validatePartialRateCompletionOMS } from "shared/globalValidations/validatePartialRateCompletion";
import { LabelData, cleanString, isLegacyLabel } from "utils";
import { AnyObject } from "types";

interface OmsValidationProps {
  data: DefaultFormData;
  qualifiers: LabelData[];
  categories: LabelData[];
  locationDictionary: locationDictionaryFunction;
  validationCallbacks: OmsValidationCallback[];
  customTotalLabel?: string;
  dataSource?: string[];
}
export const omsValidations = ({
  categories,
  data,
  locationDictionary,
  qualifiers,
  validationCallbacks,
  customTotalLabel,
  dataSource,
}: OmsValidationProps) => {
  const opmCats: LabelData[] = [{ id: "OPM", text: "OPM", label: "OPM" }];
  const opmQuals: LabelData[] = [];
  const isOPM: boolean =
    data.MeasurementSpecification === "Other" &&
    !!data["OtherPerformanceMeasure-Rates"];

  if (isOPM) {
    opmQuals.push(
      ...data["OtherPerformanceMeasure-Rates"].map((rate) => {
        const id =
          !isLegacyLabel() && rate.description
            ? `${DC.OPM_KEY}${cleanString(rate.description)}`
            : rate.description;

        return {
          id: id ? id : "Fill out description",
          label: rate.description ? rate.description : "Fill out description",
          text: "",
        };
      })
    );
  }
  const cats =
    categories.length === 0
      ? [
          {
            id: DC.SINGLE_CATEGORY,
            text: DC.SINGLE_CATEGORY,
            label: DC.SINGLE_CATEGORY,
          },
        ]
      : categories;
  return validateNDRs(
    data,
    validationCallbacks,
    opmQuals.length ? opmQuals : qualifiers,
    opmQuals.length ? opmCats : cats,
    locationDictionary,
    isOPM,
    customTotalLabel,
    dataSource
  );
};

const getOMSRates = (
  data: OptionalMeasureStratification,
  locationDictionary: locationDictionaryFunction
) => {
  const omsRates = [];
  //loop through the OMS selections and pull out any that has a rateData (when there's a checkbox selected)
  for (const topLevelKey of Object.keys(
    data.OptionalMeasureStratification.selections
  )) {
    const topLevel = data.OptionalMeasureStratification.selections[topLevelKey];
    //mid level and lower is where to get the rate data
    if (topLevel.selections) {
      for (const midLevelKey of Object.keys(topLevel.selections)) {
        const midLevel = topLevel.selections[midLevelKey];
        if (midLevel.rateData) {
          omsRates.push({
            key: locationDictionary([topLevelKey, midLevelKey]),
            ...midLevel,
          });
        }
        if (midLevel.selections) {
          for (const lowLevelKey of Object.keys(midLevel.selections)) {
            const lowLevel = midLevel.selections[lowLevelKey];
            if (lowLevel.rateData) {
              omsRates.push({
                key: locationDictionary([
                  topLevelKey,
                  midLevelKey,
                  lowLevelKey,
                ]),
                ...lowLevel,
              });
            }
          }
        }
      }
    }
  }
  return omsRates;
};

const errorForNDRFields = (
  rates: OMS.OmsRateFields,
  labels: string,
  locationDictionary: locationDictionaryFunction
) => {
  const errors = [];
  for (const catId of Object.keys(rates)) {
    const qualifers = (rates as AnyObject)[catId] as {
      [key: string]: RateFields[];
    };
    errors.push(
      Object.keys(qualifers)
        .filter(
          (qualId: string) =>
            !qualifers[qualId].every(
              (ndr: RateFields) => ndr.numerator && ndr.denominator && ndr.rate
            )
        )
        .map((qualId: string) => ({
          errorLocation: `Optional Measure Stratification: ${labels} - ${locationDictionary(
            [catId, qualId]
          )}`,
          errorMessage:
            "For any category selected, all NDR sets must be filled.",
        }))
    );
  }
  return errors.flat();
};

const errorForNDRSelection = (key: string) => {
  return {
    errorLocation: `Optional Measure Stratification: ${key}`,
    errorMessage: "Must fill out at least one NDR set.",
  };
};

const validateNDRs = (
  data: DefaultFormData,
  callbackArr: OmsValidationCallback[],
  qualifiers: LabelData[],
  categories: LabelData[],
  locationDictionary: locationDictionaryFunction,
  isOPM: boolean,
  customTotalLabel?: string,
  dataSource?: string[]
) => {
  let errorArray: FormError[] = [];
  const omsRates = getOMSRates(data, locationDictionary);

  const errorsNDR = omsRates.map((data) => {
    const errorLogs = [];
    if (data.rateData?.rates) {
      errorLogs.push(
        ...errorForNDRFields(data.rateData?.rates, data.key, locationDictionary)
      );
    } else {
      errorLogs.push(errorForNDRSelection(data.key));
    }
    return errorLogs;
  });

  errorArray = errorArray.concat(...errorsNDR);

  return errorArray;
};
