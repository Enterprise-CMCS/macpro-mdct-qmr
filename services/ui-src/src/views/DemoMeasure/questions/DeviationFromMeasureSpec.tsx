import * as QMR from "components";
import { DemoForm } from "../DemoFormType";
import { useCustomRegister } from "hooks/useCustomRegister";

export const defaultDeviationRanges = [
  "Ages 18 to 64",
  "Ages 65 to 74",
  "Ages 75 to 84",
  "Age 85 and older",
];

interface Props {
  options: string[];
}

export const DeviationFromMeasureSpec = ({ options }: Props) => {
  const register = useCustomRegister<DemoForm.DemoFormType>();

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For Examples of deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "YesCalcDeviated",
            children: [
              <QMR.Checkbox
                {...register("DeviationOptions")}
                label="Select and explain the deviation(s):"
                formLabelProps={{ fontWeight: 600 }}
                options={options.map((rangeLabel, index) => {
                  return {
                    displayValue: rangeLabel,
                    value: `Deviation-Option${index}`,
                    children: [
                      <QMR.Checkbox
                        {...register(
                          `MeasureSpecDeviation-Option${index}` as "MeasureSpecDeviation-Option1"
                        )}
                        options={[
                          {
                            displayValue: "Numerator",
                            value: `Option${index}-Numerator`,
                            children: [
                              <QMR.TextArea
                                label="Explain"
                                {...register(
                                  `MeasureSpecDeviation-Option${index}-Numerator` as "MeasureSpecDeviation-Option1-Numerator"
                                )}
                              />,
                            ],
                          },
                          {
                            displayValue: "Denominator",
                            value: `Option${index}-Denominator`,
                            children: [
                              <QMR.TextArea
                                label="Explain"
                                {...register(
                                  `MeasureSpecDeviation-Option${index}-Denominator` as "MeasureSpecDeviation-Option1-Denominator"
                                )}
                              />,
                            ],
                          },
                          {
                            displayValue: "Other",
                            value: `Option${index}-Other`,
                            children: [
                              <QMR.TextArea
                                label="Explain"
                                {...register(
                                  `MeasureSpecDeviation-Option${index}-Other` as "MeasureSpecDeviation-Option1-Other"
                                )}
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  };
                })}
              />,
            ],
          },
          {
            displayValue:
              "No, the calculation of the measure does not deviate from the measure specification in any way.",
            value: "NoCalcDidNotDeviate",
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
