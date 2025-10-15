import * as QMR from "components";
import { useContext } from "react";
import { DataSourceData, defaultData } from "../types/TypeDataSourceCahps";
import { parseLabelToHTML } from "utils/parser";
import * as DC from "dataConstants";
import SharedContext from "shared/SharedContext";
import { Alert } from "@cmsgov/design-system";
import * as CUI from "@chakra-ui/react";

interface DataSourceProps {
  data?: DataSourceData;
  type?: string;
}

/**
 * Fully built DataSource component
 */
export const DataSourceRadio = ({
  data = defaultData,
  type,
}: DataSourceProps) => {
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label="Data Source">
      <QMR.RadioButton
        key={DC.DATA_SOURCE}
        name={DC.DATA_SOURCE}
        label={data.optionsLabel}
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
