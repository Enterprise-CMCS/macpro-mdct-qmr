import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";

export const MeasurementSpecification = () => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Measurement Specification">
      <QMR.RadioButton
        {...register("MeasurementSpecification")}
        options={[
          {
            displayValue: "U.S. Office of Population Affairs (OPA)",
            value: "US-OPA",
          },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                textAreaProps={{ marginBottom: "10" }}
                {...register(
                  "MeasurementSpecification-OtherMeasurementSpecificationDescription"
                )}
                label="Describe the specifications that were used to calculate the measure and explain how they deviated from Core Set specifications:"
              />,
              <QMR.Upload
                label="If you need additional space to describe your state's methodology, please attach further documentation below."
                {...register(
                  "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload"
                )}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
