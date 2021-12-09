import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoMeasure/DemoFormType";

export const DataSource = () => {
  const methods = useFormContext();
  const { register, watch } = methods;

  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <QMR.Checkbox
        {...useCustomRegister<DemoForm.DemoFormType>(
          "dataSource.reporting.selections"
        )}
        options={[
          {
            displayValue: "Administrative Data",
            value: "I am reporting provisional data",
            children: [
              <QMR.Checkbox
                {...useCustomRegister<DemoForm.DemoFormType>(
                  "dataSource.adminData.selections"
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
                        key="Describe the data:"
                        {...register("dataSource.adminData.other.dataSource")}
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
                          watch("dataSource.adminData.other.dataSource") || ""
                        }`}
                        {...register("dataSource.adminData.other.explain")}
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
                {...useCustomRegister<any>("dataSource.hybrid.selections")}
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
                        {...register("dataSource.hybrid.other.dataSource")}
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
                          watch("dataSource.hybrid.other.dataSource") || ""
                        }`}
                        {...register("dataSource.hybrid.other.explain")}
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
                {...useCustomRegister<any>(
                  "dataSource.hybrid.medicalRecordDataSoruce"
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
                {...register("dataSource.electronicRecord.dataSource")}
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
                  watch("dataSource.electronicRecord.dataSource") || ""
                }`}
                {...register("dataSource.electronicRecord.explain")}
              />,
            ],
          },
          {
            displayValue: "Other",
            value: "other data source",
            children: [
              <QMR.TextInput
                label="Describe the data source:"
                key="Describe the data source:"
                {...register("dataSource.other.dataSource")}
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
                key="Other Data Source data:"
                label={`Other Data Source: ${
                  watch("dataSource.other.dataSource") || ""
                }`}
                {...register("dataSource.other.explain")}
              />,
            ],
          },
        ]}
        label="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
      />
    </QMR.CoreQuestionWrapper>
  );
};
