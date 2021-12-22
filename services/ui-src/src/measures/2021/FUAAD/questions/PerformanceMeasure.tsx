import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "measures/types";

export const PerformanceMeasure = () => {
  const register = useCustomRegister<Measure.Form>();

  const ageRates = [
    {
      label: "Test Label For Section",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
    {
      label: "Another Test Label",
      denominator: "",
      numerator: "",
      rate: "",
      id: 3,
    },
    {
      label: "Last Test Label",
      denominator: "",
      numerator: "",
      rate: "",
      id: 5,
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
      <QMR.Rate rates={ageRates} {...register("ageRates")} />
    </QMR.CoreQuestionWrapper>
  );
};
