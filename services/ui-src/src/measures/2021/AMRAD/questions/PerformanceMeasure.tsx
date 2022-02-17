import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { useFormContext } from "react-hook-form";

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

  // The intended "Total" N/D/R has a value isTotal: true that is used to display total values on QMR.Rate
  const ageRates = [
    {
      label: "Ages 19 to 50",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
    {
      label: "Ages 51 to 64",
      denominator: "",
      numerator: "",
      rate: "",
      id: 2,
    },
    {
      label: "Total (Ages 19 to 64)",
      denominator: "",
      numerator: "",
      rate: "",
      id: 3,
      isTotal: true,
    },
  ];

  // TODO: The Performance Measures should total automagically
  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      <CUI.Text my="5">
        The percentage of beneficiaries ages 19 to 64 who were identified as
        having persistent asthma and had a ratio of controller medications to
        total asthma medications of 0.50 or greater during the measurement year.
      </CUI.Text>
      <QMR.TextArea
        label="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"
        {...register("PerformanceMeasure-Explanation")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Persistent-Asthma")}
      />

      {/* Calculate totals */}
    </QMR.CoreQuestionWrapper>
  );
};
