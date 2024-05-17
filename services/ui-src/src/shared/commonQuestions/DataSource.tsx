import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import { DataSourceData, defaultData, OptionNode } from "shared/types";
import { useFormContext, useWatch } from "react-hook-form";
import * as DC from "dataConstants";
import { cleanString } from "utils/cleanString";
import { parseLabelToHTML } from "utils/parser";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { AnyObject } from "types";
import { Alert } from "@cmsgov/design-system";

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
          label={parseLabelToHTML(node.hint!)}
          name={`${DC.DATA_SOURCE_SELECTIONS}.${adjustedParentName}.${DC.DESCRIPTION}`}
          key={`${DC.DATA_SOURCE_SELECTIONS}.${adjustedParentName}.${DC.DESCRIPTION}`}
        />,
        <CUI.Box mt="8">
          <Alert heading="Please Note" variation="warn">
            <p className="ds-c-alert__text">
              {
                "If you report using Other Data Source, CMS will not be able to produce a combined Medicaid & CHIP rate for public reporting. If the information reported in the Data Source field is accurate, please continue reporting this measure."
              }
            </p>
          </Alert>
        </CUI.Box>
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

const addHintLabel = (options: OptionNode[], labels: AnyObject) => {
  options.forEach((options) => {
    if (options.description)
      options.hint =
        options.value === DC.ELECTRONIC_HEALTH_RECORDS && labels.ehrSrc
          ? labels.ehrSrc!
          : labels.describeDataSrc!;

    if (options.subOptions) {
      options.subOptions.forEach((subOption) => {
        addHintLabel(subOption.options, labels);
      });
    }
  });
};

/**
 * Fully built DataSource component
 */
export const DataSource = ({ data = defaultData }: DataSourceProps) => {
  const register = useCustomRegister<Types.DataSource>();
  const { getValues } = useFormContext<Types.DataSource>();
  const watchDataSource = useWatch<Types.DataSource>({
    name: DC.DATA_SOURCE,
    defaultValue: getValues().DataSource,
  }) as string[] | undefined;

  const showExplanation = watchDataSource && watchDataSource.length >= 2;

  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  //adding hint label text recursively
  addHintLabel(data.options, labels.DataSource);

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label="Data Source">
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
            label={labels.DataSource.srcExplanationText}
          >
            {labels.DataSource.srcExplanationText}
          </CUI.Text>
          <QMR.TextArea
            label={labels.DataSource.srcDescription!}
            {...register(DC.DATA_SOURCE_DESCRIPTION)}
          />
        </CUI.VStack>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
