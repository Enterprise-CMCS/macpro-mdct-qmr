import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { allNumbers, xNumbersYDecimals } from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";
import { IRate } from "components";
import { defaultRateCalculation } from "utils/rateFormulas";

interface ndrFormula {
  num: number;
  denom: number;
  rate: number;
  mult: number;
}

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
  inputFieldNames: string[];
  measureName: "AIFHH" | "IUHH";
  ndrFormulas: ndrFormula[];
}

const ComplexRate = ({
  rates,
  name,
  readOnly = true,
  categoryName,
  inputFieldNames,
  measureName,
  ndrFormulas,
  ...rest
}: Props) => {
  const {
    control,
    formState: { errors },
    unregister,
  } = useFormContext();

  // Quick reference list of all rate indices
  const rateLocations = ndrFormulas.map((ndr) => ndr.rate);

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
          fields: inputFieldNames.map((label) => {
            return {
              label,
              value: undefined,
            };
          }),
        };
      }
      prevRate[index]["label"] = rate.label ?? undefined;
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
        if (formula.num === fieldIndex || formula.denom === fieldIndex)
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
      if (measureName === "IUHH") {
        calculateIUHHTotals(prevRate, ndrFormulas);
      } else if (measureName === "AIFHH") {
        calculateAIFHHTotals(prevRate, ndrFormulas);
      }
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
              direction="row"
              className={`${lowerCaseMeasureName}-field-stack`}
              key={`${lowerCaseMeasureName}-field-stack-${qualIndex}`}
            >
              {inputFieldNames.map((inputFieldName, fieldIndex) => {
                return (
                  <QMR.InputWrapper
                    isInvalid={
                      !!objectPath.get(errors, `${name}.${fieldIndex}.value`)
                        ?.message
                    }
                    key={`input-wrapper-${inputFieldName}-${fieldIndex}`}
                    label={inputFieldName}
                    formLabelProps={{
                      minH: "50px",
                    }}
                    {...rest}
                  >
                    {readOnly && rateLocations.includes(fieldIndex) ? (
                      <CUI.Text
                        paddingTop="2"
                        key={`input-field-${fieldIndex}`}
                        data-cy={`${name}.${fieldIndex}.value`}
                      >
                        {field.value?.[qualIndex]?.fields?.[fieldIndex]
                          ?.value ?? ""}
                      </CUI.Text>
                    ) : (
                      <CUI.Input
                        key={`input-field-${fieldIndex}`}
                        value={
                          field.value?.[qualIndex]?.fields?.[fieldIndex]
                            ?.value ?? ""
                        }
                        data-cy={`${name}.${fieldIndex}.value`}
                        onChange={(e) =>
                          changeRate(
                            qualIndex,
                            fieldIndex,
                            e.target.value,
                            field.value[qualIndex].isTotal ?? false
                          )
                        }
                      />
                    )}
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

// Calculate Rates for a row of data using the ndrFormulas as a guide
const calculateRates = (
  fieldRow: { name: string; value: string }[],
  ndrFormulasSubset: any
) => {
  for (const formula of ndrFormulasSubset) {
    let x;
    const num = !isNaN((x = parseFloat(fieldRow[formula.num].value)))
      ? x
      : null;
    const denom = !isNaN((x = parseFloat(fieldRow[formula.denom].value)))
      ? x
      : null;

    if (num !== null && denom !== null) {
      fieldRow[formula.rate].value =
        num !== 0 && denom !== 0
          ? defaultRateCalculation(
              num.toString(),
              denom.toString(),
              formula.mult,
              1
            )
          : "0";
    } else {
      fieldRow[formula.rate].value = "";
    }
  }
  return fieldRow;
};

const calculateIUHHTotals = (prevRate: any[], ndrFormulas: ndrFormula[]) => {
  let dischargeSum: any = null;
  let daySum: any = null;
  let numEnrolleeSum: any = null;
  let x;

  // sum all field values - we assume last row is total
  prevRate.slice(0, -1).forEach((item) => {
    if (item !== undefined && item !== null && !item["isTotal"]) {
      if (item?.fields?.every((f: { value: string }) => !!f?.value)) {
        if (!isNaN((x = parseFloat(item.fields[0].value)))) {
          numEnrolleeSum = numEnrolleeSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item.fields[1].value)))) {
          dischargeSum = dischargeSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item.fields[3].value)))) {
          daySum = daySum + x; // += syntax does not work if default value is null
        }
      }
    }
  });

  // Set total values and calculate total rate
  let totalIndex = prevRate.length - 1;
  let totals = prevRate[totalIndex];

  let newValue = numEnrolleeSum !== null ? numEnrolleeSum.toString() : "";
  totals.fields[0].value = newValue;

  newValue = dischargeSum !== null ? dischargeSum.toString() : "";
  totals.fields[1].value = newValue;

  newValue = daySum !== null ? daySum.toString() : "";
  totals.fields[3].value = newValue;

  totals.fields = calculateRates(totals.fields, ndrFormulas);
  prevRate[totalIndex] = totals;
};

const calculateAIFHHTotals = (prevRate: any[], ndrFormulas: ndrFormula[]) => {
  let numEnrolleeSum: any = null;
  let shortSum: any = null;
  let medSum: any = null;
  let longSum: any = null;
  let x;

  // sum all field values - we assume last row is total
  prevRate.slice(0, -1).forEach((item) => {
    if (item !== undefined && item !== null && !item["isTotal"]) {
      if (item?.fields?.every((f: { value?: string }) => !!f?.value)) {
        if (!isNaN((x = parseFloat(item.fields[0].value)))) {
          numEnrolleeSum = numEnrolleeSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item.fields[1].value)))) {
          shortSum = shortSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item.fields[3].value)))) {
          medSum = medSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item.fields[5].value)))) {
          longSum = longSum + x; // += syntax does not work if default value is null
        }
      }
    }
  });

  // Set total values and calculate total rate
  let totalIndex = prevRate.length - 1;
  let totals = prevRate[totalIndex];

  let newValue = numEnrolleeSum !== null ? numEnrolleeSum.toString() : "";
  totals.fields[0].value = newValue;

  newValue = shortSum !== null ? shortSum.toString() : "";
  totals.fields[1].value = newValue;

  newValue = medSum !== null ? medSum.toString() : "";
  totals.fields[3].value = newValue;

  newValue = longSum !== null ? longSum.toString() : "";
  totals.fields[5].value = newValue;

  totals.fields = calculateRates(totals.fields, ndrFormulas);
  prevRate[totalIndex] = totals;
};

interface IUHHProps extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  calcTotal?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
  categoryName: string;
}

export const IUHHRate = ({
  rates,
  name,
  readOnly = true,
  categoryName,
  ...rest
}: IUHHProps) => {
  const measureName = "IUHH";

  const inputFieldNames = [
    "Number of Enrollee Months",
    "Discharges",
    "Discharges per 1,000 Enrollee Months",
    "Days",
    "Days per 1,000 Enrollee Months",
    "Average Length of Stay",
  ];

  // Rate structure by index in row
  const ndrFormulas = [
    // Discharges per 1,000 Enrollee Months
    {
      num: 1,
      denom: 0,
      rate: 2,
      mult: 1000,
    },
    // Days per 1,000 Enrollee Months
    {
      num: 3,
      denom: 0,
      rate: 4,
      mult: 1000,
    },
    // Average Length of Stay
    {
      num: 3,
      denom: 1,
      rate: 5,
      mult: 1,
    },
  ];

  return ComplexRate({
    rates: rates,
    name: name,
    categoryName: categoryName,
    inputFieldNames: inputFieldNames,
    measureName: measureName,
    ndrFormulas: ndrFormulas,
    ...rest,
  });
};

interface AIFHHProps extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  calcTotal?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
}

export const AIFHHRate = ({
  rates,
  name,
  readOnly = true,
  ...rest
}: AIFHHProps) => {
  const measureName = "AIFHH";

  const inputFieldNames = [
    "Number of Enrollee Months",
    "Number of Short-Term Admissions",
    "Short-Term Admissions per 1,000 Enrollee Months",
    "Number of Medium-Term Admissions",
    "Medium-Term Admissions per 1,000 Enrollee Months",
    "Number of Long-Term Admissions",
    "Long-Term Admissions per 1,000 Enrollee Months",
  ];

  // Rate structure by index in row
  const ndrFormulas = [
    // Short-Term Admissions per 1,000 Enrollee Months
    {
      num: 1,
      denom: 0,
      rate: 2,
      mult: 1000,
    },
    // Medium-Term Admissions per 1,000 Enrollee Months
    {
      num: 3,
      denom: 0,
      rate: 4,
      mult: 1000,
    },
    // Long-Term Admissions per 1,000 Enrollee Months
    {
      num: 5,
      denom: 0,
      rate: 6,
      mult: 1000,
    },
  ];

  return ComplexRate({
    rates: rates,
    name: name,
    inputFieldNames: inputFieldNames,
    measureName: measureName,
    ndrFormulas: ndrFormulas,
    ...rest,
  });
};
