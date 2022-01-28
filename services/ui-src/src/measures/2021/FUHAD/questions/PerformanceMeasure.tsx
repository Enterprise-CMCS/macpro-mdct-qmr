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
      The percentage of discharges for beneficiaries age 18 and older who were
      hospitalized for treatment of selected mental illness or intentional
      self-harm diagnoses and who had a follow-up visit with a mental health
      provider. Two rates are reported:
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          Percentage of discharges for which the beneficiary received follow-up
          within 30 days of discharge
        </CUI.ListItem>
        <CUI.ListItem>
          Percentage of discharges for which the beneficiary received follow-up
          within 7 days of discharge
        </CUI.ListItem>
      </CUI.UnorderedList>
      <QMR.TextArea
        label="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"
        {...register("PerformanceMeasure-Explanation")}
      />
      <CUI.Text fontWeight="bold">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      <CUI.Text fontWeight="bold" my="5">
        Follow-up within 30 days after discharge
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-30Days")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Follow-up within 7 days after discharge
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-7Days")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
