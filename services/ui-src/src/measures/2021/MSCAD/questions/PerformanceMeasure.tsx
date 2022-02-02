import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";

export const PerformanceMeasure = () => {
  const register = useCustomRegister<Measure.Form>();

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
      The following components of this measure assess different facets of
      providing medical assistance with smoking and tobacco use cessation:
      <CUI.UnorderedList m="5" ml="10" spacing="5">
        <CUI.ListItem>
          <CUI.Text display="inline" fontWeight="600">
            Advising Smokers and Tobacco Users to Quit
          </CUI.Text>{" "}
          – A rolling average represents the percentage of beneficiaries age 18
          and older who were current smokers or tobacco users and who received
          advice to quit during the measurement year
        </CUI.ListItem>
        <CUI.ListItem>
          <CUI.Text display="inline" fontWeight="600">
            Discussing Cessation Medications
          </CUI.Text>{" "}
          – A rolling average represents the percentage of beneficiaries age 18
          and older who were current smokers or tobacco users and who discussed
          or were recommended cessation medications during the measurement year
        </CUI.ListItem>
        <CUI.ListItem>
          <CUI.Text display="inline" fontWeight="600">
            Discussing Cessation Strategies
          </CUI.Text>{" "}
          – A rolling average represents the percentage of beneficiaries age 18
          and older who were current smokers or tobacco users and who discussed
          or were provided cessation methods or strategies during the
          measurement year
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
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-30Days")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Follow-up within 7 days of ED visit
      </CUI.Text>
      <QMR.Rate
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-7Days")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
