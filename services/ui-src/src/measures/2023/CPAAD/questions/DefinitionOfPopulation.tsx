import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

export const DefinitionOfPopulation = () => {
  return (
    <QMR.CoreQuestionWrapper
      testid="definition-of-population"
      label="Definition of Population Included in the Measure"
    >
      <CUI.Heading size="sm" as="h3">
        Definition of population included in the survey sample
      </CUI.Heading>
      <CUI.Text mt="3">
        Please select all populations that are included. For example, if your
        data include both non-dual Medicaid beneficiaries and Medicare and
        Medicaid Dual Eligibles, select both:
      </CUI.Text>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>Survey sample includes Medicaid population</CUI.ListItem>
        <CUI.ListItem>
          Survey sample includes Medicare and Medicaid Dually-Eligible
          population
        </CUI.ListItem>
      </CUI.UnorderedList>
      <QMR.Checkbox
        key={DC.DEFINITION_OF_SURVEY_SAMPLE}
        name={DC.DEFINITION_OF_SURVEY_SAMPLE}
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
                label="Specify:"
                key={DC.DEFINITION_OF_SURVEY_SAMPLE_OTHER}
                name={DC.DEFINITION_OF_SURVEY_SAMPLE_OTHER}
              />,
            ],
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
