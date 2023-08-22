import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "measures/2023/shared/CommonQuestions/types";

import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";
import { LabelData, getLabelText } from "utils";
import { IRate } from "components";
import { defaultRateCalculation } from "utils/rateFormulas";
import { getMeasureYear } from "utils/getMeasureYear";
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
  //Using a watch to get all the rate changes as we need rates from all the categories to calculate the total
  //the current system only looks at rates in the qualifier level of the current category
  const { watch } = useFormContext<Types.DefaultFormData>();
  const allRates = watch().PerformanceMeasure
    ?.rates as Types.PerformanceMeasureRate;

  /*
  On component render, verify that all NDRs have a label, uid and isTotal value.
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
      // human readable text for Mathematica only needed for FFY 2023+
      if (getMeasureYear() >= 2023) {
        prevRate[index]["category"] = categoryName ?? undefined;
      }
      if (
        categoryName?.toLowerCase().includes("total") ||
        prevRate[index]["uid"].toLowerCase().includes("total")
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

    //working with the assumption that the categories names are split with :
    const categoryType = categoryName ? categoryName.split(":")[0] : "";

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
        if (categoryName) {
          calculateTotalCategory(categoryType, editRate);
          calculateTotalCategoryQuals(categoryType, editRate);
        }

        //if the qualifiers also does a summation, run a calculate (i.e. IET-HH)
        if (prevRate.find((rate) => rate["uid"].includes("Total")))
          calculate(prevRate, true);
      }

      field.onChange([...prevRate]);
      return;
    }

    if (
      editRate.denominator &&
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
      if (categoryName) {
        calculateTotalCategory(categoryType, editRate);
        calculateTotalCategoryQuals(categoryType, editRate);
      }

      //if the qualifiers also does a summation, run a calculate (i.e. IET-HH)
      if (prevRate.find((rate) => rate["uid"].includes("Total")))
        calculate(prevRate, true);
    }

    field.onChange([...prevRate]);
  };

  //function is called when there are categories being used
  const calculateTotalCategory = (categoryType: string, rate: any) => {
    if (!allRates) return;

    let cleanedRates = Object.keys(allRates)
      .map((item) => {
        const qualCategory = categories?.find((cat) => cat.id === item)?.label;
        return allRates[item]?.find(
          (qual) =>
            qual.label === rate["label"] && qualCategory?.includes(categoryType)
        );
      })
      .filter((item) => !!item);

    //due to the delay in update, allRates is actually 1 onChange behind
    //we want to swap the the good data in and remove the delayed rate in cleanedRates
    if (cleanedRates) {
      const totalIndex = cleanedRates.findIndex((qual) =>
        qual?.uid?.includes(rate["uid"])
      );
      if (totalIndex > -1) cleanedRates[totalIndex] = rate;
      calculate(cleanedRates);
    }
  };

  //IET-HH has an extra step of needing the total category to also do a summation on the qualifier level
  const calculateTotalCategoryQuals = (categoryType: string, rate: any) => {
    if (!allRates) return;

    let categoryId = categories?.find(
      (category) =>
        category.label.includes(categoryType) &&
        category.label.toLocaleLowerCase().includes("total")
    )?.id;

    if (categoryId) {
      let categoryTotalRates = allRates[categoryId];

      //swapping in the edit data because allRates is one onChanged behind
      let editIndex = categoryTotalRates?.findIndex((item) =>
        item.uid?.includes(rate.uid)
      );
      if (editIndex && categoryTotalRates?.[editIndex])
        categoryTotalRates[editIndex] = rate;

      calculate(categoryTotalRates as any[], true);
    }
  };

  const calculate = (rates: any[], totalById: boolean = false) => {
    let numeratorSum: any = null;
    let denominatorSum: any = null;

    //find the qualifer that is the total.
    //due to IET-HH having a total qualifier & total category, there will be instances where we want to search by either the uid or the isTotal boolean
    let totalQual = rates.find((rate) =>
      totalById ? rate["uid"].includes("Total") : rate["isTotal"]
    );

    if (totalQual) {
      //calculate the total numerator & denominator
      rates.forEach((rate) => {
        if (rate !== totalQual && rate["rate"]) {
          numeratorSum += rate?.numerator ? parseFloat(rate.numerator) : 0;
          denominatorSum += rate?.denominator
            ? parseFloat(rate.denominator)
            : 0;
        }
      });

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
