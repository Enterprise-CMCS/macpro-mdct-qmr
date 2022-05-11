import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  // eightNumbersOneDecimal,
  // rateThatAllowsFourDecimals,
  // rateThatAllowsOneDecimal,
  // allPositiveIntegersWith8Digits,
} from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";
import { IRate, rateCalculation } from "components";

interface Props extends QMR.InputWrapperProps {
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
}: // ...rest
Props) => {
  const {
    control,
    formState: { errors },
    unregister,
  } = useFormContext();

  const inputFieldNames = [
    "Number of Enrollee Months",
    "Discharges",
    "Discharges per 1,000 Enrollee Months",
    "Days",
    "Days per 1,000 Enrollee Months",
    "Average Length of Stay",
  ];

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  rates[rates.length - 1]["isTotal"] = true;

  /*
  On component render, verify that all NDRs have a label and isTotal value.
  This is required for accurate data representation in DB and to calculateTotals().
  */
  useEffect(() => {
    const prevRate = [...field.value];
    rates.forEach((rate, index) => {
      if (prevRate[index] === undefined) {
        prevRate[index] = inputFieldNames.map((label) => {
          return {
            name: label,
            value: undefined,
          };
        });
      }
      prevRate[index]["label"] = rate.label ?? undefined;
    });

    prevRate[prevRate.length - 1]["isTotal"] = true;

    field.onChange([...prevRate]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeRate = (
    qualIndex: number,
    fieldIndex: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string,
    isTotal?: boolean
  ) => {
    if (!allNumbers.test(newValue)) return;
    if (type === "rate" && readOnly) return;

    const prevRate = [...field.value];
    // const editRate = { ...prevRate[index] };
    // const validEditRate = eightNumbersOneDecimal.test(newValue);

    prevRate[qualIndex][fieldIndex].value = newValue;

    // Totals NDR should be independently editable
    if (!isTotal) {
      calculateTotals(prevRate);
    }

    field.onChange([...prevRate]);
  };

  const calculateRate = (num: number, denom: number) => {
    if (num !== null && denom !== null) {
      return num !== 0
        ? rateCalculation(num.toString(), denom.toString(), 1000, 1)
        : "0";
    } else {
      return "";
    }
  };

  /*
  Sum the values of all columns
  */
  const calculateTotals = (prevRate: any[]) => {
    let dischargeSum: any = null;
    let daySum: any = null;
    let numEnrolleeSum: any = null;
    let x;

    // sum all field values - we assume last row is total
    prevRate.slice(0, -1).forEach((item) => {
      if (item !== undefined && item !== null && !item["isTotal"]) {
        if (!isNaN((x = parseFloat(item[0].value)))) {
          numEnrolleeSum = numEnrolleeSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item[1].value)))) {
          dischargeSum = dischargeSum + x; // += syntax does not work if default value is null
        }
        if (!isNaN((x = parseFloat(item[3].value)))) {
          daySum = daySum + x; // += syntax does not work if default value is null
        }
      }
    });

    // Set total values and calculate total rate
    let totalIndex = prevRate.length - 1;
    let newValue = numEnrolleeSum !== null ? numEnrolleeSum.toString() : "";
    prevRate[totalIndex][0].value = newValue;

    newValue = dischargeSum !== null ? dischargeSum.toString() : "";
    prevRate[totalIndex][1].value = newValue;

    newValue = daySum !== null ? daySum.toString() : "";
    prevRate[totalIndex][3].value = newValue;

    // Discharges per 1,000 Enrollee Months
    prevRate[totalIndex][2].value = calculateRate(dischargeSum, numEnrolleeSum);

    // Days per 1,000 Enrollee Months
    prevRate[totalIndex][4].value = calculateRate(daySum, numEnrolleeSum);

    // Average Length of Stay
    if (dischargeSum !== null && daySum !== null) {
      prevRate[totalIndex][5].value =
        daySum !== 0
          ? rateCalculation(daySum.toString(), dischargeSum.toString(), 1, 1)
          : "0";
    } else {
      prevRate[totalIndex][5].value = "";
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
      {rates.map((qual, qualIndex) => {
        return (
          <CUI.Stack
            my={8}
            direction="column"
            className="iuhh-rate-stack"
            key={`iuhh-rate-stack-${qualIndex}`}
          >
            <CUI.Heading size={"md"} key={`${qual.label}-heading`}>
              {`${categoryName} ${qual.label?.toLowerCase()}`}
            </CUI.Heading>
            <CUI.Stack direction="row" key={`iuhh-field-stack-${qualIndex}`}>
              {inputFieldNames.map((ifn, fieldIndex) => {
                return (
                  <QMR.InputWrapper
                    isInvalid={
                      !!objectPath.get(errors, `${name}.${fieldIndex}.value`)
                        ?.message
                    }
                    key={`input-wrapper-${ifn}-${fieldIndex}`}
                    label={ifn}
                  >
                    <CUI.Input
                      key={`input-field-${fieldIndex}`}
                      value={
                        field.value?.[qualIndex]?.[fieldIndex]?.value ?? ""
                      }
                      data-cy={`${name}.${fieldIndex}.value`}
                      onChange={(e) =>
                        changeRate(
                          qualIndex,
                          fieldIndex,
                          "denominator",
                          e.target.value,
                          field.value[qualIndex].isTotal ?? false
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
