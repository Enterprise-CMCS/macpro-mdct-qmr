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

export interface IRate {
  label?: string;
  id: number;
}

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

export const Rate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 100,
  customMask,
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

  const rateCalculation = (
    numerator: string,
    denominator: string,
    rateMultiplicationValue: number
  ) => {
    const floatNumerator = parseFloat(numerator);
    const floatDenominator = parseFloat(denominator);
    const floatRate = floatNumerator / floatDenominator;
    const roundedRate: number =
      Math.round(floatRate * rateMultiplicationValue * 10) / 10;
    const stringRate = roundedRate.toFixed(1).toString();
    return stringRate;
  };

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string
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
        regex.test(newValue) || newValue === "" || customMask?.test(newValue)
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
      editRate.rate = rateCalculation(
        editRate.numerator,
        editRate.denominator,
        rateMultiplicationValue
      );
    } else if (editRate.rate) {
      editRate.rate = "";
    }
    prevRate[index] = {
      label: rates[index].label,
      ...editRate,
    };
    field.onChange([...prevRate]);
  };

  return (
    <>
      {rates.map((rate, index) => {
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
                    changeRate(index, "numerator", e.target.value)
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
                    changeRate(index, "denominator", e.target.value)
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
                  onChange={(e) => changeRate(index, "rate", e.target.value)}
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
