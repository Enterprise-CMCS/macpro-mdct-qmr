import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";

export const DefinitionOfPopulation = () => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Definition of Population Included in the Measure">
      <CUI.Heading size="sm" as="h3">
        Definition of Population Included in the Survey Sample
      </CUI.Heading>
      <CUI.Text mt="3">
        Please select all populations that are included. At least one population
        must be selected. For example, if your data include both non-dual
        Medicaid and beneficiaries and Medicare and Medicaid Dual Eligibles,
        select both:
      </CUI.Text>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>Survey sample includes Medicaid population</CUI.ListItem>
        <CUI.ListItem>
          Survey sample includes Medicare and Medicaid Dually-Eligible
          population
        </CUI.ListItem>
      </CUI.UnorderedList>
      <QMR.Checkbox
        {...register("DefinitionOfSurveySample")}
        options={[
          {
            displayValue: "Survey sample includes Medicaid population",
            value: "SurveySampleIncMedicaidPop",
          },
          {
            displayValue:
              "Survey sample includes CHIP population (e.g. pregnant women)",
            value: "SurveySampleIncCHIP",
          },
          {
            displayValue:
              "Survey sample includes Medicare and Medicaid Dually-Eligible population",
            value: "SurveySampleIncMedicareMedicaidDualEligible",
          },
          {
            displayValue: "Other",
            value: "SurveySampleIncOther",
            children: [
              <QMR.TextInput
                formLabelProps={{ fontWeight: "400" }}
                label="Define the other denominator population:"
                {...register("DefinitionOfSurveySample-Other")}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
