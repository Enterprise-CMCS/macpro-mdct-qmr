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

//if the user had checked an OMS that opened up an NDR and did not fill that NDR, this is the error telling them to fill it
const errorToFillNDR = (label: string) => {
  return {
    errorLocation: `Optional Measure Stratification: ${label}`,
    errorMessage: "For any category selected, all NDR sets must be filled.",
  };
};

//if checkbox selected is not one that shows an NDR set, this is the error that shows up
const errorForNDRSelection = (label: string) => {
  return {
    errorLocation: `Optional Measure Stratification: ${label}`,
    errorMessage: "Must fill out at least one NDR set.",
  };
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
        const midLabel = locationDictionary([topLevelKey, midLevelKey]);
        if (midLevel) {
          //for checkboxes that open up to sub-classifications, we only want to track it when no subclassification has been checked
          if (
            !(
              midLevel.aggregate === "NoIndependentData" &&
              midLevel.options?.length! > 0
            )
          )
            omsRates.push({ key: midLabel, ...midLevel });
        }

        //if user choose to [+Add Another Sub-Category]
        if (midLevel.additionalSubCategories) {
          omsRates.push(
            ...midLevel.additionalSubCategories.map((sub) => ({
              key: `${midLabel} - ${sub.description}`,
              rateData: sub.rateData,
            }))
          );
        }
        if (midLevel.selections) {
          //low level keys are aggregated/disaggregated data that user will select yes or no to
          for (const lowLevelKey of Object.keys(midLevel.selections)) {
            const lowLabel = locationDictionary([
              topLevelKey,
              midLevelKey,
              lowLevelKey,
            ]);
            const lowLevel = midLevel.selections[lowLevelKey];
            if (lowLevel) {
              omsRates.push({ key: lowLabel, ...lowLevel });
            }
          }
        }
      }
    }
    //if no options are selected, we want to generate a warning for that too
    else if (!topLevel.options || topLevel.options.length === 0) {
      omsRates.push({ key: locationDictionary([topLevelKey]), ...topLevel });
    }

    //if user choose to [+Add Another Classification]
    if (topLevel.additionalSelections) {
      const additional = topLevel.additionalSelections?.map((selection) => ({
        key: `${locationDictionary([topLevelKey])} - ${selection.description}`,
        rateData: selection.rateData,
      }));

      if (additional) {
        omsRates.push(...additional);
      }

      //if user choose to [+Add Another Sub-Category] after adding a new Classification
      const additionalSubCategories = topLevel.additionalSelections
        .filter((additional) => additional.additionalSubCategories)
        .flatMap((additional) =>
          additional.additionalSubCategories?.map((subCat) => ({
            key: `${locationDictionary([topLevelKey])} - ${
              additional.description
            } - ${subCat.description}`,
            rateData: subCat.rateData,
          }))
        );

      if (additionalSubCategories) {
        omsRates.push(...additionalSubCategories);
      }
    }
  }
  return omsRates;
};

//this function is not used to validate AIF-HH, IU-HH or PCR measure's OMS
const validateNDR = (
  rates: OMS.OmsRateFields,
  labels: string,
  locationDictionary: locationDictionaryFunction
) => {
  const errors = [];
  for (const topKey of Object.keys(rates)) {
    const midKey = (rates as AnyObject)[topKey] as {
      [key: string]: RateFields[];
    };
    errors.push(
      Object.keys(midKey)
        .filter(
          (qualId: string) =>
            !midKey[qualId].every(
              (ndr: RateFields) => ndr.numerator && ndr.denominator && ndr.rate
            )
        )
        .map((qualId: string) =>
          errorToFillNDR(`${labels} - ${locationDictionary([topKey, qualId])})`)
        )
    );
  }
  return errors.flat();
};

const validateFields = (
  data: OMS.OmsRateFields,
  labels: string,
  locationDictionary: locationDictionaryFunction
) => {
  const errors = [];
  const section = data?.rates ?? {};

  for (const topKey of Object.keys(section)) {
    for (const midKey of Object.keys(section[topKey])) {
      const fields: { label: string; value?: string }[] = (
        section[topKey][midKey][0] as AnyObject
      ).fields;
      if (!fields.every((field) => !!field?.value))
        errors.push(
          errorToFillNDR(`${labels} - ${locationDictionary([topKey, midKey])}`)
        );
    }
  }
  return errors;
};

const validateValues = (
  data: { label: string; value?: string }[],
  labels: string
) => {
  return data.every((field) => !!field?.value)
    ? []
    : [errorToFillNDR(`${labels}`)];
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

  //error for OPM

  const errorsNDR = omsRates.map((data) => {
    const label = data?.key!;
    const rateData = data?.rateData as AnyObject;
    const errorLogs = [];

    if (rateData) {
      if (rateData?.["aifhh-rate"]) {
        errorLogs.push(
          ...validateFields(rateData?.["aifhh-rate"], label, locationDictionary)
        );
      } else if (rateData?.["iuhh-rate"]) {
        errorLogs.push(
          ...validateFields(
            (rateData as AnyObject)?.["iuhh-rate"],
            label,
            locationDictionary
          )
        );
      } else if (rateData?.["pcr-rate"]) {
        errorLogs.push(
          ...validateValues((rateData as AnyObject)?.["pcr-rate"], label)
        );
      } else if (rateData?.rates) {
        errorLogs.push(
          ...validateNDR(rateData?.rates, label, locationDictionary)
        );
      } else {
        errorLogs.push(errorForNDRSelection(label));
      }

      //running any callback functions
      for (const callback of callbackArr) {
        errorLogs.push(
          ...callback({
            rateData,
            categories,
            qualifiers,
            label: [label],
            locationDictionary,
            isOPM,
            customTotalLabel,
            dataSource,
          })
        );
      }

      //validate partial rates
      if (!rateData?.["pcr-rate"]) {
        // check for complex rate type and assign appropriate tag
        const rateType = !!rateData?.["iuhh-rate"]
          ? "iuhh-rate"
          : !!rateData?.["aifhh-rate"]
          ? "aifhh-rate"
          : undefined;

        errorLogs.push(
          ...validatePartialRateCompletionOMS(rateType)({
            rateData,
            categories,
            qualifiers,
            label: [label],
            locationDictionary,
            isOPM,
            customTotalLabel,
            dataSource,
          })
        );
      }
    }
    return errorLogs;
  });

  errorArray = errorArray.concat(...errorsNDR);

  return errorArray;
};
