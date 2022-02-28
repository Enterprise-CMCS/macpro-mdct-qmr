import * as QMR from "components";
import * as Types from "../types";
import { useWatch } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";

interface Props {
  categories: string[];
}

interface OptionProps {
  name: string;
  qualifiers?: Types.RateFields[];
}

export const getLowLvlDeviationOptions = ({
  qualifiers,
  name,
}: OptionProps): QMR.CheckboxOption[] => {
  if (!qualifiers || qualifiers.length === 0) return [];
  // @ts-ignore
  return qualifiers.map((item) => {
    const value = `${item.label?.replace(/[^\w]/g, "")}`;
    return {
      displayValue: item.label,
      value,
      children: [
        <QMR.Checkbox
          name={`${name}.${value}.RateDeviationsSelected`}
          key={`${name}.${value}.RateDeviationsSelected`}
          options={[
            {
              displayValue: "Numerator",
              value: `numerator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${value}.numerator`}
                  key={`${name}.${value}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `denominator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${value}.denominator`}
                  key={`${name}.${value}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `other`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${value}.other`}
                  key={`${name}.${value}.other`}
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
  const watchPerformanceMeasure = useWatch({
    name: "PerformanceMeasure",
  });

  const getTopLvlDeviationOptions = ({
    categories,
  }: {
    categories: string[];
  }) => {
    if (categories.length > 0 && watchPerformanceMeasure?.rates) {
      // if no categories use singleCat to create low level Deviation Options
      const topLvlOptions: {
        displayValue: string;
        rates: Types.RateFields[] | undefined;
        key: string;
      }[] = [];
      const { rates } = watchPerformanceMeasure;

      Object.keys(rates).forEach((key) => {
        // if some of the rates have both num and den
        if (
          rates[key]?.some(
            (el: Types.RateFields) => el?.numerator && el?.denominator
          )
        ) {
          // add the rates that have num and den to topLvlOptions along with its display value from categories
          topLvlOptions.push({
            rates: rates[key]?.filter(
              (el: Types.RateFields) => el?.numerator && el?.denominator
            ) as Types.RateFields[],
            displayValue:
              categories.find((cat) => cat.replace(/[^\w]/g, "") === key) || "",
            key,
          });
        }
      });
      return (
        topLvlOptions?.map((option) => {
          return {
            value: option.key,
            displayValue: option.displayValue,
            children: [
              <QMR.Checkbox
                {...register(`Deviations.${option.key}.SelectedOptions`)}
                formLabelProps={{ fontWeight: 600 }}
                options={getLowLvlDeviationOptions({
                  qualifiers: option.rates,
                  name: `Deviations.${option.key}`,
                })}
              />,
            ],
          };
        }) ?? []
      );
    }
    return [];
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
                options={getTopLvlDeviationOptions({
                  categories,
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
