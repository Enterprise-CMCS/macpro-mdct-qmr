import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Types from "shared/types";
import * as QMR from "components";
import { LabelData, cleanString, getLabelText, isLegacyLabel } from "utils";
import { useFormContext } from "react-hook-form";
import { ContextProps, usePerformanceMeasureContext } from "../context";
import {
  useQualRateArray,
  useRatesForCompletedPmQualifiers,
  useStandardRateArray,
} from "./rates";

type CheckBoxBuilder = (name: string) => QMR.CheckboxOption[];

/*
 * Builds Performance Measure AgeGroup Checkboxes
 */
export const useAgeGroupsCheckboxes: CheckBoxBuilder = (name) => {
  const options: QMR.CheckboxOption[] = [];
  const { categories, qualifiers, calcTotal, customPrompt } =
    usePerformanceMeasureContext();

  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  const standardRates = useStandardRateArray(name);
  const qualRates = useQualRateArray(name);
  const completedPMQualRates = useRatesForCompletedPmQualifiers(name);

  //using the data to determine if the data is pre or post data structure change, string is pre-change
  if (isLegacyLabel()) {
    const labelText = getLabelText();
    const rateArrays = !categories.length ? qualRates : standardRates;

    quals?.forEach((value, idx) => {
      if (rateArrays?.[idx]?.length) {
        const cleanedLabel = value.id;
        const displayValue = labelText[value.label] ?? value;
        const ageGroupCheckBox = checkboxComponent(
          name,
          cleanedLabel,
          displayValue,
          rateArrays[idx],
          shouldDisplay,
          customPrompt
        );
        options.push(ageGroupCheckBox);
      }
    });
  } else {
    const rateArrays =
      !categories.length ||
      !(categories as LabelData[]).some((item) => item.label)
        ? completedPMQualRates
        : standardRates;

    const checkbox = (categories as LabelData[]).some((cat) => cat.label)
      ? (categories as LabelData[])
      : (quals as LabelData[]);
    checkbox?.forEach((value, idx) => {
      if (rateArrays?.[idx]?.length) {
        const ageGroupCheckBox = checkboxComponent(
          name,
          value.id,
          value.text,
          rateArrays[idx],
          shouldDisplay,
          customPrompt
        );
        options.push(ageGroupCheckBox);
      }
    });
  }

  return options;
};

/*
 * Builds OPM Checkboxes
 */
export const useRenderOPMCheckboxOptions = (name: string) => {
  const checkBoxOptions: QMR.CheckboxOption[] = [];
  const context = usePerformanceMeasureContext();
  const { OPM, customPrompt } = context;

  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  OPM?.forEach(({ description }, idx) => {
    if (description) {
      //because of the structural changes from 2021/2022 to 2023, we need to track when to modify the data structure
      const cleanedFieldName = isLegacyLabel()
        ? cleanString(description)
        : `${DC.OPM_KEY}${cleanString(description)}`;

      const key = isLegacyLabel()
        ? `${name}.rates.${cleanedFieldName}.OPM`
        : `${name}.rates.OPM.${cleanedFieldName}`;

      const rateComponent = RateComponent(context, key);
      const displayValue = description ?? `UNSET_OPM_FIELD_NAME_${idx}`;

      checkBoxOptions.push(
        checkboxComponent(
          name,
          cleanedFieldName,
          displayValue,
          [rateComponent],
          shouldDisplay,
          customPrompt
        )
      );
    }
  });

  return checkBoxOptions;
};
const RateComponent = (context: ContextProps, name: string) => {
  return (
    <QMR.Rate
      rates={[
        {
          id: 0,
        },
      ]}
      name={name}
      key={name}
      readOnly={context.rateReadOnly}
      rateMultiplicationValue={context.rateMultiplicationValue}
      customMask={context.customMask}
      allowNumeratorGreaterThanDenominator={
        context.allowNumeratorGreaterThanDenominator
      }
      customNumeratorLabel={context.customNumeratorLabel}
      customDenominatorLabel={context.customDenominatorLabel}
      customRateLabel={context.customRateLabel}
      rateCalc={context.rateCalculation}
    />
  );
};

const checkboxComponent = (
  name: string,
  label: string,
  value: string,
  rateComponent: React.ReactElement[],
  shouldDisplay: boolean,
  customPrompt?: string
) => {
  return {
    value: label,
    displayValue: value,
    children: [
      <CUI.Heading
        key={`${name}.rates.${label}Header`}
        size={"sm"}
        dangerouslySetInnerHTML={{
          __html:
            customPrompt ??
            `Enter a number for the numerator and the denominator. Rate will
        auto-calculate:`,
        }}
      />,
      <CUI.Heading
        pt="1"
        size={"sm"}
        key={`${name}.rates.${label}HeaderHelper`}
        hidden={!shouldDisplay}
      >
        Please review the auto-calculated rate and revise if needed.
      </CUI.Heading>,
      ...rateComponent,
    ],
  };
};
