import * as QMR from "components";
import { Measure } from "../validation/types";
import { useCustomRegister } from "hooks/useCustomRegister";

export const defaultDeviationOptions = [
  { label: "Ages 18 to 64", id: 0 },
  { label: "Age 65 and older", id: 1 },
  { label: "Total Ages", id: 2 },
];

interface Props {
  options: { label: string; id: number }[];
  deviationConditions: {
    showInitAlcohol18To64: boolean;
    showEngageAlcohol18To64: boolean;
    showInitOpioid18To64: boolean;
    showEngageOpioid18To64: boolean;
    showInitOther18To64: boolean;
    showEngageOther18To64: boolean;
    showInitTotal18To64: boolean;
    showEngageTotal18To64: boolean;
    showInitAlcohol65Plus: boolean;
    showEngageAlcohol65Plus: boolean;
    showInitOpioid65Plus: boolean;
    showEngageOpioid65Plus: boolean;
    showInitOther65Plus: boolean;
    showEngageOther65Plus: boolean;
    showInitTotal65Plus: boolean;
    showEngageTotal65Plus: boolean;
  };
}

interface OptionProps extends Props {
  name: string;
}

const deviationOptions = ({
  options,
  name,
  deviationConditions,
}: OptionProps): QMR.CheckboxOption[] => {
  let filteredOptions: Props["options"];
  if (name.includes("InitAlcohol")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showInitAlcohol18To64 && option.id === 0) ||
        (deviationConditions.showInitAlcohol65Plus && option.id === 1)
      );
    });
  } else if (name.includes("EngageAlcohol")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showEngageAlcohol18To64 && option.id === 0) ||
        (deviationConditions.showEngageAlcohol65Plus && option.id === 1)
      );
    });
  } else if (name.includes("InitOpioid")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showInitOpioid18To64 && option.id === 0) ||
        (deviationConditions.showInitOpioid65Plus && option.id === 1)
      );
    });
  } else if (name.includes("EngageOpioid")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showEngageOpioid18To64 && option.id === 0) ||
        (deviationConditions.showEngageOpioid65Plus && option.id === 1)
      );
    });
  } else if (name.includes("InitOther")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showInitOther18To64 && option.id === 0) ||
        (deviationConditions.showInitOther65Plus && option.id === 1)
      );
    });
  } else if (name.includes("EngageOther")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showEngageOther18To64 && option.id === 0) ||
        (deviationConditions.showEngageOther65Plus && option.id === 1)
      );
    });
  } else if (name.includes("InitTotal")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showInitTotal18To64 && option.id === 0) ||
        (deviationConditions.showInitTotal65Plus && option.id === 1)
      );
    });
  } else {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showEngageTotal18To64 && option.id === 0) ||
        (deviationConditions.showEngageTotal65Plus && option.id === 1)
      );
    });
  }

  return filteredOptions.map((item) => {
    return {
      displayValue: item.label,
      value: `${item.id}-${item.label.replace(/ /g, "")}`,
      children: [
        <QMR.Checkbox
          name={`${name}.${item.id}.options`}
          key={`${name}.${item.id}.options`}
          options={[
            {
              displayValue: "Numerator",
              value: `${item.id}.Numerator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.numerator`}
                  key={`${name}.${item.id}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `${item.id}.Denominator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.denominator`}
                  key={`${name}.${item.id}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `${item.id}.Other`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.other`}
                  key={`${name}.${item.id}.other`}
                />,
              ],
            },
          ]}
        />,
      ],
    };
  });
};

export const DeviationFromMeasureSpec = ({
  options,
  deviationConditions,
}: Props) => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For example: deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "YesCalcDeviated",
            children: [
              <QMR.Checkbox
                {...register("DeviationOptions")}
                label="Select and explain the deviation(s):"
                options={[
                  ...(deviationConditions.showInitAlcohol18To64 ||
                  deviationConditions.showInitAlcohol65Plus
                    ? [
                        {
                          value: "ShowInitAlcohol",
                          displayValue:
                            "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-InitAlcohol-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-InitAlcohol"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showEngageAlcohol18To64 ||
                  deviationConditions.showEngageAlcohol65Plus
                    ? [
                        {
                          value: "ShowEngageAlcohol",
                          displayValue:
                            "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-EngageAlcohol-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-EngageAlcohol"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showInitOpioid18To64 ||
                  deviationConditions.showInitOpioid65Plus
                    ? [
                        {
                          value: "ShowInitOpioid",
                          displayValue:
                            "Initiation of AOD Treatment: Opioid Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-InitOpioid-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-InitOpioid"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showEngageOpioid18To64 ||
                  deviationConditions.showEngageOpioid65Plus
                    ? [
                        {
                          value: "ShowEngageOpioid",
                          displayValue:
                            "Engagement of AOD Treatment: Opioid Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-EngageOpioid-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-EngageOpioid"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showInitOther18To64 ||
                  deviationConditions.showInitOther65Plus
                    ? [
                        {
                          value: "ShowInitOther",
                          displayValue:
                            "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-InitOther-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-InitOther"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showEngageOther18To64 ||
                  deviationConditions.showEngageOther65Plus
                    ? [
                        {
                          value: "ShowEngageOther",
                          displayValue:
                            "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-EngageOther-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-EngageOther"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showEngageOpioid18To64 ||
                  deviationConditions.showEngageOpioid65Plus
                    ? [
                        {
                          value: "ShowEngageOpioid",
                          displayValue:
                            "Engagement of AOD Treatment: Opioid Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-EngageOpioid-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-EngageOpioid"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showInitTotal18To64 ||
                  deviationConditions.showInitTotal65Plus
                    ? [
                        {
                          value: "ShowInitTotal",
                          displayValue:
                            "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-InitTotal-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-InitTotal"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  ...(deviationConditions.showEngageTotal18To64 ||
                  deviationConditions.showEngageTotal65Plus
                    ? [
                        {
                          value: "ShowEngageTotal",
                          displayValue:
                            "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-EngageTotal-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-EngageTotal"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                ]}
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
