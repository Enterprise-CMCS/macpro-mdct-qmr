import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import { useContext } from "react";
import { DataSourceData, defaultData } from "../types/TypeDataSourceCahps";
import { parseLabelToHTML } from "utils/parser";
import * as DC from "dataConstants";
import SharedContext from "shared/SharedContext";
import { Alert } from "@cmsgov/design-system";
import * as CUI from "@chakra-ui/react";

interface DataSourceProps {
  data?: DataSourceData;
  adultMeasure?: boolean;
  childMeasure?: boolean;
}

/**
 * Fully built DataSource component
 */
export const DataSourceRadio = ({
  data = defaultData,
  adultMeasure,
  childMeasure,
}: DataSourceProps) => {
  const register = useCustomRegister<Types.DataSource>();

  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label="Data Source">
      <QMR.RadioButton
        {...register(DC.DATA_SOURCE)}
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
              (adultMeasure || childMeasure) &&
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
