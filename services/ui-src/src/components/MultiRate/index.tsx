import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  sixteenNumbersFourDecimal,
  allPositiveIntegersWith10Digits,
} from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { IRate } from "components";
import { rateCalculation } from "components/Rate";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

export const MultiRate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 1000,
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
    defaultValue: rates,
  });

  // This is the basic structure of the NDR sets.
  // There are 4 rates, each is calculated by a combination of the other fields.
  const ndrForumlas = [
    {
      numerator: 1,
      denominator: 0,
      rateIndex: 2,
    },
    {
      numerator: 3,
      denominator: 0,
      rateIndex: 4,
    },
    {
      numerator: 1,
      denominator: 3,
      rateIndex: 5,
    },
    {
      numerator: 7,
      denominator: 6,
      rateIndex: 8,
    },
  ];

  // Quick reference list of all rate indices
  const rateLocations = ndrForumlas.map((ndr) => ndr.rateIndex);

  // Conditionally perform rate calculation
  const calculateRates = (prevRate: any, digitsAfterDecimal: number) => {
    ndrForumlas.forEach((ndr) => {
      const parsedNum = parseInt(prevRate[ndr.numerator]?.value);
      const parsedDenom = parseInt(prevRate[ndr.denominator]?.value);

      // Values empty or divide by 0
      if (
        isNaN(parsedNum) ||
        isNaN(parsedDenom) ||
        (parsedNum !== 0 && parsedDenom === 0)
      ) {
        prevRate[ndr.rateIndex]["value"] = "";

        // All 0
      } else if (parsedNum === 0 && parsedDenom === 0) {
        prevRate[ndr.rateIndex]["value"] = "0.0000";

        // Normal division
      } else {
        prevRate[ndr.rateIndex]["value"] = rateCalculation(
          prevRate[ndr.numerator].value,
          prevRate[ndr.denominator].value,
          rateMultiplicationValue,
          digitsAfterDecimal
        );
      }
    });
  };

  // Handle inputs and update conditionally perform rate calculation
  const changeRate = (index: number, newValue: string) => {
    const isRate = rateLocations.includes(index);
    if (isRate && readOnly) return;
    if (!allNumbers.test(newValue)) return;

    const digitsAfterDecimal = 4;
    const prevRate = [...field.value];
    const editRate = { ...prevRate[index] };

    let validValue;

    if (isRate || index === 3) {
      validValue = sixteenNumbersFourDecimal.test(newValue);
      editRate["value"] = validValue ? newValue : editRate["value"];
    } else {
      validValue = allPositiveIntegersWith10Digits.test(newValue);
      editRate["value"] = validValue ? newValue : editRate["value"];
    }

    prevRate[index] = {
      label: rates[index].label,
      ...editRate,
    };

    if (!isRate) {
      calculateRates(prevRate, digitsAfterDecimal);
    }
    field.onChange([...prevRate]);
  };

  // Given rate information, generate either an input field or a plain text value
  const generateInputs = (rate: IRate, index: number) => {
    const colorString = index % 2 === 0 ? "#FFF" : "#f5f5f5";
    return (
      <QMR.InputWrapper
        key={`input-wrapper-${index}`}
        label={rate.label}
        isInvalid={!!objectPath.get(errors, `${name}.${index}.value`)?.message}
        errorMessage={objectPath.get(errors, `${name}.${index}.value`)?.message}
        formControlProps={{
          backgroundColor: colorString,
          padding: "14px",
        }}
        {...rest}
      >
        {rateLocations.includes(index) && readOnly ? (
          <CUI.Text key={`rate-text-${index}`}>
            {field.value[index].value}
          </CUI.Text>
        ) : (
          <CUI.Input
            key={`input-field-${index}`}
            value={field.value[index]?.value ?? ""}
            data-cy={`${name}.${index}.value`}
            bgColor={"#FFF"}
            onChange={(e) => changeRate(index, e.target.value)}
          />
        )}
      </QMR.InputWrapper>
    );
  };

  // Programatically generate input warnings based on a provided NDR Formula
  // - if N > D show warning
  // - if R has less than 4 points of precision show warning
  // TODO: consider only calling this on unfocus
  // TODO: does "Count of Expected 30-Day Readmissions" require 4 decimals?
  const generateInputWarnings = (ndr: any, index: number) => {
    return (
      <CUI.Stack
        key={`warning-stack-${index}`}
        direction="column"
        width={"100%"}
        marginBottom={2}
      >
        {parseInt(field.value[ndr.numerator]?.value) >
          parseInt(field.value[ndr.denominator]?.value) && (
          <QMR.Notification
            key={`num-denom-warning-${index}`}
            alertTitle="Rate Error"
            // Identify the problematic fields using labels
            alertDescription={`"${field.value[ndr.numerator]?.label}": ${
              field.value[ndr.numerator]?.value
            } cannot be greater than "${
              field.value[ndr.denominator]?.label
            }": ${field.value[ndr.denominator]?.value}`}
            alertStatus="warning"
          />
        )}
        {field.value[ndr.rateIndex]?.value &&
          (!field.value[ndr.rateIndex].value.includes(".") ||
            field.value[ndr.rateIndex].value.split(".")[1]?.length < 4) && (
            <QMR.Notification
              key={`rate-decimal-warning-${index}`}
              alertTitle="Rate Error"
              // Identify the problematic fields using labels
              alertDescription={`"${
                field.value[ndr.rateIndex].label
              }" value must be a number with 4 decimal places: ${
                field.value[ndr.rateIndex].value
              }`}
              alertStatus="warning"
            />
          )}
      </CUI.Stack>
    );
  };

  return (
    <>
      <CUI.Stack my={8} direction="row">
        {rates.slice(0, 6).map((rate, index) => {
          return generateInputs(rate, index);
        })}
      </CUI.Stack>
      {ndrForumlas.slice(0, 3).map((ndr, index) => {
        return generateInputWarnings(ndr, index);
      })}
      <CUI.Divider />
      <CUI.Stack my={8} direction="row">
        {rates.slice(6).map((rate, index) => {
          index += 6;
          return generateInputs(rate, index);
        })}
      </CUI.Stack>
      {ndrForumlas.slice(3).map((ndr, index) => {
        return generateInputWarnings(ndr, index);
      })}
    </>
  );
};
