import * as QMR from "components";
import * as Types from "../types";
import { useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";

interface DeviationCategory {
  watch: string;
  title: string;
}

interface Props {
  categories: DeviationCategory[];
}

interface OptionProps {
  name: string;
  qualifiers: { label: string }[];
}

export const getLowLvlDeviationOptions = ({
  qualifiers,
  name,
}: OptionProps): QMR.CheckboxOption[] => {
  return qualifiers.map((item) => {
    const value = `${name}.${item.label.replace(/ /g, "")}`;
    return {
      displayValue: item.label,
      value,
      children: [
        <QMR.Checkbox
          name={`${value}.RateDeviationsSelected`}
          key={`${value}.RateDeviationsSelected`}
          options={[
            {
              displayValue: "Numerator",
              value: `numerator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${value}.numerator`}
                  key={`${value}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `denominator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${value}.denominator`}
                  key={`${value}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `other`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${value}.other`}
                  key={`${value}.other`}
                />,
              ],
            },
          ]}
        />,
      ],
    };
  });
};

export const DeviationFromMeasureSpec = ({ categories }: Props) => {
  const register = useCustomRegister<Types.DeviationFromMeasureSpecification>();
  const { getValues } =
    useFormContext<Types.DeviationFromMeasureSpecification>();
  const data = getValues();

  const getTopLvlDeviationOptions = ({
    categories,
    data,
  }: {
    categories: DeviationCategory[];
    data: Types.DeviationFromMeasureSpecification;
  }) => {
    return categories
      .filter((category) => {
        return (
          data?.[
            category.watch as keyof Types.DeviationFromMeasureSpecification
          ] as any[]
        )?.some((el) => el?.numerator && el?.denominator);
      })
      ?.map((category) => {
        return {
          value: category.title.replace(/[^\w]/g, ""),
          displayValue: category.title,
          children: [
            <QMR.Checkbox
              {...register(
                `Deviations.${category.title.replace(
                  /[^\w]/g,
                  ""
                )}.SelectedOptions`
              )}
              formLabelProps={{ fontWeight: 600 }}
              options={getLowLvlDeviationOptions({
                qualifiers: (
                  data[
                    category.watch as keyof Types.DeviationFromMeasureSpecification
                  ] as any[]
                ).filter(
                  (el: Types.RateFields) => el && el.numerator && el.denominator
                ),
                name: `Deviations.${category.watch}`,
              })}
            />,
          ],
        };
      });
  };

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
                options={getTopLvlDeviationOptions({ categories, data })}
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
