import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Types from "shared/types";
import {
  DataSourceData,
  defaultData,
  defaultData2026AndBeyond,
  getDataSourceDisplayName,
  OptionNode,
} from "shared/types";
import { useFormContext, useWatch } from "react-hook-form";
import * as DC from "dataConstants";
import { cleanString } from "utils/cleanString";
import { parseLabelToHTML } from "utils/parser";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { AnyObject } from "types";
import { Alert } from "@cmsgov/design-system";
import { featuresByYear } from "utils/featuresByYear";

interface DataSourceProps {
  data?: DataSourceData;
  type?: string;
}

interface DataSourceCheckboxBuilderProps {
  data?: OptionNode[];
  label?: string;
  otherDataSourceWarning?: string;
  parentName?: string;
  type?: string;
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
const buildDataSourceOptions: DSCBFunc = ({
  data = [],
  otherDataSourceWarning,
  parentName,
  type,
}) => {
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
          label={parseLabelToHTML(node.hint!)}
          name={`${DC.DATA_SOURCE_SELECTIONS}.${adjustedParentName}.${DC.DESCRIPTION}`}
          key={`${DC.DATA_SOURCE_SELECTIONS}.${adjustedParentName}.${DC.DESCRIPTION}`}
        />
      );
    }

    if (
      (type === "adult" || type === "child") &&
      otherDataSourceWarning &&
      (node.value === DC.OTHER_DATA_SOURCE || node.value === DC.OTHER)
    ) {
      children.push(
        <CUI.Box mt="8">
          <Alert heading="Please Note" variation="warn">
            <CUI.Text>{otherDataSourceWarning}</CUI.Text>
          </Alert>
        </CUI.Box>
      );
    }

    if (node.alert) {
      children.push(
        <CUI.Box mt="8">
          <Alert heading="Please Note" variation="warn">
            <CUI.Text>{node.alert}</CUI.Text>
          </Alert>
        </CUI.Box>
      );
    }

    checkBoxOptions.push({
      value: cleanedNodeValue,
      displayValue: getDataSourceDisplayName(cleanedNodeValue),
      children,
    });
  }

  return checkBoxOptions;
};

const addHintLabel = (options: OptionNode[], labels: AnyObject) => {
  options.forEach((options) => {
    if (options.description)
      if (options.value === DC.ELECTRONIC_HEALTH_RECORDS && labels.ehrSrc) {
        options.hint = labels.ehrSrc;
      } else if (
        options.value === DC.ELECTRONIC_CLINIC_DATA_SYSTEMS &&
        labels.describeOptionalECDSDataSrc
      ) {
        options.hint = labels.describeOptionalECDSDataSrc;
      } else {
        options.hint = labels.describeDataSrc;
      }
    if (options.subOptions) {
      options.subOptions.forEach((subOption) => {
        addHintLabel(subOption.options, labels);
      });
    }
  });
};

const addLabelByType = (
  type: string,
  options: OptionNode[],
  labels: AnyObject
) => {
  options.forEach((options) => {
    if (labels?.[type]?.[options.value]) {
      options.alert = labels[type][options.value];
    }
    if (options.subOptions) {
      options.subOptions.forEach((subOption) => {
        addLabelByType(type, subOption.options, labels);
      });
    }
  });
};

/**
 * Fully built DataSource component
 */
export const DataSource = ({ data, type }: DataSourceProps) => {
  const { getValues } = useFormContext<Types.DataSource>();

  // Use year-appropriate default data
  const dataSourceData =
    data ||
    (featuresByYear.useDataCollectionMethod
      ? defaultData2026AndBeyond
      : defaultData);

  const watchDataSource = useWatch<Types.DataSource>({
    name: DC.DATA_SOURCE,
    defaultValue: getValues().DataSource,
  }) as string[] | undefined;
  const showExplanation = watchDataSource && watchDataSource.length >= 2;

  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  //adding hint label text recursively
  addHintLabel(dataSourceData.options, labels.DataSource);
  addLabelByType("warning", dataSourceData.options, labels.DataSource);

  const dataSourceLabel = featuresByYear.useDataCollectionMethod
    ? "Data Collection Method"
    : "Data Source";

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label={dataSourceLabel}>
      <div data-cy="data-source-options">
        <QMR.Checkbox
          key={DC.DATA_SOURCE}
          name={DC.DATA_SOURCE}
          label={dataSourceData.optionsLabel}
          options={buildDataSourceOptions({
            data: dataSourceData.options,
            otherDataSourceWarning: labels.DataSource.otherDataSourceWarning,
            type: type,
          })}
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
            {parseLabelToHTML(labels.DataSource.srcExplanationText)}
          </CUI.Text>
          <QMR.TextArea
            label={labels.DataSource.srcDescription!}
            key={DC.DATA_SOURCE_DESCRIPTION}
            name={DC.DATA_SOURCE_DESCRIPTION}
          />
        </CUI.VStack>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
