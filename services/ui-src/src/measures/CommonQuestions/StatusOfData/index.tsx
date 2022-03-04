import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";

export const StatusOfData = () => {
  const register = useCustomRegister<Types.StatusOfData>();
  return (
    <QMR.CoreQuestionWrapper label="Status of Data Reported">
      <QMR.RadioButton
        {...register("DataStatus")}
        options={[
          {
            displayValue: "I am reporting provisional data.",
            value: "I am reporting provisional data.",
            children: [
              <QMR.TextArea
                {...register("DataStatus-ProvisionalExplanation")}
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
            value: "I am reporting final data.",
          },
        ]}
        label="What is the status of the data being reported?"
        formLabelProps={{ fontWeight: "bold" }}
      />
    </QMR.CoreQuestionWrapper>
  );
};
