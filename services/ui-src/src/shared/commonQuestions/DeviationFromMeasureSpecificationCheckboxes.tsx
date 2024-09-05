import * as QMR from "components";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useWatch } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { cleanString } from "utils/cleanString";
import { LabelData, getLabelText } from "utils";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";

interface GetTopLvlDeviationOptions {
  categories: string[];
  customTotalLabel?: string;
}

type TopLevelOptions = {
  displayValue: string;
  rates: Types.RateFields[] | undefined;
  key: string;
}[];

interface Props {
  categories: LabelData[];
  customTotalLabel?: string;
  measureName?: string;
}

interface OptionProps {
  name: string;
  qualifiers?: Types.RateFields[];
  labelText?: { [key: string]: string };
}

/**
 * Check if the rate has both a numerator and a denominator.
 * @param el - The rate field that we're checking.
 */
const numDenExistInRate = (el: Types.RateFields) =>
  el?.numerator && el?.denominator;

/**
 * Check if the rates within a qualifier have both a numerator and a denominator.
 * @param qualifier - The qualifier that we're checking.
 */
const complexNumDenExistInRate = (qualifier: any) => {
  return qualifier.fields.some(
    (field: any) => field?.value && field?.value !== ""
  );
};

/**
 * It returns an array of objects that contain a display value, value, and single TextArea child
 * @param {string} name - The name of the field.
 */
const getRateTextAreaOptions = (name: string) =>
  ["Numerator", "Denominator", "Other"].map((displayValue) => {
    const value = displayValue.toLowerCase();
    return {
      displayValue,
      value,
      children: [
        <QMR.TextArea
          label="Explain:"
          name={`${name}.${value}`}
          key={`${name}.${value}`}
        />,
      ],
    };
  });

/* This is a custom checkbox component that is used to render the checkboxes for the rate deviations. */
const DeviationsSelectedCheckbox = ({ name }: { name: string }) => (
  <QMR.Checkbox
    name={`${name}.${DC.RATE_DEVIATIONS_SELECTED}`}
    key={`${name}.${DC.RATE_DEVIATIONS_SELECTED}`}
    options={getRateTextAreaOptions(name)}
  />
);

/**
 * It takes in a list of qualifiers and returns options based on if the rates contain a label
 * @param {OptionProps}  - qualifier: the qualifier object - name: a name to register the input with
 * @returns A list of options
 */
export const getLowLvlDeviationOptions = ({
  qualifiers,
  name,
  labelText,
}: OptionProps) => {
  if (!qualifiers || qualifiers.length === 0) return [];

  // if there are no labels then there is no need for the additional checkbox
  if (!qualifiers.some((el) => el.label)) {
    return getRateTextAreaOptions(name);
  }

  return qualifiers
    .sort((a: any, b: any) => b.label! - a.label!)
    .map((item) => {
      const value = `${item.label && cleanString(item.label)}`;
      return {
        displayValue: labelText?.[item.label!] || item.label,
        value,
        children: [
          <DeviationsSelectedCheckbox
            name={`${name}.${value}`}
            key={`${name}.${value}`}
          />,
        ],
      };
    });
};

export const PCRADgetLowLvlDeviationOptions = ({
  qualifiers,
  name,
}: OptionProps) => {
  if (!qualifiers || qualifiers.length === 0) return [];

  return getRateTextAreaOptions(name);
};

export const DeviationFromMeasureSpecificationCheckboxes = ({
  categories,
  measureName = "",
  customTotalLabel,
}: Props) => {
  const register =
    useCustomRegister<Types.DeviationFromMeasureSpecificationCheckboxes>();
  const watchPerformanceMeasure = useWatch({
    name: DC.PERFORMANCE_MEASURE,
  });
  const labelText = getLabelText();

  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const getTopLvlDeviationOptions = ({
    categories,
    customTotalLabel,
  }: GetTopLvlDeviationOptions) => {
    if (watchPerformanceMeasure?.rates) {
      const topLvlOptions: TopLevelOptions = [];
      const { rates } = watchPerformanceMeasure;

      if (rates.singleCategory) {
        // handle for PCR-XX measures
        if (["PCR-AD", "PCR-HH"].includes(measureName)) {
          const quals = rates.singleCategory.filter((r: any) => r.value !== "");
          if (quals.length > 0) {
            return getRateTextAreaOptions(DC.DEVIATIONS);
          }
        }
        // A total category should have the label "Total", per the Figma design.
        const totalIndex = rates.singleCategory.findIndex(
          (cat: any) => cat?.isTotal === true
        );
        if (totalIndex >= 0) {
          rates.singleCategory[totalIndex].label = `${
            customTotalLabel ? `${customTotalLabel}` : "Total"
          }`;
        }
        /* This is checking if the rates object has a singleCategory key.
        If it does, then it will return the low level deviation options. */
        return getLowLvlDeviationOptions({
          qualifiers:
            measureName === "AIF-HH"
              ? rates.singleCategory.filter(complexNumDenExistInRate)
              : rates.singleCategory.filter(numDenExistInRate),
          name: DC.DEVIATIONS,
        });
      } else {
        categories.forEach((cat) => {
          const key = cleanString(cat);
          // if some of the rates have both num and den
          const deviations =
            measureName === "IU-HH"
              ? rates[key]?.some(complexNumDenExistInRate)
              : rates[key]?.some(numDenExistInRate);
          const deviationRates =
            measureName === "IU-HH"
              ? rates[key]?.filter(complexNumDenExistInRate)
              : rates[key]?.filter(numDenExistInRate);

          if (deviations) {
            // add the rates that have num and den to topLvlOptions along with its display value from categories
            topLvlOptions.push({
              rates: deviationRates,
              displayValue: labelText[cat] || cat,
              key,
            });
          }
        });
      }

      return (
        topLvlOptions?.map((option) => {
          return {
            value: option.key,
            displayValue: labelText[option.displayValue] || option.displayValue,
            children: [
              <QMR.Checkbox
                {...register(
                  `${DC.DEVIATIONS}.${option.key}.${DC.SELECTED_OPTIONS}`
                )}
                formLabelProps={{ fontWeight: 600 }}
                key={`${DC.DEVIATIONS}.${option.key}`}
                options={getLowLvlDeviationOptions({
                  qualifiers: option.rates,
                  name: `${DC.DEVIATIONS}.${option.key}`,
                  labelText,
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
    <QMR.CoreQuestionWrapper
      label={labels.DeviationFromMeasureSpecification.header}
      testid="deviation-from-measure-specification"
    >
      <QMR.RadioButton
        renderHelperTextAbove
        {...register(DC.DID_CALCS_DEVIATE)}
        formLabelProps={{ fontWeight: 600 }}
        label={labels.DeviationFromMeasureSpecification.section}
        helperText={labels.DeviationFromMeasureSpecification.helper}
        options={[
          {
            displayValue:
              labels.DeviationFromMeasureSpecification.options[0].displayValue,
            value: labels.DeviationFromMeasureSpecification.options[0].value,
            children: [
              <QMR.Checkbox
                {...register(DC.DEVIATION_OPTIONS)}
                label={labels.DeviationFromMeasureSpecification.optionsText}
                options={getTopLvlDeviationOptions({
                  categories: categories.map((cat) => cat.label),
                  customTotalLabel,
                })}
              />,
            ],
          },
          {
            displayValue:
              labels.DeviationFromMeasureSpecification.options[1].displayValue,
            value: labels.DeviationFromMeasureSpecification.options[1].value,
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
