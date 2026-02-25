import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import SharedContext from "shared/SharedContext";
import { useContext } from "react";
import { Alert } from "@cmsgov/design-system";
import * as DC from "dataConstants";

interface DataSourceProps {
  type?: string;
}

export const DataSource = ({ type }: DataSourceProps) => {
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper
      testid="data-source"
      label="Data Collection Method"
    >
      <QMR.RadioButton
        formControlProps={{ paddingBottom: 4 }}
        label="Which version of the CAHPS survey was used for reporting?"
        formLabelProps={{ fontWeight: 700 }}
        key={DC.DATA_SOURCE_CAHPS_VERSION}
        name={DC.DATA_SOURCE_CAHPS_VERSION}
        options={[
          { displayValue: "CAHPS 5.1H", value: "CAHPS 5.1H" },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                label="Describe the data source:"
                key={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
                name={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
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
