import * as QMR from "components";
import * as DC from "dataConstants";

export const StatusOfData = () => {
  return (
    <QMR.CoreQuestionWrapper label="Status of Data Reported">
      <QMR.RadioButton
        name={DC.DATA_STATUS}
        key={DC.DATA_STATUS}
        options={[
          {
            displayValue: "I am reporting provisional data.",
            value: DC.REPORTING_PROVISIONAL_DATA,
            children: [
              <QMR.TextArea
                name={DC.DATA_STATUS_PROVISIONAL_EXPLAINATION}
                key={DC.DATA_STATUS_PROVISIONAL_EXPLAINATION}
                label="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
                formLabelProps={{
                  fontWeight: "normal",
                  fontSize: "normal",
                }}
              />,
            ],
          },
          {
            displayValue: "I am reporting final data.",
            value: DC.REPORTING_FINAL_DATA,
          },
        ]}
        label="What is the status of the data being reported?"
        formLabelProps={{ fontWeight: "bold" }}
      />
    </QMR.CoreQuestionWrapper>
  );
};
