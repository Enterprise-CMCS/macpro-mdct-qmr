import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Types from "../../types";
import * as QMR from "components";
import { cleanString, getLabelText } from "utils";
import { useFormContext } from "react-hook-form";
import { usePerformanceMeasureContext } from "../context";
import { useQualRateArray, useStandardRateArray } from "./rates";

type CheckBoxBuilder = (name: string) => QMR.CheckboxOption[];

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
export const useAgeGroupsCheckboxes: CheckBoxBuilder = (name) => {
  const options: QMR.CheckboxOption[] = [];
  const { categories, qualifiers, calcTotal, customPrompt } =
    usePerformanceMeasureContext();
  const labelText = getLabelText();

  const qualRates = useQualRateArray(name);
  const standardRates = useStandardRateArray(name);
  const rateArrays = !categories.length ? qualRates : standardRates;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  quals?.forEach((value, idx) => {
    if (rateArrays?.[idx]?.length) {
      const cleanedLabel = cleanString(value);
      const ageGroupCheckBox = {
        value: cleanedLabel,
        displayValue: labelText[value] ?? value,
        children: [
          <CUI.Heading key={`${name}.rates.${cleanedLabel}Header`} size={"sm"}>
            {customPrompt ??
              `Enter a number for the numerator and the denominator. Rate will
              auto-calculate:`}
          </CUI.Heading>,
          <CUI.Heading
            pt="1"
            key={`${name}.rates.${cleanedLabel}HeaderHelper`}
            size={"sm"}
            hidden={!shouldDisplay}
          >
            Please review the auto-calculated rate and revise if needed.
          </CUI.Heading>,
          ...rateArrays[idx],
        ],
      };
      options.push(ageGroupCheckBox);
    }
  });

  return options;
};

/**
 * Builds OPM Checkboxes
 */
export const useRenderOPMCheckboxOptions = (name: string) => {
  const checkBoxOptions: QMR.CheckboxOption[] = [];

  const {
    OPM,
    rateReadOnly,
    rateMultiplicationValue,
    customMask,
    allowNumeratorGreaterThanDenominator,
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
    rateCalculation,
    customPrompt,
  } = usePerformanceMeasureContext();

  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  OPM?.forEach(({ description }, idx) => {
    if (description) {
      const cleanedFieldName = cleanString(description);

      const RateComponent = (
        <QMR.Rate
          rates={[
            {
              id: 0,
            },
          ]}
          name={`${name}.rates.${cleanedFieldName}.OPM`}
          key={`${name}.rates.${cleanedFieldName}.OPM`}
          readOnly={rateReadOnly}
          rateMultiplicationValue={rateMultiplicationValue}
          customMask={customMask}
          allowNumeratorGreaterThanDenominator={
            allowNumeratorGreaterThanDenominator
          }
          customNumeratorLabel={customNumeratorLabel}
          customDenominatorLabel={customDenominatorLabel}
          customRateLabel={customRateLabel}
          rateCalc={rateCalculation}
        />
      );

      checkBoxOptions.push({
        value: cleanedFieldName,
        displayValue: description ?? `UNSET_OPM_FIELD_NAME_${idx}`,
        children: [
          <CUI.Heading
            key={`${name}.rates.${cleanedFieldName}Header`}
            size={"sm"}
          >
            {customPrompt ??
              `Enter a number for the numerator and the denominator. Rate will
            auto-calculate:`}
          </CUI.Heading>,
          <CUI.Heading
            pt="1"
            size={"sm"}
            key={`${name}.rates.${cleanedFieldName}HeaderHelper`}
            hidden={!shouldDisplay}
          >
            Please review the auto-calculated rate and revise if needed.
          </CUI.Heading>,
          RateComponent,
        ],
      });
    }
  });

  return checkBoxOptions;
};
