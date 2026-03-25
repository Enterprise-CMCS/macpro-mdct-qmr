import * as QMR from "components";
import { Alert } from "@cmsgov/design-system";
import * as CUI from "@chakra-ui/react";
import SharedContext from "shared/SharedContext";
import { useContext } from "react";
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
        key={DC.DATA_SOURCE_CAHPS_VERSION}
        name={DC.DATA_SOURCE_CAHPS_VERSION}
        formControlProps={{ paddingBottom: 4 }}
        label="Which version of the CAHPS survey was used for reporting?"
        formLabelProps={{ fontWeight: 700 }}
        options={[
          { displayValue: "CAHPS 5.1H", value: "CAHPS 5.1H" },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                key={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
                name={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
                label={
                  <>
                    Describe the data collection method or data source (
                    <em>
                      text in this field is included in publicly-reported
                      state-specific comments
                    </em>
                    ):
                  </>
                }
              />,
              (type === "adult" || type === "child") &&
                labels.DataSource.otherDataSourceWarning && (
                  <CUI.Box mt="8">
                    <Alert heading="Please Note" variation="warn">
                      <CUI.Text>
                        {labels.DataSource.otherDataSourceWarning}
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
