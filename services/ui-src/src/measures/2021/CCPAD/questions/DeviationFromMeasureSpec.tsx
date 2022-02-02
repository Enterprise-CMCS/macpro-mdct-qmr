import * as QMR from "components";
import { Measure } from "../validation/types";
import { useCustomRegister } from "hooks/useCustomRegister";

export const defaultDeviationOptions = [
  { label: "Ages 18 to 64", id: 0 },
  { label: "Age 65 and older", id: 1 },
];

interface Props {
  options: { label: string; id: number }[];
  deviationConditions: {
    showEffectiveContraceptionThreeDaysPostPartum: boolean;
    showEffectiveContraceptionSixtyDaysPostPartum: boolean;
    showLongActingContraceptionThreeDaysPostPartum: boolean;
    showLongActingContraceptionSixtyDaysPostPartum: boolean;
    showOtherPerformanceMeasureRates: boolean;
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
  if (name.includes("3days")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showEffectiveContraceptionThreeDaysPostPartum &&
          option.id === 0) ||
        (deviationConditions.showEffectiveContraceptionSixtyDaysPostPartum &&
          option.id === 1)
      );
    });
  } else {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showLongActingContraceptionThreeDaysPostPartum &&
          option.id === 0) ||
        (deviationConditions.showLongActingContraceptionSixtyDaysPostPartum &&
          option.id === 1)
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
                // Dynamically hide or show children based on if performance measure 30days/age sections were completed
                options={[
                  ...(deviationConditions.showEffectiveContraceptionThreeDaysPostPartum ||
                  deviationConditions.showEffectiveContraceptionSixtyDaysPostPartum
                    ? [
                        {
                          value: "MostEffective",
                          displayValue:
                            "Most effective or moderately effective method of contraception",
                          children: [
                            <QMR.Checkbox
                              {...register("DeviationOptions-MostEffective")}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-MostEffective"),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  // Dynamically hide or show children based on if performance measure 7days/age sections were completed
                  ...(deviationConditions.showLongActingContraceptionThreeDaysPostPartum ||
                  deviationConditions.showLongActingContraceptionSixtyDaysPostPartum
                    ? [
                        {
                          value: "LongLasting",
                          displayValue:
                            "Long-acting reversible method of contraception (LARC)",
                          children: [
                            <QMR.Checkbox
                              {...register("DeviationOptions-LARC")}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-LARC"),
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
