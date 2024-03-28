import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as DC from "dataConstants";
import * as Types from "shared/types";

export const StatusOfData = () => {
  const register = useCustomRegister<Types.StatusOfData>();
  return (
    <QMR.CoreQuestionWrapper
      testid="status-of-data"
      label="Status of Data Reported"
    >
      <QMR.RadioButton
        {...register(DC.DATA_STATUS)}
        options={[
          {
            displayValue: "I am reporting provisional data.",
            value: DC.REPORTING_PROVISIONAL_DATA,
            children: [
              <QMR.TextArea
                {...register(DC.DATA_STATUS_PROVISIONAL_EXPLAINATION)}
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
