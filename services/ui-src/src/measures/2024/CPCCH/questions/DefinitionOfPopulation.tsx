import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";
import { useParams } from "react-router-dom";

export const DefinitionOfPopulation = () => {
  const register = useCustomRegister<FormData>();
  const { coreSetId } = useParams();

  // default options are set to medicaid
  let options = [
    {
      displayValue: "Medicaid (Title XIX)",
      value: "MedicaidTitleXIX",
    },
    {
      displayValue: "Medicaid-Expansion CHIP (Title XXI)",
      value: "MedicaidExpansionCHIP",
    },
  ];

  // if chip, set chip options
  if (coreSetId === "ACSC" || coreSetId === "CCSC") {
    options = [
      {
        displayValue: "Separate CHIP (Title XXI)",
        value: "MedicaidTitleXIX",
      },
    ];
  }

  return (
    <QMR.CoreQuestionWrapper
      testid="definition-of-population"
      label="Definition of Population Included in the Measure"
    >
      <CUI.Heading size="sm" as="h3" pb="3">
        Please select all populations that are included in the survey sample.
      </CUI.Heading>
      <QMR.Checkbox
        {...register("DefinitionOfSurveySample")}
        options={[
          ...options,
          {
            displayValue: "Other",
            value: "DefOfPopulationOther",
            children: [
              <QMR.TextArea
                formLabelProps={{ fontWeight: "400" }}
                label={"Define the Other survey population"}
                {...register("DefinitionOfSurveySample-Other")}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
