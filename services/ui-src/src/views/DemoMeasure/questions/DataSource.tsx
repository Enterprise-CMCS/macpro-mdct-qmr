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
                options={[
                  {
                    displayValue:
                      "Medicaid Management Information System (MMIS)",
                    value: "Medicaid Management Information System (MMIS)",
                  },
                  {
                    displayValue: "Other",
                    value: "AdministrativeDataOther",
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
                        label={`Administrative Data Source: ${watch(
                          "dataSource.adminData.other.dataSource"
                        )}`}
                        {...register("dataSource.adminData.other.explain")}
                      />,
                    ],
                  },
                ]}
                label="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
              />,
            ],
          },
          {
            displayValue: "Other Data Source",
            value: "other data wource",
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
                key="Administrative Data Source data:"
                label={`Other Data Source: ${watch(
                  "dataSource.other.dataSource"
                )}`}
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
