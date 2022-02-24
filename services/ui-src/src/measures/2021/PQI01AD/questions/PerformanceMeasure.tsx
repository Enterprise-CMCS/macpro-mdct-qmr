import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { useFormContext } from "react-hook-form";
import { positiveNumbersWithMaxDecimalPlaces } from "utils/numberInputMasks";

export const PerformanceMeasure = () => {
  const register = useCustomRegister<Measure.Form>();
  const { watch } = useFormContext<Measure.Form>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data."
    ) ?? true;

  const ageRates = [
    {
      label: "Ages 18 to 64",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
    {
      label: "Age 65 and older",
      denominator: "",
      numerator: "",
      rate: "",
      id: 2,
    },
  ];

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      Number of inpatient hospital admissions for diabetes short-term
      complications (ketoacidosis, hyperosmolarity, or coma) per 100,000
      beneficiary months for beneficiaries age 18 and older.
      <QMR.TextArea
        formControlProps={{ py: "4" }}
        label="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"
        {...register("PerformanceMeasure-Explanation")}
      />
      <CUI.Text fontWeight="bold">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      {!rateReadOnly && (
        <CUI.Heading pt="1" size={"sm"}>
          Please review the auto-calculated rate and revise if needed.
        </CUI.Heading>
      )}
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        rateMultiplicationValue={100000}
        customMask={positiveNumbersWithMaxDecimalPlaces(1)}
        {...register("PerformanceMeasure-AgeRates")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
