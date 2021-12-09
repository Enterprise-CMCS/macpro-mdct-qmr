import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoMeasure/DemoFormType";

export const DataSource = () => {
  const methods = useFormContext();
  const { watch } = methods;

  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <QMR.Checkbox
        {...useCustomRegister<DemoForm.DemoFormType>("DataSource")}
        options={[
          {
            displayValue: "Administrative Data",
            value: "I am reporting provisional data",
            children: [
              <QMR.Checkbox
                {...useCustomRegister<DemoForm.DemoFormType>(
                  "DataSource-Administrative"
                )}
                key="Administrative data"
                options={[
                  {
                    displayValue:
                      "Medicaid Management Information System (MMIS)",
                    value: "Medicaid Management Information System (MMIS)",
                  },
                  {
                    displayValue: "Other",
                    value: "Administrative Data Other",
                    children: [
                      <QMR.TextInput
                        label="Describe the data:"
                        key="DataSource-Administrative-Other"
                        {...useCustomRegister(
                          "DataSource-Administrative-Other"
                        )}
                      />,
                      <CUI.Text
                        fontSize="sm"
                        py="2"
                        fontWeight="bold"
                        key="If the data source differed across"
                      >
                        If the data source differed across health plans or
                        delivery systems, identify the number of plans that used
                        each data source:
                      </CUI.Text>,
                      <QMR.TextArea
                        key="DataSource-Administrative-Other-Explaination"
                        label={`Administrative Data Source: ${
                          watch("DataSource-Administrative-Other") || ""
                        }`}
                        {...useCustomRegister(
                          "DataSource-Administrative-Other-Explaination"
                        )}
                      />,
                    ],
                  },
                ]}
                label="What is the Administrative Data Source"
                formLabelProps={{ fontWeight: 700 }}
              />,
            ],
          },
          {
            displayValue: "Hybird (Administrative and Medical Record Data)",
            value: "I am reporting hybrid",
            children: [
              <QMR.Checkbox
                {...useCustomRegister<DemoForm.DemoFormType>(
                  "DataSource-Hybrid"
                )}
                key="Hybrid data"
                options={[
                  {
                    displayValue:
                      "Medicaid Management Information System (MMIS)",
                    value: "Medicaid Management Information System (MMIS)",
                  },
                  {
                    displayValue: "Other",
                    value: "Hybrid Data Other",
                    children: [
                      <QMR.TextInput
                        label="Describe the data:"
                        key="Describe the data:"
                        {...useCustomRegister("DataSource-Hybrid-Other")}
                      />,
                      <CUI.Text
                        fontSize="sm"
                        py="2"
                        fontWeight="bold"
                        key="If the data source differed across"
                      >
                        If the data source differed across health plans or
                        delivery systems, identify the number of plans that used
                        each data source:
                      </CUI.Text>,
                      <QMR.TextArea
                        key="Administrative Data Source:"
                        label={`Administrative Data Source: ${
                          watch("DataSource-Hybrid-Other") || ""
                        }`}
                        {...useCustomRegister(
                          "DataSource-Hybrid-Other-Explaination"
                        )}
                      />,
                    ],
                  },
                ]}
                label="What is the Administrative Data Source"
                formLabelProps={{ fontWeight: 700 }}
              />,

              <QMR.RadioButton
                label="What is the Medical Records Data Source"
                formLabelProps={{ fontWeight: 700, paddingTop: 5 }}
                key="Hybrid Radio Button Data"
                {...useCustomRegister<DemoForm.DemoFormType>(
                  "DataSource-Hybrid-MedicalRecord-DataSoruce"
                )}
                options={[
                  {
                    displayValue: "Electronic Health Record (EHR) Data",
                    value: "Electronic Health Record",
                  },
                  {
                    displayValue: "Paper",
                    value: "Paper",
                  },
                  {
                    displayValue: "Both (EHR and Paper)",
                    value: "Both EHR and Paper",
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: "Electronic Health Record",
            value: "electron health record",
            children: [
              <QMR.TextInput
                label="Describe Electronic Record data source:"
                key="Describe the electronic data source:"
                {...useCustomRegister("DataSource-ElectronicRecord-DataSource")}
              />,
              <CUI.Text
                fontSize="sm"
                py="2"
                fontWeight="bold"
                key="If the data source differed across data"
              >
                If the data source differed across health plans or delivery
                systems, identify the number of plans that used each data
                source:
              </CUI.Text>,
              <QMR.TextArea
                key="Electronic Record Data Source data:"
                label={`Electronic Record Data Source: ${
                  watch("DataSource-ElectronicRecord-DataSource") || ""
                }`}
                {...useCustomRegister(
                  "DataSource-ElectronicRecord-Explaination"
                )}
              />,
            ],
          },
          {
            displayValue: "Other",
            value: "Other Data Source",
            children: [
              <QMR.TextInput
                label="Describe the data source:"
                key="DataSource-Other"
                {...useCustomRegister("DataSource-Other")}
              />,
              <CUI.Text
                fontSize="sm"
                py="2"
                fontWeight="bold"
                key="If the data source differed across data"
              >
                If the data source differed across health plans or delivery
                systems, identify the number of plans that used each data
                source:
              </CUI.Text>,
              <QMR.TextArea
                key="DataSource-Other-Explaination"
                label={`Other Data Source: ${watch("DataSource-Other") || ""}`}
                {...useCustomRegister("DataSource-Other-Explaination")}
              />,
            ],
          },
        ]}
        label="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
      />
    </QMR.CoreQuestionWrapper>
  );
};
