import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";

export const DefinitionOfPopulation = ({ coresetId }: any) => {
  const register = useCustomRegister<FormData>();

  const ACSMOptions = [
    {
      displayValue: "Medicaid (Title XIX)",
      value: "Medicaid (Title XIX)",
    },
    {
      displayValue: "Medicaid-Expansion CHIP (Title XXI)",
      value: "SurveySampleIncCHIP",
    },
    {
      displayValue: "Individuals Dually Eligible for Medicare and Medicaid",
      value: "SurveySampleIncMedicareMedicaidDualEligible",
    },
    {
      displayValue: "Other",
      value: "Other",
      children: [
        <QMR.TextArea
          label="Define the Other survey population:"
          name="define-the-other-survey-population"
        />,
      ],
    },
  ];

  const ACSCOptions = [
    {
      displayValue: "Separate CHIP (Title XXI)",
      value: "Separate CHIP (Title XXI",
    },
    {
      displayValue: "Individuals Dually Eligible for Medicare and Medicaid",
      value: "Individuals Dually Eligible for Medicare and Medicaid",
    },
    {
      displayValue: "Other",
      value: "Other",
      children: [
        <QMR.TextArea
          label="Define the Other survey population:"
          name="define-the-other-survey-population"
        />,
      ],
    },
  ];

  return (
    <QMR.CoreQuestionWrapper
      testid="definition-of-population"
      label="Definition of Population Included in the Measure"
    >
      <CUI.Heading size="sm" as="h3">
        Definition of population included in the survey sample
      </CUI.Heading>
      <CUI.Text mt="3" mb="3">
        Please select all populations that are included. For example, if your
        survey sample includes both non-dual Medicaid (Title XIX) beneficiaries
        and Individuals Dually Eligible for Medicare and Medicaid, select both
        Medicaid (Title XIX) and Individuals Dually Eligible for Medicare and
        Medicaid. 
      </CUI.Text>

      <QMR.Checkbox
        {...register("DefinitionOfSurveySample")}
        options={coresetId === "ACSM" ? ACSMOptions : ACSCOptions}
      />
      {coresetId === "ACSM" && (
        <QMR.TextArea
          label="If this measure has been reported by the state previously and there has been a change in the included population, please provide any available context below:"
          formControlProps={{ paddingTop: "15px" }}
          {...register("DefinitionOfSurveySample-Changes")}
        />
      )}
    </QMR.CoreQuestionWrapper>
  );
};
