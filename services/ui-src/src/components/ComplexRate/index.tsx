import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { allNumbers, LabelData, xNumbersYDecimals } from "utils";
import * as QMR from "components";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";
import { IRate } from "components";
import { defaultRateCalculation } from "utils/rateFormulas";
import { ndrFormula } from "types";
import { featuresByYear } from "utils/featuresByYear";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  calcTotal?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
  categoryName?: string;
  inputFieldNames?: LabelData[];
  measureName?: string;
  ndrFormulas?: ndrFormula[];
}

// Calculate Rates for a row of data using the ndrFormulas as a guide
const calculateRates = (
  fieldRow: { name: string; value: string }[],
  ndrFormulasSubset: ndrFormula[]
) => {
  for (const formula of ndrFormulasSubset) {
    let x;
    const num = !isNaN((x = parseFloat(fieldRow[formula.numerator].value)))
      ? x
      : null;
    const denom = !isNaN((x = parseFloat(fieldRow[formula.denominator].value)))
      ? x
      : null;

    if (num !== null && denom !== null) {
      fieldRow[formula.rate].value =
        num !== 0 && denom !== 0
          ? defaultRateCalculation(
              num.toString(),
              denom.toString(),
              formula.mult!,
              1
            )
          : "0";
    } else {
      fieldRow[formula.rate].value = "";
    }
  }
  return fieldRow;
};

const calculateTotals = (prevRate: any[], ndrFormulas: ndrFormula[]) => {
  let numEnrolleeSum: any = null;
  let valueArray: any[];
  let x;

  let numeratorPositions: number[] = [];
  ndrFormulas.forEach((formula) => {
    numeratorPositions.push(formula.numerator);
  });
  let numberOfNumerators = numeratorPositions.length;
  valueArray = new Array(numberOfNumerators).fill(0);
  let i: number;

  // sum all field values - we assume last row is total
  prevRate.slice(0, -1).forEach((item) => {
    if (!!item && !item["isTotal"]) {
      if (item.fields?.every((f: { value?: string }) => !!f?.value)) {
        if (!isNaN((x = parseFloat(item.fields[0].value)))) {
          numEnrolleeSum = numEnrolleeSum + x; // += syntax does not work if default value is null
        }
        i = numberOfNumerators;
        numeratorPositions.forEach((position) => {
          if (!isNaN((x = parseFloat(item.fields[position].value)))) {
            valueArray[numberOfNumerators - i] =
              valueArray[numberOfNumerators - i] + x;
          }
          i -= 1;
        });
      }
    }
  });

  // Set total values and calculate total rate
  let totalIndex = prevRate.length - 1;
  let totals = prevRate[totalIndex];

  let newValue = numEnrolleeSum !== null ? numEnrolleeSum.toString() : "";
  totals.fields[0].value = newValue;

  numeratorPositions.forEach((position) => {
    totals.fields[position].value = valueArray.shift();
  });

  totals.fields = calculateRates(totals.fields, ndrFormulas);
  prevRate[totalIndex] = totals;
};

export const ComplexRate = ({
  rates,
  name,
  readOnly = true,
  categoryName,
  inputFieldNames = [],
  measureName = "",
  ndrFormulas = [],
  ...rest
}: Props) => {
  const {
    control,
    formState: { errors },
    unregister,
  } = useFormContext();

  // Quick reference list of all rate indices
  const rateLocations = ndrFormulas.map((ndr) => ndr.rate);
  let inputFields: LabelData[] = inputFieldNames;

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  if (measureName === "IUHH") {
    if (categoryName === "Maternity") rates = [rates[1], rates[3], rates[4]];
  }
  rates[rates.length - 1]["isTotal"] = true;

  /*
  On component render, verify that all NDRs have a label and isTotal value.
  This is required for accurate data representation in DB and to calculateTotals().
  */
  useEffect(() => {
    const prevRate = [...field.value];
    rates.forEach((rate, index) => {
      if (prevRate[index] === undefined) {
        prevRate[index] = {
          label: rate.label,
          uid: rate.uid,
          fields: inputFields.map((field) => {
            const label = field.label;
            // Pre-2023 fields do not have an id, so uid is undefined.
            // Undefined values are not saved to the database
            const uid = field.id ?? undefined;
            return {
              label,
              uid,
              value: undefined,
            };
          }),
        };
      }
      prevRate[index]["label"] = rate.label ?? undefined;
      prevRate[index]["uid"] = rate.uid ?? undefined;
      if (featuresByYear.setCategoryForComplexRate) {
        prevRate[index]["category"] = categoryName ?? undefined;
      }
    });

    prevRate[prevRate.length - 1]["isTotal"] = true;

    field.onChange([...prevRate]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeRate = (
    qualIndex: number,
    fieldIndex: number,
    newValue: string,
    isTotal?: boolean
  ) => {
    const isRate = rateLocations.includes(fieldIndex);
    if (isRate && readOnly) return;
    if (!allNumbers.test(newValue)) return;
    if (!isRate && !xNumbersYDecimals(9, 0).test(newValue)) return;
    if (isRate && !xNumbersYDecimals(12, 1).test(newValue)) return;

    const prevRate = [...field.value];
    prevRate[qualIndex].fields[fieldIndex].value = newValue;
    if (!isRate) {
      // create a list of the ndrFormulas where fieldIndex is present
      const ndrFormulasSubset = ndrFormulas.filter((formula) => {
        if (
          formula.numerator === fieldIndex ||
          formula.denominator === fieldIndex
        )
          return true;
        return false;
      });
      prevRate[qualIndex].fields = calculateRates(
        prevRate[qualIndex].fields,
        ndrFormulasSubset
      );
    }

    // Totals should be independently editable
    if (!isTotal) {
      calculateTotals(prevRate, ndrFormulas);
    }

    field.onChange([...prevRate]);
  };

  useEffect(
    () => () => {
      unregister(name);
    },
    [unregister, name]
  );

  useLayoutEffect(() => {
    field.onChange(field.value);

    return () => {
      field.onChange([]);
    };
    // purposefully ignoring field to stop infinite rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const lowerCaseMeasureName = measureName.toLowerCase();

  return (
    <>
      {rates.map((qual, qualIndex) => {
        return (
          <CUI.Stack
            my={8}
            direction="column"
            className={`${lowerCaseMeasureName}-rate-stack`}
            key={`${lowerCaseMeasureName}-rate-stack-${qualIndex}`}
          >
            <CUI.Heading size={"sm"} key={`${qual.label}-heading`}>
              {lowerCaseMeasureName === "aifhh"
                ? qual.label
                : qual.label === "Total" || categoryName === ""
                ? `${qual.label} ${categoryName}`
                : `${categoryName} ${qual.label?.toLowerCase()}`}
            </CUI.Heading>
            <CUI.Stack
              direction={{ base: "column", md: "row" }}
              className={`${lowerCaseMeasureName}-field-stack`}
              key={`${lowerCaseMeasureName}-field-stack-${qualIndex}`}
            >
              {inputFields.map((inputFieldName, fieldIndex) => {
                return (
                  <QMR.InputWrapper
                    isInvalid={
                      !!objectPath.get(errors, `${name}.${fieldIndex}.value`)
                        ?.message
                    }
                    key={`input-wrapper-${inputFieldName.label}-${fieldIndex}`}
                    label={inputFieldName.label}
                    formLabelProps={{
                      minH: "50px",
                      h: "100px",
                    }}
                    {...rest}
                  >
                    <CUI.Input
                      key={`input-field-${fieldIndex}`}
                      value={
                        field.value?.[qualIndex]?.fields?.[fieldIndex]?.value ??
                        ""
                      }
                      data-cy={`${name}.${fieldIndex}.value`}
                      type="text"
                      onChange={(e) =>
                        changeRate(
                          qualIndex,
                          fieldIndex,
                          e.target.value,
                          field?.value[qualIndex]?.isTotal ?? false
                        )
                      }
                    />
                  </QMR.InputWrapper>
                );
              })}
            </CUI.Stack>
          </CUI.Stack>
        );
      })}
    </>
  );
};
