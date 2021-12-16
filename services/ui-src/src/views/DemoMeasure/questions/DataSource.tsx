import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoMeasure/DemoFormType";

export const DataSource = () => {
  const methods = useFormContext();
  const register = useCustomRegister<DemoForm.DemoFormType>();
  const { watch } = methods;

  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <QMR.Checkbox
        {...register("DataSource")}
        options={[
          {
            displayValue: "Administrative Data",
            value: "I am reporting provisional data",
            children: [
              <QMR.Checkbox
                {...register("DataSource-Administrative")}
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
                      <QMR.TextArea
                        label="Describe the data source:"
                        {...register("DataSource-Administrative-Other")}
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
                        label={`Administrative Data Source: ${
                          watch("DataSource-Administrative-Other") || ""
                        }`}
                        {...register(
                          "DataSource-Administrative-Other-Explanation"
                        )}
                      />,
                    ],
                  },
                ]}
                label="What is the Administrative Data Source?"
                formLabelProps={{ fontWeight: 700 }}
              />,
            ],
          },
          {
            displayValue: "Hybird (Administrative and Medical Records Data)",
            value: "I am reporting hybrid",
            children: [
              <QMR.Checkbox
                {...register("DataSource-Hybrid")}
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
                      <QMR.TextArea
                        label="Describe the data source:"
                        {...register("DataSource-Hybrid-Other")}
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
                        label={`Hybrid (Administrative and Medical Records Data) Data Source: ${
                          watch("DataSource-Hybrid-Other") || ""
                        }`}
                        {...register("DataSource-Hybrid-Other-Explanation")}
                      />,
                    ],
                  },
                ]}
                label="What is the Administrative Data Source?"
                formLabelProps={{ fontWeight: 700 }}
              />,

              <QMR.RadioButton
                label="What is the Medical Records Data Source?"
                formLabelProps={{ fontWeight: 700, paddingTop: 5 }}
                {...register("DataSource-Hybrid-MedicalRecord-DataSoruce")}
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
            displayValue: "Electronic Health Records",
            value: "Electronic Health Records",
            children: [
              <QMR.TextArea
                label="Describe Electronic Health Records data source:"
                {...register("DataSource-ElectronicHealthRecords")}
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
                label={`Electronic Health Records Data Source: ${
                  watch("DataSource-ElectronicHealthRecords") || ""
                }`}
                {...register("DataSource-ElectronicHealthRecords-Explanation")}
              />,
            ],
          },
          {
            displayValue: "Other",
            value: "Other Data Source",
            children: [
              <QMR.TextArea
                label="Describe the data source:"
                {...register("DataSource-Other")}
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
                label={`Other Data Source: ${watch("DataSource-Other") || ""}`}
                {...register("DataSource-Other-Explanation")}
              />,
            ],
          },
        ]}
        label="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
      />
    </QMR.CoreQuestionWrapper>
  );
};
