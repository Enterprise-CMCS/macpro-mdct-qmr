import * as QMR from "components";
import * as DC from "dataConstants";

export const DataSource = () => {
  return (
    <QMR.CoreQuestionWrapper testid="data-source" label="Data Source">
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
                label="Describe the Data Source:"
                key={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
                name={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
