import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";
import { DemoForm } from "views/DemoMeasure/DemoFormType";

export const Status = () => {
  const { register } = useFormContext();
  return (
    <QMR.CoreQuestionWrapper label="Status of Data Reported">
      <QMR.RadioButton
        {...useCustomRegister<DemoForm.DemoFormType>("statusOfData.status")}
        options={[
          {
            displayValue: "I am reporting provisional data",
            value: "I am reporting provisional data",
            children: [
              <QMR.TextArea
                {...register("statusOfData.statusOfDataAdditional")}
                label="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
                formLabelProps={{
                  fontWeight: "normal",
                  fontSize: "normal",
                }}
                key="status-2a"
              />,
            ],
          },
          {
            displayValue: "I am reporting final data",
            value: "I am reporting final data",
          },
        ]}
        label="What is the status of the data being reported?"
        formLabelProps={{ fontWeight: "bold" }}
      />
    </QMR.CoreQuestionWrapper>
  );
};
