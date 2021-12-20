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
  ageRanges: string[];
}

export const DeviationFromMeasureSpec = ({ ageRanges }: Props) => {
  const register = useCustomRegister<DemoForm.DemoFormType>();

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For Examples of deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "YesCalcDeviated",
            children: [
              <QMR.Checkbox
                {...register("DeviationAgeGroups")}
                options={ageRanges.map((rangeLabel) => {
                  const formLabel = rangeLabel.replace(/ /g, "");
                  return {
                    displayValue: rangeLabel,
                    value: `Deviation-${formLabel}`,
                    children: [
                      <QMR.Checkbox
                        {...register(
                          `MeasureSpecDeviation-${formLabel}` as "MeasureSpecDeviation-ageRange"
                        )}
                        options={[
                          {
                            displayValue: "Numerator",
                            value: `${formLabel}-Numerator`,
                            children: [
                              <QMR.TextArea
                                label="Explain"
                                {...register(
                                  `MeasureSpecDeviation-${formLabel}-Numerator` as "MeasureSpecDeviation-ageRange-Numerator"
                                )}
                              />,
                            ],
                          },
                          {
                            displayValue: "Denominator",
                            value: `${formLabel}-Denominator`,
                            children: [
                              <QMR.TextArea
                                label="Explain"
                                {...register(
                                  `MeasureSpecDeviation-${formLabel}-Denominator` as "MeasureSpecDeviation-ageRange-Denominator"
                                )}
                              />,
                            ],
                          },
                          {
                            displayValue: "Other",
                            value: `${formLabel}-Other`,
                            children: [
                              <QMR.TextArea
                                label="Explain"
                                {...register(
                                  `MeasureSpecDeviation-${formLabel}-Other` as "MeasureSpecDeviation-ageRange-Other"
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
