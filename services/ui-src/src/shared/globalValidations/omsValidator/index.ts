import * as DC from "dataConstants";
import {
  OmsValidationCallback,
  locationDictionaryFunction,
} from "../../types/TypeValidations";
import {
  OmsNodes as OMS,
  OptionalMeasureStratification,
  RateFields,
} from "shared/types";
import { DefaultFormDataLegacy, DefaultFormData } from "shared/types/FormData";
import { validatePartialRateCompletionOMS } from "shared/globalValidations/validatePartialRateCompletion";
import { cleanString, isLegacyLabel, LabelData } from "utils";

interface OmsValidationProps {
  data: DefaultFormData | DefaultFormDataLegacy;
  qualifiers: LabelData[];
  categories: LabelData[];
  locationDictionary: locationDictionaryFunction;
  validationCallbacks: OmsValidationCallback[];
  customTotalLabel?: string;
  dataSource?: string[];
}

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
): {
  key: string;
  rateData?: OMS.OmsRateData;
}[] => {
  if (!data?.OptionalMeasureStratification?.selections) return [];

  const omsRates = [];

  //loop through the OMS selections and pull out any object that has a rateData (when there's a checkbox selected)
  for (const topLevelKey of Object.keys(
    data.OptionalMeasureStratification.selections
  )) {
    const topLevel = data.OptionalMeasureStratification.selections[topLevelKey];

    //the key version was added when we changed to using accordion's instead of checkboxes to handle the nesting of the oms data, makes it a good conditional
    const classificationRates = data.OptionalMeasureStratification.version
      ? getAccordionClassificationRates(
          topLevel,
          topLevelKey,
          locationDictionary
        )
      : getCheckboxClassificationRates(
          topLevel,
          topLevelKey,
          locationDictionary
        );

    if (classificationRates.length > 0) {
      omsRates.push(...classificationRates);
    }
    //if user choose to [+Add Another Classification]
    if (topLevel.additionalSelections) {
      omsRates.push(
        ...getAddAnotherClassificationRates(
          topLevel,
          topLevelKey,
          locationDictionary
        )
      );

      //if user choose to [+Add Another Sub-Category] after adding a new Classification
      omsRates.push(
        ...getAddAnotherSubCatRates(topLevel, topLevelKey, locationDictionary)
      );
    }
  }

  return omsRates;
};

const getCheckboxClassificationRates = (
  topLevel: OMS.TopLevelOmsNode,
  topLevelKey: string,
  locationDictionary: locationDictionaryFunction
) => {
  const omsRates = [];

  //if there are selections, we want to transverse the object to get to the sub categories
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
  //if no options are selected, we want to generate a warning
  else if (
    !topLevel.options ||
    (topLevel.options.length === 0 && !topLevel.additionalSelections) ||
    topLevel.additionalSelections?.length === 0
  ) {
    omsRates.push({ key: locationDictionary([topLevelKey]), ...topLevel });
  }

  return omsRates;
};

const getAccordionClassificationRates = (
  topLevel: OMS.TopLevelOmsNode,
  topLevelKey: string,
  locationDictionary: locationDictionaryFunction
) => {
  const omsRates = [];

  //if there are selections, we want to transverse the object to get to the sub categories
  if (topLevel.selections) {
    for (const midLevelKey of Object.keys(topLevel.selections)) {
      const midLevel = topLevel.selections[midLevelKey];
      const midLabel = locationDictionary([topLevelKey, midLevelKey]);

      //aggregate haves different checks than non aggregate rate data
      if (midLevel.aggregate != undefined) {
        if (
          midLevel.aggregate === "NoIndependentData" &&
          midLevel.options?.length! > 0
        ) {
          if (midLevel.selections) {
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

      //if user choose to [+Add Another Sub-Category]
      if (midLevel.additionalSubCategories) {
        omsRates.push(
          ...midLevel.additionalSubCategories.map((sub) => ({
            key: `${midLabel} - ${sub.description}`,
            rateData: sub.rateData,
          }))
        );
      } else {
        //we want to check rateData.options as that indicates the user has checked a selection or yesAggregateData as they selected a radio
        if (
          (midLevel.rateData as OMS.OmsRateFields)?.options ||
          midLevel.aggregate === "YesAggregateData"
        ) {
          omsRates.push({ key: midLabel, ...midLevel });
        } else {
          /* for rates that don't have checkboxes, it gets a little more complicated,
           * we have to look through the actual rate data to see if they entered any value to trigger a partial validation
           */
          if (midLevel.rateData?.rates) {
            const values = Object.values(
              midLevel.rateData?.rates as OMS.OmsRateFields
            );

            for (const rates of values) {
              const filledRates = (
                Object.values(rates).flat() as RateFields[]
              ).filter(
                (rate) =>
                  rate.numerator != undefined || rate.denominator != undefined
              );
              if (filledRates.length > 0)
                omsRates.push({ key: midLabel, ...midLevel });
            }
          }
        }
      }
    }
  }

  return omsRates;
};

const getAddAnotherClassificationRates = (
  topLevel: OMS.TopLevelOmsNode,
  topLevelKey: string,
  locationDictionary: locationDictionaryFunction
) => {
  return (
    topLevel.additionalSelections?.map((selection) => ({
      key: `${locationDictionary([topLevelKey])} - ${selection.description}`,
      rateData: selection.rateData,
    })) ?? []
  );
};

const getAddAnotherSubCatRates = (
  topLevel: OMS.TopLevelOmsNode,
  topLevelKey: string,
  locationDictionary: locationDictionaryFunction
) => {
  return (
    topLevel.additionalSelections
      ?.filter((additional) => additional.additionalSubCategories)
      .flatMap((additional) =>
        additional.additionalSubCategories!.map((subCat) => ({
          key: `${locationDictionary([topLevelKey])} - ${
            additional.description
          } - ${subCat.description}`,
          rateData: subCat.rateData,
        }))
      ) ?? []
  );
};

//this function is not used to validate AIF-HH, IU-HH or PCR measure's OMS
const validateNDR = (
  rates: NonNullable<OMS.OmsRateFields["rates"]>,
  labels: string,
  locationDictionary: locationDictionaryFunction
) => {
  const errors = [];
  for (const topKey of Object.keys(rates)) {
    const midKey = rates[topKey];
    errors.push(
      Object.keys(midKey)
        .filter(
          (qualId) =>
            !midKey[qualId].every(
              (ndr) => ndr.numerator && ndr.denominator && ndr.rate
            )
        )
        .map((qualId) =>
          errorToFillNDR(`${labels} - ${locationDictionary([topKey, qualId])}`)
        )
    );
  }
  return errors.flat();
};

const validateFields = (
  data: OMS.OmsRateMap,
  labels: string,
  locationDictionary: locationDictionaryFunction
) => {
  const errors = [];
  const section = data?.rates ?? {};

  for (const topKey of Object.keys(section)) {
    for (const midKey of Object.keys(section[topKey])) {
      const fields = section[topKey][midKey][0].fields;
      if (!fields.every((field) => !!field?.value))
        errors.push(
          errorToFillNDR(`${labels} - ${locationDictionary([topKey, midKey])}`)
        );
    }
  }
  return errors;
};

const validateValues = (data: OMS.OmsRateArray, labels: string) => {
  return data.every((field) => !!field?.value)
    ? []
    : [errorToFillNDR(`${labels}`)];
};

const buildOPMLocationDictionary = (
  ids: string[],
  opmData:
    | DefaultFormData["OtherPerformanceMeasure-Rates"]
    | DefaultFormDataLegacy["OtherPerformanceMeasure-Rates"]
) => {
  const keyMap = new Map();
  for (const opm of opmData) {
    const id = !isLegacyLabel()
      ? `${DC.OPM_KEY}${cleanString(opm.description!)}`
      : cleanString(opm.description!);
    keyMap.set(id, opm.description);
  }
  const labels = ids.filter((id) => keyMap.has(id));
  return labels.length > 0 ? keyMap.get(labels[0]) : "";
};

export const omsValidations = ({
  categories,
  data,
  locationDictionary,
  qualifiers,
  validationCallbacks,
  customTotalLabel,
  dataSource,
}: OmsValidationProps) => {
  const isOPM: boolean =
    data.MeasurementSpecification === "Other" &&
    !!data["OtherPerformanceMeasure-Rates"];

  let errorArray: FormError[] = [];
  const omsRates = getOMSRates(data, locationDictionary);

  //build a dictionary for opm to find the description labels in the error text
  const opmLocationDictionary = (ids: string[]) => {
    return buildOPMLocationDictionary(
      ids,
      data["OtherPerformanceMeasure-Rates"]
    );
  };

  //build the error array for the rates in OMS
  for (const omsRate of omsRates) {
    const label = omsRate?.key!;
    const rateData = omsRate?.rateData;

    if (!rateData) {
      errorArray.push(errorForNDRSelection(label));
      continue;
    }

    if (rateData[OMS.CustomKeys.Aifhh]) {
      errorArray.push(
        ...validateFields(
          rateData[OMS.CustomKeys.Aifhh]!,
          label,
          locationDictionary
        )
      );
    } else if (rateData[OMS.CustomKeys.Iuhh]) {
      errorArray.push(
        ...validateFields(
          rateData[OMS.CustomKeys.Iuhh]!,
          label,
          locationDictionary
        )
      );
    } else if (rateData[OMS.CustomKeys.Pcr]) {
      errorArray.push(...validateValues(rateData[OMS.CustomKeys.Pcr]!, label));
    } else if (rateData.rates) {
      errorArray.push(
        ...validateNDR(
          rateData.rates,
          label,
          isOPM ? opmLocationDictionary : locationDictionary
        )
      );
    } else {
      errorArray.push(errorForNDRSelection(label));
    }

    //running any callback functions
    for (const callback of validationCallbacks) {
      errorArray.push(
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

    if (rateData[OMS.CustomKeys.Pcr]) {
      // No need to validate partial completion for PCR-AD or PCR-HH
      continue;
    }

    let rateType = undefined;
    if (rateData[OMS.CustomKeys.Aifhh]) {
      rateType = OMS.CustomKeys.Aifhh as const;
    } else if (rateData[OMS.CustomKeys.Iuhh]) {
      rateType = OMS.CustomKeys.Iuhh as const;
    }

    errorArray.push(
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
  return errorArray;
};
