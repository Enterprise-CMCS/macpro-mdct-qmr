import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  sixteenNumbersFourDecimal,
  allPositiveIntegersWith10Digits,
} from "utils";
import * as QMR from "components";
import objectPath from "object-path";
import { IRate } from "components";
import { defaultRateCalculation } from "utils/rateFormulas";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  customMask?: RegExp;
}

export const PCRRate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
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
      rate: 2,
      multiplier: 100,
      rateDecimals: 4,
    },
    {
      numerator: 3,
      denominator: 0,
      rate: 4,
      multiplier: 100,
      rateDecimals: 4,
    },
    {
      numerator: 1,
      denominator: 3,
      rate: 5,
      multiplier: 1,
      rateDecimals: 4,
    },
    {
      numerator: 7,
      denominator: 6,
      rate: 8,
      multiplier: 1000,
      rateDecimals: 1,
    },
  ];

  // Quick reference list of all rate indices
  const rateLocations = ndrForumlas.map((ndr) => ndr.rate);

  // Conditionally perform rate calculation
  const calculateRates = (prevRate: any) => {
    ndrForumlas.forEach((ndr) => {
      const parsedNum = parseFloat(prevRate[ndr.numerator]?.value);
      const parsedDenom = parseFloat(prevRate[ndr.denominator]?.value);

      // Values empty or divide by 0
      if (
        isNaN(parsedNum) ||
        isNaN(parsedDenom) ||
        (parsedNum !== 0 && parsedDenom === 0)
      ) {
        prevRate[ndr.rate]["value"] = "";

        // All 0
      } else if (parsedNum === 0 && parsedDenom === 0) {
        prevRate[ndr.rate]["value"] = `0.${"0".repeat(ndr.rateDecimals)}`;

        // Normal division
      } else {
        prevRate[ndr.rate]["value"] = defaultRateCalculation(
          prevRate[ndr.numerator].value,
          prevRate[ndr.denominator].value,
          ndr.multiplier,
          ndr.rateDecimals
        );
      }
    });
  };

  // Handle inputs and update conditionally perform rate calculation
  const changeRate = (index: number, newValue: string) => {
    const isRate = rateLocations.includes(index);
    if (isRate && readOnly) return;
    if (!allNumbers.test(newValue)) return;

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
      calculateRates(prevRate);
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
            type="text"
            value={field.value[index]?.value ?? ""}
            data-cy={`${name}.${index}.value`}
            bgColor={"#FFF"}
            onChange={(e) => changeRate(index, e.target.value)}
          />
        )}
      </QMR.InputWrapper>
    );
  };

  // Show warning if provided field has less than specified points of precision
  const generateInputWarning = (ndrField: any, decimals: number) => {
    if (
      ndrField?.value &&
      (!ndrField.value.includes(".") ||
        ndrField.value.split(".")[1]?.length < decimals)
    )
      return (
        <QMR.Notification
          key={`${ndrField.label}-decimal-warning`}
          alertTitle="Value Error"
          // Identify the problematic field using labels
          alertDescription={`"${
            ndrField.label
          }" value must be a number with ${decimals} decimal ${
            decimals > 1 ? "places" : "place"
          }.`}
          alertStatus="warning"
        />
      );
    return;
  };

  const warnings = [2, 3, 4, 5]
    .map((i) => generateInputWarning(field?.value[i], 4))
    .filter((v) => v !== undefined);

  return (
    <CUI.Box>
      <CUI.Stack
        my={8}
        direction={{ base: "column", md: "row" }}
        className="multi-rate-print-stack"
      >
        {rates.slice(0, 6).map((rate, index) => {
          return generateInputs(rate, index);
        })}
      </CUI.Stack>
      {!!(warnings.length > 0) && (
        <CUI.Stack my={8} spacing={3} className="multi-rate-print-stack">
          {warnings}
        </CUI.Stack>
      )}
      <CUI.Divider />
      <CUI.Stack
        my={8}
        spacing={3}
        direction={{ base: "column", md: "row" }}
        className="multi-rate-print-stack"
      >
        {rates.slice(6).map((rate, index) => {
          index += 6;
          return generateInputs(rate, index);
        })}
      </CUI.Stack>
      {generateInputWarning(field?.value[8], 1)}
    </CUI.Box>
  );
};
