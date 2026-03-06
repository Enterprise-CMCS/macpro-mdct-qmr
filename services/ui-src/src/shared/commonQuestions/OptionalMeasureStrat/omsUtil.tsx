import objectPath from "object-path";
import { complexRateFields, RateFields } from "shared/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ComponentFlagType, usePerformanceMeasureContext } from "./context";
import { LabelData, isLegacyLabel } from "utils";

interface TempRate {
  numerator?: number;
  denominator?: number;
  rate?: string;
}

interface TotalCalcHookProps {
  // OMS name of current rate section
  name: string;
  // current cleaned category
  cleanedCategory?: string;
  // Rate component type identifier
  componentFlag: ComponentFlagType;
}

interface CalcOmsTotalProp {
  watchOMS: any;
  cleanedCategory: string;
  qualifiers: LabelData[];
  rateMultiplicationValue?: number;
  numberOfDecimals: number;
  componentFlag?: any;
}

//this function will determine how to retrieve ndr value based on qual type
const NDR = (watchOMS: any, cleanedCategory: any, qual: LabelData) => {
  if (isLegacyLabel()) {
    return watchOMS?.[qual.id]?.[cleanedCategory];
  } else {
    return watchOMS?.[cleanedCategory]?.[qual.id];
  }
};

/** Process all OMS rate values pertaining to set category and calculate new rate object */
/** Note: this currently isn't in use with 2023 because we updated the OMS to show only the total qualifier if there is one in the list of qualifiers. */
export const calculateOMSTotal = ({
  cleanedCategory,
  numberOfDecimals,
  qualifiers,
  rateMultiplicationValue = 100,
  watchOMS,
}: CalcOmsTotalProp): RateFields => {
  const tempRate: TempRate = {
    numerator: undefined,
    denominator: undefined,
    rate: undefined,
  };

  for (const qual of qualifiers.slice(0, -1)) {
    const ndr = NDR(watchOMS, cleanedCategory, qual)?.[0];

    if (ndr?.numerator && ndr?.denominator && ndr?.rate) {
      tempRate.numerator ??= 0;
      tempRate.denominator ??= 0;
      tempRate.numerator += parseFloat(ndr.numerator);
      tempRate.denominator += parseFloat(ndr.denominator);
    }
  }

  if (tempRate.numerator !== undefined && tempRate.denominator !== undefined) {
    tempRate.rate = (
      Math.round(
        (tempRate.numerator / tempRate.denominator) *
          rateMultiplicationValue *
          Math.pow(10, numberOfDecimals)
      ) / Math.pow(10, numberOfDecimals)
    ).toFixed(1);
  }

  return {
    numerator:
      tempRate.numerator !== undefined ? `${tempRate.numerator}` : undefined,
    denominator:
      tempRate.denominator !== undefined
        ? `${tempRate.denominator}`
        : undefined,
    rate: tempRate.rate,
  };
};

/** Checks if previous non-undefined OMS values have changed */
const checkNewOmsValuesChanged = (
  next: RateFields[],
  prev?: RateFields[]
): boolean => {
  if (!prev) return false;
  return !next.every(
    (v, i) =>
      v.numerator === prev?.[i]?.numerator &&
      v.denominator === prev?.[i]?.denominator &&
      v.rate === prev?.[i]?.rate
  );
};

interface complexTempRate {
  label: string;
  fields: { label: string; value: any }[];
  isTotal: true;
}

const IUHHndrForumlas = [
  // Discharges per 1,000 Enrollee Months
  {
    numerator: 1,
    denominator: 0,
    rate: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    numerator: 3,
    denominator: 0,
    rate: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    numerator: 3,
    denominator: 1,
    rate: 5,
    mult: 1,
  },
];

const AIFHHndrFormulas = [
  // short term
  {
    numerator: 1,
    denominator: 0,
    rate: 2,
    mult: 1000,
  },
  // medium term
  {
    numerator: 3,
    denominator: 0,
    rate: 4,
    mult: 1000,
  },
  // long term
  {
    numerator: 5,
    denominator: 0,
    rate: 6,
    mult: 1000,
  },
];

/** (IU-HH Specific) Process all OMS rate values pertaining to set category and calculate new rate object */
export const calculateComplexOMSTotal = ({
  cleanedCategory,
  qualifiers,
  watchOMS,
  componentFlag,
}: CalcOmsTotalProp): complexRateFields => {
  const cleanedQualifiers = qualifiers.slice(0, -1);
  const fieldNames = watchOMS?.["Total"]?.[cleanedCategory]?.[0]?.fields.map(
    (field: any) => field.label
  );

  // Create empty temp obj
  const tempRate: complexTempRate = {
    label: cleanedCategory,
    fields: fieldNames?.map((f: string) => {
      return {
        label: f,
        value: undefined,
      };
    }),
    isTotal: true,
  };

  // Store sums in temp
  for (const qual of cleanedQualifiers) {
    const fields = NDR(watchOMS, cleanedCategory, qual)?.[0]?.fields;
    if (fields?.every((f: { value?: string }) => !!f?.value)) {
      fields?.forEach((field: { value: string }, i: number) => {
        if (field?.value && tempRate?.fields?.[i]) {
          tempRate.fields[i].value ??= 0;
          tempRate.fields[i].value += parseFloat(field.value);
        }
      });
    }
  }
  let formulaSet: any;
  switch (componentFlag) {
    case "AIF":
      formulaSet = AIFHHndrFormulas;
      break;
    case "IU":
      formulaSet = IUHHndrForumlas;
      break;
  }
  // Calculate rates for totals
  for (const f of formulaSet!) {
    const numerator = tempRate.fields?.[f.num]?.value;
    const denominator = tempRate.fields?.[f.denom]?.value;
    if (numerator && denominator) {
      tempRate.fields[f.rate].value = (
        Math.round((numerator / denominator) * f.mult * 10) / 10
      ).toFixed(1);
    }
  }

  // Convert numbers to strings
  for (const field of tempRate?.fields ?? []) {
    field.value = field.value !== undefined ? `${field.value}` : undefined;
  }

  return tempRate;
};

/** (IU-HH Specific) Checks if previous non-undefined OMS values have changed */
const checkNewIUHHOmsValuesChanged = (
  next: complexRateFields[],
  prev?: complexRateFields[]
): boolean => {
  if (!prev) return false;
  return !next.every((v, i) => {
    return (
      v.fields?.[0]?.value === prev?.[i]?.fields?.[0]?.value &&
      v.fields?.[1]?.value === prev?.[i]?.fields?.[1]?.value &&
      v.fields?.[2]?.value === prev?.[i]?.fields?.[2]?.value &&
      v.fields?.[3]?.value === prev?.[i]?.fields?.[3]?.value &&
      v.fields?.[4]?.value === prev?.[i]?.fields?.[4]?.value &&
      v.fields?.[5]?.value === prev?.[i]?.fields?.[5]?.value
    );
  });
};

/** (AIF-HH Specific) Checks if previous non-undefined OMS values have changed */
const checkNewAIFHHOmsValuesChanged = (
  next: complexRateFields[],
  prev?: complexRateFields[]
): boolean => {
  if (!prev) return false;
  return !next.every((v, i) => {
    return (
      v.fields?.[0]?.value === prev?.[i]?.fields?.[0]?.value &&
      v.fields?.[1]?.value === prev?.[i]?.fields?.[1]?.value &&
      v.fields?.[2]?.value === prev?.[i]?.fields?.[2]?.value &&
      v.fields?.[3]?.value === prev?.[i]?.fields?.[3]?.value &&
      v.fields?.[4]?.value === prev?.[i]?.fields?.[4]?.value &&
      v.fields?.[5]?.value === prev?.[i]?.fields?.[5]?.value &&
      v.fields?.[6]?.value === prev?.[i]?.fields?.[6]?.value
    );
  });
};

/**
 * Hook to handle OMS total calculation only on field changes
 *
 * - type === undefined: is a field reset or form load
 * - type === change: NDR rate calculation or field change
 *
 * NOTE: we track previous fields in all states, but only fire recalculation if type === change and
 * fields have changed since last triggered event
 */
export const useTotalAutoCalculation = ({
  name,
  cleanedCategory = "singleCategory",
  componentFlag,
}: TotalCalcHookProps) => {
  const { watch, setValue } = useFormContext();
  const { qualifiers, numberOfDecimals, rateMultiplicationValue } =
    usePerformanceMeasureContext();
  const [previousOMS, setPreviousOMS] = useState<
    complexRateFields[] | undefined
  >();

  useEffect(() => {
    const totalFieldName = `${name}.rates.${
      qualifiers.at(-1)!.id
    }.${cleanedCategory}`;
    const nonTotalQualifiers = qualifiers.slice(0, -1);
    const includedNames = nonTotalQualifiers.map(
      (s) => `${name}.rates.${s.id}.${cleanedCategory}`
    );

    const subscription = watch((values, { name: fieldName, type }) => {
      if (fieldName && values) {
        let omsFields = [] as complexRateFields[] | RateFields[];
        const watchOMS = objectPath.get(values, `${name}.rates`);
        for (const q of nonTotalQualifiers) {
          omsFields.push(watchOMS?.[q.id]?.[cleanedCategory]?.[0] ?? {});
        }

        let OMSValuesChanged: boolean;
        switch (componentFlag) {
          case "IU":
            OMSValuesChanged = checkNewIUHHOmsValuesChanged(
              omsFields,
              previousOMS
            );
            break;
          case "AIF":
            OMSValuesChanged = checkNewAIFHHOmsValuesChanged(
              omsFields,
              previousOMS
            );
            break;
          default:
            OMSValuesChanged = checkNewOmsValuesChanged(omsFields, previousOMS);
            break;
        }
        if (
          type === "change" &&
          includedNames.includes(fieldName) &&
          OMSValuesChanged
        ) {
          let newFieldValue;
          switch (componentFlag) {
            case "IU":
              newFieldValue = calculateComplexOMSTotal({
                cleanedCategory,
                qualifiers,
                numberOfDecimals,
                rateMultiplicationValue,
                watchOMS,
                componentFlag,
              });
              break;
            case "AIF":
              newFieldValue = calculateComplexOMSTotal({
                cleanedCategory,
                qualifiers,
                numberOfDecimals,
                rateMultiplicationValue,
                watchOMS,
                componentFlag,
              });
              break;
            default:
              newFieldValue = calculateOMSTotal({
                cleanedCategory,
                qualifiers,
                numberOfDecimals,
                rateMultiplicationValue,
                watchOMS,
              });
              break;
          }
          setValue(totalFieldName, [newFieldValue]);
        }
        if (values) {
          const currentOMSFields = JSON.parse(JSON.stringify(omsFields));
          setPreviousOMS(currentOMSFields);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [
    watch,
    setValue,
    cleanedCategory,
    componentFlag,
    name,
    numberOfDecimals,
    qualifiers,
    rateMultiplicationValue,
    previousOMS,
    setPreviousOMS,
  ]);
};
