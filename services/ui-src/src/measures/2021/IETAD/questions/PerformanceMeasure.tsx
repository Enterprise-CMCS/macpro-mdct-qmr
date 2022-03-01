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
    dataSourceWatch?.every((source) => source === "AdministrativeData") ?? true;

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
      The percentage of beneficiaries age 18 and older with a new episode of
      alcohol or other drug (AOD) abuse or dependence who received the following
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          Initiation of AOD Treatment: Percentage of beneficiaries who initiate
          treatment through an inpatient AOD admission, outpatient visit,
          intensive outpatient encounter, or partial hospitalization,
          telehealth, or medication assisted treatment within 14 days of the
          diagnosis.
        </CUI.ListItem>
        <CUI.ListItem>
          Engagement of AOD Treatment: Percentage of beneficiaries who initiated
          treatment and who were engaged in ongoing AOD treatment within 34 days
          of the initiation visit.
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
      {!rateReadOnly && (
        <CUI.Heading pt="1" size={"sm"}>
          Please review the auto-calculated rate and revise if needed.
        </CUI.Heading>
      )}
      <CUI.Text fontWeight="bold" my="5">
        Initiation of AOD Treatment: Alcohol Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Initiation-Alcohol")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Engagement of AOD Treatment: Alcohol Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Engagement-Alcohol")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Initiation of AOD Treatment: Opioid Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Initiation-Opioid")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Engagement of AOD Treatment: Opioid Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Engagement-Opioid")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Initiation of AOD Treatment: Other Drug Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Initiation-Other")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Engagement of AOD Treatment: Other Drug Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Engagement-Other")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Initiation of AOD Treatment: Total AOD Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Initiation-Total")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Engagement of AOD Treatment: Total AOD Abuse or Dependence
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-Engagement-Total")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
