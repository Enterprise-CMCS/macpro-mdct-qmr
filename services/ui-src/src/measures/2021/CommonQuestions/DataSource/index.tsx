import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import { DataSourceData, defaultData, OptionNode } from "./data";
import { useWatch } from "react-hook-form";

interface DataSourceProps {
  data?: DataSourceData;
}

interface DataSourceCheckboxBuilderProps {
  data?: OptionNode[];
  label?: string;
  parentName?: string;
}

type DSCBFunc = ({
  data,
}: DataSourceCheckboxBuilderProps) => QMR.CheckboxOption[];

type DSCBChildFunc = ({
  data,
}: DataSourceCheckboxBuilderProps) => React.ReactElement[];

/**
 * Build child checkboxes for data source options
 */
const buildDataSourceCheckboxOptionChildren: DSCBChildFunc = ({
  data,
  label,
  parentName,
}) => {
  const elements: React.ReactElement[] = [];
  if (data?.length) {
    elements.push(
      <QMR.Checkbox
        label={label}
        name={`DataSourceSelections.${parentName}.selected`}
        key={`DataSourceSelections.${parentName}.selected`}
        options={buildDataSourceOptions({ data: data, parentName })}
      />
    );
  }
  return elements;
};

/**
 * Build Data Source checkbox options, and possible child checkbox children
 */
const buildDataSourceOptions: DSCBFunc = ({ data = [], parentName }) => {
  const checkBoxOptions: QMR.CheckboxOption[] = [];

  for (const node of data) {
    const cleanedNodeValue = node.value.replace(/[^\w]/g, "");
    const adjustedParentName = parentName
      ? `${parentName}-${cleanedNodeValue}`
      : cleanedNodeValue;
    const children = [
      ...buildDataSourceCheckboxOptionChildren({
        data: node.subOptions?.options,
        label: node.subOptions?.label,
        parentName: adjustedParentName,
      }),
    ];

    if (node.description) {
      children.push(
        <QMR.TextArea
          label="Describe the data source:"
          name={`DataSourceSelections.${adjustedParentName}.descriptions`}
          key={`DataSourceSelections.${adjustedParentName}.descriptions`}
        />
      );
    }

    checkBoxOptions.push({
      value: cleanedNodeValue,
      displayValue: node.value,
      children,
    });
  }

  return checkBoxOptions;
};

/**
 * Fully built DataSource component
 */
export const DataSource = ({ data = defaultData }: DataSourceProps) => {
  const register = useCustomRegister<Types.DataSource>();
  const watchDataSource = useWatch<Types.DataSource>({ name: "DataSource" }) as
    | string[]
    | undefined;

  const showExplanation = watchDataSource && watchDataSource.length >= 2;

  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <QMR.Checkbox
        {...register("DataSource")}
        label={data.optionsLabel}
        options={buildDataSourceOptions({ data: data.options })}
      />
      {showExplanation && (
        <CUI.VStack key={"DataSourceExplanationWrapper"}>
          <CUI.Text
            fontSize="sm"
            py="2"
            fontWeight="bold"
            key="If the data source differed across"
          >
            For each data source selected above, describe which reporting
            entities used each data source (e.g., health plans, FFS). If the
            data source differed across health plans or delivery systems,
            identify the number of plans that used each data source:
          </CUI.Text>
          <QMR.TextArea {...register("DataSourceDescription")} />
        </CUI.VStack>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
