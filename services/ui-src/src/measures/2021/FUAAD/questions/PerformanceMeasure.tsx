import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "measures/types";
import { useFormContext } from "react-hook-form";

export const PerformanceMeasure = () => {
  const register = useCustomRegister<Measure.Form>();
  const { watch } = useFormContext<Measure.Form>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be not readonly dependent on dataSoruce selections
  const rateReadOnly = !(
    dataSourceWatch?.includes("I am reporting provisional data") &&
    dataSourceWatch?.length > 1
  );

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
      Percentage of emergency department (ED) visits for beneficiaries age 18
      and older with a principal diagnosis of alcohol or other drug (AOD) abuse
      or dependence who had a follow-up visit for AOD abuse or dependence. Two
      rates are reported:
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          Percentage of ED visits for which the beneficiary received follow-up
          within 30 days of the ED visit (31 total days)
        </CUI.ListItem>
        <CUI.ListItem>
          Percentage of ED visits for which the beneficiary received follow-up
          within 7 days of the ED visit (8 total days)
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
