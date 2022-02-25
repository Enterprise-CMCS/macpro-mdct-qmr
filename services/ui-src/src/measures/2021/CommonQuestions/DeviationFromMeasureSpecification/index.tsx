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
  qualifiers: { label: string; id: number }[];
}

export const deviationOptions = ({
  qualifiers,
  name,
}: OptionProps): QMR.CheckboxOption[] => {
  return qualifiers.map((item) => {
    return {
      displayValue: item.label,
      value: `${name}.${item.label.replace(/ /g, "")}`,
      children: [
        <QMR.Checkbox
          name={`${name}.${item.label.replace(
            / /g,
            ""
          )}.RateDeviationsSelected`}
          key={`${name}.${item.label.replace(/ /g, "")}.RateDeviationsSelected`}
          options={[
            {
              displayValue: "Numerator",
              value: `numerator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.label.replace(/ /g, "")}.numerator`}
                  key={`${name}.${item.label.replace(/ /g, "")}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `denominator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.label.replace(/ /g, "")}.denominator`}
                  key={`${name}.${item.label.replace(/ /g, "")}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `other`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.label.replace(/ /g, "")}.other`}
                  key={`${name}.${item.label.replace(/ /g, "")}.other`}
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

  const getDeviationOptions = ({
    categories,
    data,
  }: {
    categories: DeviationCategory[];
    data: Types.DeviationFromMeasureSpecification;
  }) => {
    return categories
      .filter((category) => {
        return (
          // if the value exists in data and is not an empty array and has numerator and denominator
          // TODO: Clean this garbage up
          data[
            category.watch as keyof Types.DeviationFromMeasureSpecification
          ] &&
          (
            data[
              category.watch as keyof Types.DeviationFromMeasureSpecification
            ] as any[]
          )?.length > 0 &&
          (
            data[
              category.watch as keyof Types.DeviationFromMeasureSpecification
            ] as any[]
          )?.some((el) => el?.numerator && el?.denominator)
        );
      })
      .map((category) => {
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
              options={deviationOptions({
                // @ts-ignore
                qualifiers: data[category.watch].filter((el) => el),
                // name: `Deviations.${category.title.replace(/[^\w]/g, "")}`,
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
                options={getDeviationOptions({ categories, data })}
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
