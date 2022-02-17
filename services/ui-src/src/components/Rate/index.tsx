import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  eightNumbersOneDecimal,
  rateThatAllowsFourDecimals,
  rateThatAllowsOneDecimal,
  allPositiveIntegersWith8Digits,
} from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { useEffect } from "react";

export interface IRate {
  label?: string;
  id: number;
  isTotal?: boolean;
}

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  allowAnyRate?: boolean;
}

export const Rate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 100,
  allowAnyRate,
  ...rest
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  console.log({ rates, name });

  useEffect(() => {
    // Establish a total field
    const prevRate = [...field.value];
    rates.map((rate, index) => {
      if (prevRate[index] === undefined) {
        prevRate[index] = {
          // numerator: "",
          // denominator: "",
          // rate: "",
        };
      }
      prevRate[index]["isTotal"] = rate.isTotal ?? undefined;
    });
    field.onChange([...prevRate]);
  }, []);

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string,
    isTotal?: boolean
  ) => {
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
      prevRate[index] ??= {
        numerator: "",
        denominator: "",
        rate: "",
      };

      const regex = allowMultiple
        ? rateThatAllowsFourDecimals
        : rateThatAllowsOneDecimal;

      prevRate[index].rate =
        regex.test(newValue) || newValue === "" || allowAnyRate
          ? newValue
          : prevRate[index].rate;

      field.onChange([...prevRate]);
      return;
    }

    if (
      parseInt(editRate.denominator) &&
      editRate.numerator &&
      parseFloat(editRate.numerator) <= parseFloat(editRate.denominator)
    ) {
      editRate.rate = (
        (editRate.numerator / editRate.denominator) *
        rateMultiplicationValue
      )
        .toFixed(1)
        .toString();
    } else if (editRate.rate) {
      editRate.rate = "";
    }

    prevRate[index] = editRate;

    if (!isTotal) {
      calculateTotals(prevRate);
    }
    field.onChange([...prevRate]);
  };

  const calculateTotals = (prevRate: any[]) => {
    let numeratorSum = 0;
    let denominatorSum = 0;

    let totalIndex = undefined;

    prevRate.map((f, index) => {
      if (f !== undefined && f !== null && !f["isTotal"]) {
        numeratorSum += parseInt(f["numerator"]) || 0;
        denominatorSum += parseInt(f["denominator"]) || 0;
      } else {
        totalIndex = index;
      }
    });

    if (totalIndex) {
      prevRate[totalIndex]["numerator"] = numeratorSum;
      prevRate[totalIndex]["denominator"] = denominatorSum;
      if (numeratorSum <= denominatorSum) {
        prevRate[totalIndex]["rate"] = (
          (numeratorSum / denominatorSum) *
          rateMultiplicationValue
        )
          .toFixed(1)
          .toString();
      } else {
        prevRate[totalIndex]["rate"] = "";
      }
    }
  };

  return (
    <>
      {rates.map((rate, index) => {
        const isTotal = rate.isTotal ?? undefined;
        return (
          <CUI.Stack key={rate.id} my={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700} data-cy={rate.label}>
                {rate.label}
              </CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <QMR.InputWrapper
                label="Numerator"
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
                  value={field.value[index]?.numerator ?? ""}
                  data-cy={`${name}.${index}.numerator`}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value, isTotal)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label="Denominator"
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
                  value={field.value[index]?.denominator ?? ""}
                  data-cy={`${name}.${index}.denominator`}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value, isTotal)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label="Rate"
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  value={field.value[index]?.rate ?? ""}
                  data-cy={`${name}.${index}.rate`}
                  onChange={(e) =>
                    changeRate(index, "rate", e.target.value, isTotal)
                  }
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.HStack>
            {parseFloat(field.value[index]?.numerator) >
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
