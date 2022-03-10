import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";

export const DataSource = () => {
  const register = useCustomRegister<FormData>();

  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <QMR.RadioButton
        formControlProps={{ paddingBottom: 4 }}
        label="Which version of the CAHPS survey was used for reporting?"
        formLabelProps={{ fontWeight: 700 }}
        {...register("DataSource-CAHPS-Version")}
        options={[
          { displayValue: "CAHPS 5.1H", value: "CAHPS 5.1H" },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                label="Describe the Data Source:"
                {...register("DataSource-CAHPS-Version-Other")}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
