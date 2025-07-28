import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Types from "shared/types";
import * as QMR from "components";
import { LabelData, cleanString } from "utils";
import { useFormContext } from "react-hook-form";
import {
  ContextProps,
  usePerformanceMeasureContext,
} from "../../OptionalMeasureStrat/context";
import {
  useRatesForCompletedPmQualifiers,
  useStandardRateArray,
} from "../../OptionalMeasureStrat/NDR/rates";

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
export const useAgeGroupsFields = (name: string) => {
  const { categories, qualifiers, calcTotal, customPrompt } =
    usePerformanceMeasureContext();

  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  const standardRates = useStandardRateArray(name);
  const completedPMQualRates = useRatesForCompletedPmQualifiers(name);

  const rateArrays =
    !categories.length ||
    !(categories as LabelData[]).some((item) => item.label)
      ? completedPMQualRates
      : standardRates;

  const checkbox = (categories as LabelData[]).some((cat) => cat.label)
    ? (categories as LabelData[])
    : (quals as LabelData[]);

  return buildNDRComponent(
    checkbox,
    name,
    rateArrays,
    shouldDisplay,
    customPrompt
  );
};

/**
 * Builds OPM Checkboxes
 */
export const useRenderOPMCheckboxOptions = (name: string) => {
  const context = usePerformanceMeasureContext();
  const { OPM, customPrompt } = context;

  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  const options = OPM?.filter(
    ({ description }) => description != undefined && description != ""
  ).map(({ description }, idx) => {
    const cleanedFieldName = `${DC.OPM_KEY}${cleanString(description!)}`;
    const key = `${name}.rates.OPM.${cleanedFieldName}`;

    const rateComponent = RateComponent(context, key);
    const displayValue = description ?? `UNSET_OPM_FIELD_NAME_${idx}`;

    return buildOPMComponent(displayValue, rateComponent);
  });

  return (
    <CUI.Box>
      <CUI.Heading
        key={`${name}.rates.Header`}
        size={"sm"}
        dangerouslySetInnerHTML={{
          __html:
            customPrompt ??
            `Enter a number for the numerator and the denominator. Rate will
        auto-calculate:`,
        }}
      />
      <CUI.Heading
        pt="1"
        size={"sm"}
        key={`${name}.rates.HeaderHelper`}
        hidden={!shouldDisplay}
      >
        Please review the auto-calculated rate and revise if needed.
      </CUI.Heading>
      {options}
    </CUI.Box>
  );
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

const buildNDRComponent = (
  sets: LabelData[],
  name: string,
  rateArrays: React.ReactElement[][],
  shouldDisplay: boolean,
  customPrompt?: string
) => {
  return (
    <CUI.Box>
      <CUI.Heading
        key={`${name}.rates.Header`}
        size={"sm"}
        dangerouslySetInnerHTML={{
          __html:
            customPrompt ??
            `Enter a number for the numerator and the denominator. Rate will
        auto-calculate:`,
        }}
      />
      <CUI.Heading
        pt="1"
        size={"sm"}
        key={`${name}.rates.HeaderHelper`}
        hidden={!shouldDisplay}
      >
        Please review the auto-calculated rate and revise if needed.
      </CUI.Heading>
      {sets.map(
        (set, idx) =>
          rateArrays[idx].length > 0 && (
            <CUI.Box mt="1rem">
              <CUI.Heading fontSize="16px">{set.label}</CUI.Heading>
              {rateArrays[idx]}
            </CUI.Box>
          )
      )}
    </CUI.Box>
  );
};

const buildOPMComponent = (
  label: string,
  rateComponent: React.ReactElement
) => {
  return (
    <CUI.Box>
      <CUI.Heading fontSize="16px" mt="1rem">
        {label}
      </CUI.Heading>
      {rateComponent}
    </CUI.Box>
  );
};
