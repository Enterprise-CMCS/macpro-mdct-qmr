import * as QMR from "components";
// import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoMeasure/DemoFormType";

export const MeasurementSpecification = () => {
  const register = useCustomRegister<DemoForm.DemoFormType>();

  return (
    <QMR.CoreQuestionWrapper label="Measurement Specification">
      <QMR.RadioButton
        {...register("MeasurementSpecification")}
        options={[
          {
            displayValue:
              "Measurement Specification National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)",
            value: "NCQA/HEDIS",
            children: [
              <QMR.Select
                {...register("MeasurementSpecification-HEDISVersion")}
                label="Specify the version of HEDIS measurement year used:"
                placeholder="Select option"
                options={[
                  {
                    displayValue: "HEDIS MY 2020 (FFY 2021 Core Set Reporting)",
                    value: "HEDIS MY 2020 (FFY 2021 Core Set Reporting)",
                  },
                ]}
              />,
            ],
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
