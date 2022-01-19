import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";

export const DataSource = () => {
  const methods = useFormContext<Measure.Form>();
  const register = useCustomRegister<Measure.Form>();
  const { watch } = methods;
  // Watch Checkboxes for DataSource Choices
  const watchOtherDataSource = watch("DataSource") ?? [];
  const watchAdminDataSource = watch("DataSource-Administrative") ?? [];
  // Return True or False based on if Other is selected or not
  const isOtherDataSource =
    watchOtherDataSource?.indexOf("Other Data Source") !== -1;
  const isOtherAdminDataSource =
    watchAdminDataSource?.indexOf("Administrative Data Other") !== -1;

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
                    ],
                  },
                ]}
                label="What is the Administrative Data Source?"
                formLabelProps={{ fontWeight: 700 }}
              />,
            ],
          },
          {
            displayValue: "Other Data Source",
            value: "Other Data Source",
            children: [
              <QMR.TextArea
                label="Describe the data source:"
                {...register("DataSource-Other")}
              />,
            ],
          },
        ]}
        label="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
      />
      {(isOtherAdminDataSource || isOtherDataSource) && (
        <CUI.Text
          fontSize="sm"
          py="2"
          fontWeight="bold"
          key="If the data source differed across"
        >
          For each data source selected above, describe which reporting entities
          used each data source (e.g., health plans, FFS). If the data source
          differed across health plans or delivery systems, identify the number
          of plans that used each data source:
        </CUI.Text>
      )}
      {/* This will be visible when Other is selected for the Admin Data Source */}
      {isOtherAdminDataSource && (
        <QMR.TextArea
          label={`Administrative Data Source: ${
            watch("DataSource-Administrative-Other") || ""
          }`}
          {...register("DataSource-Administrative-Other-Explanation")}
        />
      )}
      {/* This will be visible if Other is selected at the root of the data source question */}
      {isOtherDataSource && (
        <QMR.TextArea
          label={`Other Data Source: ${watch("DataSource-Other") || ""}`}
          {...register("DataSource-Other-Explanation")}
        />
      )}
    </QMR.CoreQuestionWrapper>
  );
};
