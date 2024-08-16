import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";

interface DefOfDenomOption {
  displayValue: string;
  value: string;
}
interface CoreSetSpecificOptions {
  [coreSetId: string]: {
    options: DefOfDenomOption[];
    helpText: string;
  };
}

export const DefinitionOfPopulation = ({ coreSetId }: any) => {
  const register = useCustomRegister<FormData>();

  const coreSetSpecificOptions: CoreSetSpecificOptions = {
    ACSM: {
      options: [
        {
          displayValue: "Medicaid (Title XIX)",
          value: "Medicaid (Title XIX)",
        },
        {
          displayValue: "Individuals Dually Eligible for Medicare and Medicaid",
          value: "SurveySampleIncMedicareMedicaidDualEligible",
        },
      ],
      helpText:
        "Please select all populations that are included in the survey sample. For example, if your survey sample includes both non-dual Medicaid (Title XIX) beneficiaries and Individuals Dually Eligible for Medicare and Medicaid, select both Medicaid population (Title XIX) and Individuals Dually Eligible for Medicare and Medicaid.",
    },
    ACSC: {
      options: [
        {
          displayValue: "Separate CHIP (Title XXI)",
          value: "Separate CHIP (Title XXI)",
        },
        {
          displayValue: "Individuals Dually Eligible for Medicare and Medicaid",
          value: "Individuals Dually Eligible for Medicare and Medicaid",
        },
      ],
      helpText:
        "Please select all populations that are included in the survey sample. For example, if your survey sample includes both Separate CHIP (Title XXI) beneficiaries and Individuals Dually Eligible for Medicare and Medicaid, select both Separate CHIP (Title XXI) and Individuals Dually Eligible for Medicare and Medicaid.",
    },
  };

  return (
    <QMR.CoreQuestionWrapper
      testid="definition-of-population"
      label="Definition of Population Included in the Measure"
    >
      <CUI.Heading size="sm" as="h3">
        Definition of denominator
      </CUI.Heading>
      <CUI.Text mt="3" mb="3">
        {coreSetSpecificOptions[coreSetId].helpText}
      </CUI.Text>

      <QMR.Checkbox
        {...register("DefinitionOfSurveySample")}
        options={[
          ...coreSetSpecificOptions[coreSetId].options,
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
        ]}
      />
      {coreSetId === "ACSM" && (
        <QMR.TextArea
          label="If this measure has been reported by the state previously and there has been a change in the included population, please provide any available context below:"
          formControlProps={{ paddingTop: "15px" }}
          {...register("DefinitionOfSurveySample-Changes")}
        />
      )}
    </QMR.CoreQuestionWrapper>
  );
};
