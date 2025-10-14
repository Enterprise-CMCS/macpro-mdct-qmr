import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import * as DC from "dataConstants";

export const DefinitionOfPopulation = () => {
  const { coreSetId } = useParams();

  // default options are set to medicaid
  let options = [
    {
      displayValue: "Medicaid (Title XIX)",
      value: "MedicaidTitleXIX",
    },
    {
      displayValue: "Title XXI-funded Medicaid Expansion CHIP",
      value: "MedicaidExpansionCHIP",
    },
  ];

  // if chip, set chip options
  if (coreSetId === "ACSC" || coreSetId === "CCSC") {
    options = [
      {
        displayValue: "Separate CHIP (Title XXI)",
        value: "SeparateCHIPTitleXXI",
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
        key={DC.DEFINITION_OF_SURVEY_SAMPLE}
        name={DC.DEFINITION_OF_SURVEY_SAMPLE}
        options={[
          ...options,
          {
            displayValue: "Other",
            value: "DefOfPopulationOther",
            children: [
              <QMR.TextArea
                formLabelProps={{ fontWeight: "400" }}
                label={"Define the Other survey population"}
                key={DC.DEFINITION_OF_SURVEY_SAMPLE_OTHER}
                name={DC.DEFINITION_OF_SURVEY_SAMPLE_OTHER}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
