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
      For beneficiaries ages 18 to 64, the number of acute inpatient and
      observation stays during the measurement year that were followed by an
      unplanned acute readmission for any diagnosis within 30 days and the
      predicted probability of an acute readmission. Data are reported in the
      following categories:
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>Count of Index Hospital Stays (IHS)</CUI.ListItem>
        <CUI.ListItem>Count of Observed 30-Day Readmissions</CUI.ListItem>
        <CUI.ListItem>Count of Expected 30-Day Readmissions</CUI.ListItem>
      </CUI.UnorderedList>
      <CUI.Box my={4}>
        For beneficiaries ages 18 to 64, states should also report the rate of
        beneficiaries who are identified as outliers based on high rates of
        inpatient and observation stays during the measurement year. Data are
        reported in the following categories:
      </CUI.Box>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          Count of Beneficiaries in Medicaid Population
        </CUI.ListItem>
        <CUI.ListItem>Number of Outliers</CUI.ListItem>
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
        Follow-up within 30 days of ED visit
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-30Days")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Follow-up within 7 days of ED visit
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-7Days")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
