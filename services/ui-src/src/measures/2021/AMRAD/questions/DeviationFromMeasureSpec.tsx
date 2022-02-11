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
    showPersistentAsthma19To50: boolean;
    showPersistentAsthma51To64: boolean;
    showPersistentAsthmaTotal: boolean;
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
  filteredOptions = [];
  if (name.includes("PersistentAsthma")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showPersistentAsthma19To50 && option.id === 0) ||
        (deviationConditions.showPersistentAsthma51To64 && option.id === 1) ||
        (deviationConditions.showPersistentAsthmaTotal && option.id === 2)
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
                  ...(deviationConditions.showPersistentAsthma19To50 ||
                  deviationConditions.showPersistentAsthma51To64 ||
                  deviationConditions.showPersistentAsthmaTotal
                    ? [
                        {
                          value: "ShowInitAlcohol",
                          displayValue:
                            "Beneficiaries identified as having persistent asthma",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "PerformanceMeasure-AgeRates-Persistent-Asthma"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register("DeviationFields-PersistentAsthma"),
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
