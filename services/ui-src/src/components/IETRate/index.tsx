import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "measures/2023/shared/CommonQuestions/types";

import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";
import { LabelData, getLabelText } from "utils";
import { IRate } from "components";
import { defaultRateCalculation } from "utils/rateFormulas";
import {
  allNumbers,
  eightNumbersOneDecimal,
  rateThatAllowsFourDecimals,
  rateThatAllowsOneDecimal,
  allPositiveIntegersWith8Digits,
} from "utils";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  categoryName?: string;
  categories?: LabelData[];
  customMask?: RegExp;
  calcTotal?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
  customDenominatorLabel?: string;
  customNumeratorLabel?: string;
  customRateLabel?: string;
  rateCalc?: RateFormula;
}

export const IETRate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 100,
  categoryName,
  categories,
  customMask,
  calcTotal,
  allowNumeratorGreaterThanDenominator,
  customDenominatorLabel,
  customNumeratorLabel,
  customRateLabel,
  rateCalc = defaultRateCalculation,
  ...rest
}: Props) => {
  const {
    control,
    formState: { errors },
    unregister,
  } = useFormContext();
  const labelText = getLabelText();
  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });
  //Using a watch to keep track of the rate changes as we need rates from each category to calculate the total
  const { watch } = useFormContext<Types.DefaultFormData>();
  const data = watch();

  if (calcTotal) {
    rates.map((rate) => {
      if (
        rate.label?.toLowerCase().includes("total") ||
        categoryName?.toLowerCase().includes("total")
      )
        rate["isTotal"] = true;
      return rate;
    });
  }

  /*
  On component render, verify that all NDRs have a label, id and isTotal value.
  This is required for accurate data representation in DB and to calculateTotalsByCategory().
  */
  useEffect(() => {
    const prevRate = [...field.value];
    rates.forEach((rate, index) => {
      if (prevRate[index] === undefined) {
        prevRate[index] = {};
      }
      prevRate[index]["label"] = rate.label ?? undefined;
      prevRate[index]["uid"] = rate.uid ?? undefined;

      if (
        categoryName?.toLowerCase().includes("total") ||
        prevRate[index]["label"].toLowerCase().includes("total")
      ) {
        prevRate[index]["isTotal"] = true;
      }
    });

    field.onChange([...prevRate]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string,
    isTotal?: boolean
  ) => {
    const digitsAfterDecimal = 1;
    if (!allNumbers.test(newValue)) return;
    if (type === "rate" && readOnly) return;
    const prevRate = [...field.value];
    const editRate = { ...prevRate[index] };
    const validEditRate = eightNumbersOneDecimal.test(newValue);

    if (
      (type === "numerator" || type === "denominator") &&
      allPositiveIntegersWith8Digits.test(newValue)
    ) {
      editRate[type] = validEditRate ? newValue : editRate[type];
    }

    if (type === "rate" && !readOnly) {
      const regex = allowMultiple
        ? rateThatAllowsFourDecimals
        : rateThatAllowsOneDecimal;

      editRate[type] =
        regex.test(newValue) || newValue === "" || customMask?.test(newValue)
          ? newValue
          : editRate[type];

      prevRate[index] = {
        label: rates[index].label,
        ...editRate,
      };

      // Totals NDR should be independently editable
      if (calcTotal && !isTotal) {
        categoryName
          ? calculateTotalsByCategory(editRate)
          : calculate(prevRate);
      }

      field.onChange([...prevRate]);
      return;
    }

    if (
      parseInt(editRate.denominator) &&
      editRate.numerator &&
      (parseFloat(editRate.numerator) <= parseFloat(editRate.denominator) ||
        allowNumeratorGreaterThanDenominator)
    ) {
      editRate.rate = rateCalc(
        editRate.numerator,
        editRate.denominator,
        rateMultiplicationValue,
        digitsAfterDecimal
      );
    } else if (editRate.rate) {
      editRate.rate = "";
    }

    prevRate[index] = {
      label: rates[index].label,
      ...editRate,
    };

    // Totals NDR should be independently editable
    if (calcTotal && !isTotal) {
      categoryName ? calculateTotalsByCategory(editRate) : calculate(prevRate);
    }

    field.onChange([...prevRate]);
  };

  //function will get call when the category has the word total in the name
  //the only category to pay attention to is the one that says total
  const calculateTotalsByCategory = (rate: any) => {
    const allRates = data.PerformanceMeasure
      ?.rates as Types.PerformanceMeasureRate;

    if (!allRates) return;

    //using the first half of the category name as a key to sort the performance rate data
    let categoryType = categoryName ? categoryName.split(":")[0] : "";
    let sorted = Object.keys(allRates)
      .map((item) => {
        const qualCategory = categories?.find((cat) => cat.id === item)?.label;
        return allRates[item]?.find(
          (qual) =>
            qual.label === rate["label"] && qualCategory?.includes(categoryType)
        );
      })
      .filter((item) => !!item);

    //due to the delay in update, rateData is actually 1 input behind
    //we want to swap the the good data in and remove the delayed rate in sorted
    if (sorted) {
      const index = sorted.findIndex((qual) =>
        qual?.uid?.includes(rate["uid"])
      );
      if (index > -1) sorted[index] = rate;
      calculate(sorted);
    }
  };

  const calculate = (rates: any[]) => {
    let numeratorSum: any = null;
    let denominatorSum: any = null;

    //find the qualifer that is the total
    let totalQual = rates.find((rate) => rate["isTotal"]);

    //calculate the total numerator & denominator
    rates.forEach((rate) => {
      if (!rate["isTotal"] && rate["rate"]) {
        numeratorSum += rate?.numerator ? parseFloat(rate.numerator) : 0;
        denominatorSum += rate?.denominator ? parseFloat(rate.denominator) : 0;
      }
    });

    if (totalQual) {
      totalQual.numerator =
        numeratorSum !== null ? numeratorSum.toString() : "";
      totalQual.denominator =
        denominatorSum !== null ? denominatorSum.toString() : "";

      if (numeratorSum !== null && denominatorSum !== null) {
        totalQual.rate =
          numeratorSum !== 0
            ? rateCalc(
                numeratorSum.toString(),
                denominatorSum.toString(),
                rateMultiplicationValue,
                1
              )
            : "0";
      } else {
        totalQual["rate"] = "";
      }
    }
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

  return (
    <>
      {rates.map((rate, index) => {
        const isTotal = rate?.isTotal ?? undefined;
        return (
          <CUI.Stack key={rate.id} mt={4} mb={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700} data-cy={rate.label}>
                {labelText[rate.label] ?? rate.label}
              </CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <QMR.InputWrapper
                label={customNumeratorLabel || "Numerator"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.numerator`)
                    ?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.numerator`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  type="text"
                  aria-label={`${name}.${index}.numerator`}
                  value={field.value[index]?.numerator ?? ""}
                  data-cy={`${name}.${index}.numerator`}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value, isTotal)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customDenominatorLabel || "Denominator"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.denominator`)
                    ?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.denominator`)
                    ?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${name}.${index}.denominator`}
                  value={field.value[index]?.denominator ?? ""}
                  type="text"
                  data-cy={`${name}.${index}.denominator`}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value, isTotal)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customRateLabel || "Rate"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${name}.${index}.rate`}
                  value={field.value[index]?.rate ?? ""}
                  type="text"
                  data-cy={`${name}.${index}.rate`}
                  onChange={(e) =>
                    changeRate(index, "rate", e.target.value, isTotal)
                  }
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.HStack>
            {!allowNumeratorGreaterThanDenominator &&
              parseFloat(field.value[index]?.numerator) >
                parseFloat(field.value[index]?.denominator) && (
                <QMR.Notification
                  alertTitle="Rate Error"
                  alertDescription={`Numerator: ${field.value[index]?.numerator} cannot be greater than Denominator: ${field.value[index]?.denominator}`}
                  alertStatus="warning"
                />
              )}
          </CUI.Stack>
        );
      })}
    </>
  );
};
