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
    showModeratelyRates: boolean;
    showOtherPerformanceMeasureRates: boolean;
    showReversibleRates: boolean;
  };
}

export const DeviationFromMeasureSpec = ({ deviationConditions }: Props) => {
  const register = useCustomRegister<Measure.Form>();

  const deviationsToShow: QMR.CheckboxOption[] = [];
  if (deviationConditions.showModeratelyRates) {
    deviationsToShow.push({
      value: "moderate-method-deviation",
      displayValue:
        "Most effective or moderately effective method of contraception",
    });
  }
  if (deviationConditions.showReversibleRates) {
    deviationsToShow.push({
      value: "reversible-method-deviation",
      displayValue: "Long-acting reversible method of contraception (LARC)",
    });
  }

  const deviationsToRender = deviationsToShow.map((deviation) => ({
    ...deviation,
    children: [
      <QMR.Checkbox
        name={`${deviation.value}.options`}
        key={`${deviation.value}.options`}
        options={[
          {
            displayValue: "Numerator",
            value: `${deviation.value}-Numerator`,
            children: [
              <QMR.TextArea
                label="Explain:"
                name={`${deviation.value}.explain.numerator`}
                key={`${deviation.value}.explain.numerator`}
              />,
            ],
          },
          {
            displayValue: "Denominator",
            value: `${deviation.value}-Denominator`,
            children: [
              <QMR.TextArea
                label="Explain:"
                name={`${deviation.value}.explain.denominator`}
                key={`${deviation.value}.explain.denominator`}
              />,
            ],
          },
          {
            displayValue: "Other",
            value: `${deviation.value}-Other`,
            children: [
              <QMR.TextArea
                label="Explain:"
                name={`${deviation.value}.explain.other`}
                key={`${deviation.value}.explain.other`}
              />,
            ],
          },
        ]}
      />,
    ],
  }));

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
                options={deviationsToRender}
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
