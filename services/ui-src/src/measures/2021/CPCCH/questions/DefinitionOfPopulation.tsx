import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

export const DefinitionOfPopulation = () => {
  return (
    <QMR.CoreQuestionWrapper label="Definition of Population Included in the Measure">
      <CUI.Heading size="sm" as="h3" pb="3">
        Definition of population included in the survey sample
      </CUI.Heading>
      <QMR.RadioButton
        key={DC.DEFINITION_OF_SURVEY_SAMPLE}
        name={DC.DEFINITION_OF_SURVEY_SAMPLE}
        options={[
          {
            displayValue:
              "Survey sample includes CHIP (Title XXI) population only",
            value: "SurveySampleiIncludesCHIPOnly",
          },
          {
            displayValue:
              "Survey sample includes Medicaid (Title XIX) population only",
            value: "SurveySampleIncludesMedicaidOnly",
          },
          {
            displayValue:
              "Survey sample includes CHIP (Title XXI) and Medicaid (Title XIX) populations, combined",
            value: "SurveySampleIncludesCHIPMedicaidCombined",
          },
          {
            displayValue:
              "Two sets of survey results submitted; survey samples include CHIP and Medicaid (Title XIX) populations, separately",
            value: "SurveySamplesIncludeCHIPAndMedicaidSeparately",
          },
        ]}
      />
      <QMR.TextArea
        label="If this measure has been reported by the state previously and there has been a change in the included population, please provide any available context below:"
        formControlProps={{ paddingTop: "15px" }}
        key={DC.DEFINITION_OF_SURVEY_SAMPLE_CHANGES}
        name={DC.DEFINITION_OF_SURVEY_SAMPLE_CHANGES}
      />
    </QMR.CoreQuestionWrapper>
  );
};
