import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoQuestions/DemoFormType";
import { useFormContext } from "react-hook-form";

interface Props {
  options: QMR.RadioButtonOption[];
}

export const StatusOfDataReported = ({ options }: Props) => {
  const {
    formState: { errors },
  } = useFormContext<DemoForm.DemoFormType>();
  return (
    <CoreQuestionWrapper label="Status of Data Reported">
      <QMR.RadioButton
        {...useCustomRegister<DemoForm.DemoFormType>(
          "statusOfDataReporting.statusOfDataReporting"
        )}
        isInvalid={!!errors.statusOfDataReporting?.statusOfDataReporting}
        errorMessage={
          errors.statusOfDataReporting?.statusOfDataReporting?.message
        }
        options={options}
        label="What is the status of the data being reported?"
        formLabelProps={{ fontWeight: "bold" }}
      />
    </CoreQuestionWrapper>
  );
};
