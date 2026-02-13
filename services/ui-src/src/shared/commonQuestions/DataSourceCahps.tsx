import * as QMR from "components";
import { useContext } from "react";
import {
  DataSourceData,
  defaultData,
  defaultData2026AndBeyond,
} from "../types/TypeDataSourceCahps";
import { parseLabelToHTML } from "utils/parser";
import * as DC from "dataConstants";
import SharedContext from "shared/SharedContext";
import { Alert } from "@cmsgov/design-system";
import * as CUI from "@chakra-ui/react";
import { featuresByYear } from "utils/featuresByYear";

interface DataSourceProps {
  data?: DataSourceData;
  type?: string;
}

/**
 * Fully built DataSource component
 */
export const DataSourceRadio = ({ data, type }: DataSourceProps) => {
  const labels: any = useContext(SharedContext);

  // Use year-appropriate default data
  const dataSourceData =
    data ||
    (featuresByYear.useDataCollectionMethod
      ? defaultData2026AndBeyond
      : defaultData);

  const dataSourceLabel = featuresByYear.useDataCollectionMethod
    ? "Data Collection Method"
    : "Data Source";

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label={dataSourceLabel}>
      <QMR.RadioButton
        key={DC.DATA_SOURCE}
        name={DC.DATA_SOURCE}
        label={dataSourceData.optionsLabel}
        options={[
          {
            displayValue: "CAHPS 5.1H",
            value: "CAHPS 5.1H",
          },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                name="describeTheDataSource"
                label={parseLabelToHTML(
                  labels?.DataSourceCahps.describeDataSrc
                )}
                key="dataSourceOtherTextArea"
                formLabelProps={{
                  fontWeight: "normal",
                  fontSize: "normal",
                }}
              />,
              (type === "adult" || type === "child") &&
                labels?.DataSourceCahps.otherDataSourceWarning && (
                  <CUI.Box mt="8">
                    <Alert heading="Please Note" variation="warn">
                      <CUI.Text>
                        {labels.DataSourceCahps.otherDataSourceWarning}
                      </CUI.Text>
                    </Alert>
                  </CUI.Box>
                ),
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
