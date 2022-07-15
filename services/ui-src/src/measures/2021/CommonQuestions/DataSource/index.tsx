import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as QMR from "components";
import * as Types from "../types";
import { cleanString } from "utils/cleanString";
import { DataSourceData, defaultData, OptionNode } from "./data";
import { useCustomRegister } from "hooks/useCustomRegister";
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
        name={`${DC.DATA_SOURCE_SELECTIONS}.${parentName}.${DC.SELECTED}`}
        key={`${DC.DATA_SOURCE_SELECTIONS}.${parentName}.${DC.SELECTED}`}
        options={buildDataSourceOptions({ data, parentName })}
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
    const cleanedNodeValue = cleanString(node.value);
    const adjustedParentName = parentName
      ? `${parentName}-${cleanedNodeValue}`
      : cleanedNodeValue;
    let children: any = [];
    node.subOptions?.forEach((subOption: any, i) => {
      children = [
        ...children,
        ...buildDataSourceCheckboxOptionChildren({
          data: subOption.options,
          label: subOption.label,
          parentName: `${adjustedParentName}${i}`,
        }),
      ];
    });

    if (node.description) {
      children.push(
        <QMR.TextArea
          label="Describe the data source:"
          name={`${DC.DATA_SOURCE_SELECTIONS}.${adjustedParentName}.${DC.DESCRIPTION}`}
          key={`${DC.DATA_SOURCE_SELECTIONS}.${adjustedParentName}.${DC.DESCRIPTION}`}
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
  const watchDataSource = useWatch<Types.DataSource>({
    name: DC.DATA_SOURCE,
  }) as string[] | undefined;

  const showExplanation = watchDataSource && watchDataSource.length >= 2;

  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <div data-cy="data-source-options">
        <QMR.Checkbox
          {...register(DC.DATA_SOURCE)}
          label={data.optionsLabel}
          options={buildDataSourceOptions({ data: data.options })}
        />
      </div>
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
          <QMR.TextArea
            label="Data Source Description"
            {...register(DC.DATA_SOURCE_DESCRIPTION)}
          />
        </CUI.VStack>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
