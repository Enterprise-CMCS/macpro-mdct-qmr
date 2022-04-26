import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import * as Types from "measures/CommonQuestions/types";
import { usePerformanceMeasureContext } from "./context";
import { useController, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { MultiRate } from "components/MultiRate";

interface NdrProps {
  /** name for react-hook-form registration */
  name: string;
  // ageGroups: Types.AgeGroups;
  // performanceMeasureDescriptions: Types.PerformanceMeasureDescriptions;
}

interface AgeGroupProps {
  /** name for react-hook-form registration */
  name: string;
  /** should rate be user editable? */
  rateReadOnly: boolean;
  /** Which performance measure rates are filled in */
  performanceMeasureArray?: Types.RateFields[][];
  qualifiers: string[];
  categories: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator: boolean;
}

interface OPMProps {
  /** Rate fields and descs from OPM */
  OPM: Types.OtherRatesFields[];
  /** should rate be user editable? */
  rateReadOnly: boolean;
  /** name for react-hook-form registration */
  name: string;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
}

interface TotalProps {
  /** name for react-hook-form registration */
  name: string;
}

interface NdrOptionBuilderProps extends AgeGroupProps {
  values: string[];
  addSecondaryRegisterTag: boolean;
  categories: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator: boolean;
}

interface ConditionalRateBuilderProps {
  addSecondaryRegisterTag: boolean;
  rateReadOnly: boolean;
  performanceMeasureArray: Types.RateFields[][];
  categories: string[];
  majorIndex: number;
  value: string;
  name: string;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator: boolean;
}

type CheckBoxBuilder = (props: AgeGroupProps) => QMR.CheckboxOption[];

/**
 * Hook to track and update oms totals. Use state to track to view previous calculated rate.
 * If total is adjusted manually, this will not change the state object which stops a forced recalculation/render
 */
const useOmsTotalRate = (omsName: string, totalName: string) => {
  const { qualifiers, rateMultiplicationValue, numberOfDecimals } =
    usePerformanceMeasureContext();
  const { watch, control } = useFormContext();

  const watchOMS = watch(omsName);
  const { field } = useController({ name: totalName, control });
  const [prevCalcRate, setPrevCalcRate] = useState({
    numerator: 0,
    denominator: 0,
    rate: "",
  });

  useEffect(() => {
    // calc new rate, adjust if new values
    const tempRate = {
      numerator: 0,
      denominator: 0,
      rate: "",
    };

    for (const qual of qualifiers
      .slice(0, -1)
      .map((s) => s.replace(/[^\w]/g, ""))) {
      if (
        watchOMS?.[qual]?.["singleCategory"]?.[0]?.numerator &&
        watchOMS?.[qual]?.["singleCategory"]?.[0]?.denominator &&
        watchOMS?.[qual]?.["singleCategory"]?.[0]?.rate
      ) {
        tempRate.numerator += parseFloat(
          watchOMS[qual]["singleCategory"][0].numerator
        );
        tempRate.denominator += parseFloat(
          watchOMS[qual]["singleCategory"][0].denominator
        );
      }
    }

    tempRate.rate = (
      Math.round(
        (tempRate.numerator / tempRate.denominator) *
          (rateMultiplicationValue ?? 100) *
          Math.pow(10, numberOfDecimals)
      ) / Math.pow(10, numberOfDecimals)
    ).toFixed(1);

    if (
      tempRate.numerator &&
      tempRate.denominator &&
      (tempRate.numerator !== prevCalcRate.numerator ||
        tempRate.denominator !== prevCalcRate.denominator)
    ) {
      setPrevCalcRate(tempRate);
      field.onChange([
        {
          numerator: `${tempRate.numerator}`,
          denominator: `${tempRate.denominator}`,
          rate: tempRate.rate,
        },
      ]);
    }
  }, [
    watchOMS,
    qualifiers,
    rateMultiplicationValue,
    field,
    prevCalcRate,
    setPrevCalcRate,
    numberOfDecimals,
  ]);
};

/**
 * Total Rate NDR that calculates from filled OMS NDR sets
 */
export const TotalNDR = ({ name }: TotalProps) => {
  const { qualifiers, customMask, rateMultiplicationValue, rateReadOnly } =
    usePerformanceMeasureContext();

  const [lastQualifier] = qualifiers.slice(-1);
  const cleanedQualifier = lastQualifier.replace(/[^\w]/g, "");
  const cleanedName = `${name}.rates.${cleanedQualifier}.singleCategory`;

  useOmsTotalRate(`${name}.rates`, cleanedName);

  return (
    <>
      <CUI.Divider />
      <QMR.Rate
        key={cleanedName}
        name={cleanedName}
        readOnly={rateReadOnly}
        customMask={customMask}
        rates={[{ label: lastQualifier, id: 0 }]}
        rateMultiplicationValue={rateMultiplicationValue}
      />
    </>
  );
};

/**
 * Create NDR sets for applicable PMs
 */
const buildConditionalRateArray = ({
  addSecondaryRegisterTag,
  rateReadOnly,
  performanceMeasureArray = [[]],
  majorIndex,
  value,
  name,
  categories,
  rateMultiplicationValue,
  customMask,
  allowNumeratorGreaterThanDenominator,
}: ConditionalRateBuilderProps) => {
  const ndrSets: React.ReactElement[] = [];
  const cleanedLabel = value?.replace(/[^\w]/g, "") ?? "CHECKBOX_VALUE_NOT_SET";

  performanceMeasureArray.forEach((performanceMeasure, idx) => {
    if (
      performanceMeasure &&
      performanceMeasure[majorIndex] &&
      performanceMeasure[majorIndex].rate
    ) {
      const cleanedPMDescLabel =
        addSecondaryRegisterTag && categories[idx]
          ? `${categories[idx].replace(/[^\w]/g, "")}`
          : "singleCategory";

      const adjustedName = `${name}.rates.${cleanedLabel}.${cleanedPMDescLabel}`;

      ndrSets.push(
        <QMR.Rate
          readOnly={rateReadOnly}
          name={adjustedName}
          key={adjustedName}
          rateMultiplicationValue={rateMultiplicationValue}
          allowNumeratorGreaterThanDenominator={
            allowNumeratorGreaterThanDenominator
          }
          customMask={customMask}
          rates={[
            {
              id: 0,
              label: `${categories[idx] ? categories[idx] : ""}`,
            },
          ]}
        />
      );
    }
  });

  return ndrSets;
};

/**
 * Generic builder function for any variation of AgeGroupNDRSets
 * - no ageGroups but performanceDescription
 * - no performanceDescription but ageGroups
 * - both ageGroups and performanceDescription
 */
const buildPerformanceMeasureNDRCheckboxOptions = ({
  values,
  addSecondaryRegisterTag,
  performanceMeasureArray = [[]],
  name,
  rateReadOnly,
  categories,
  rateMultiplicationValue,
  customMask,
  allowNumeratorGreaterThanDenominator,
}: NdrOptionBuilderProps) => {
  const checkboxes: QMR.CheckboxOption[] = [];

  values.forEach((val, i) => {
    // add tp checkbox options
    const ndrSets = buildConditionalRateArray({
      value: val,
      addSecondaryRegisterTag,
      performanceMeasureArray,
      rateReadOnly,
      majorIndex: i,
      name,
      categories,
      rateMultiplicationValue,
      customMask,
      allowNumeratorGreaterThanDenominator,
    });
    if (ndrSets.length) {
      const cleanedLabel = val.replace(/[^\w]/g, "");
      const ageGroupCheckBox = {
        value: cleanedLabel,
        displayValue: val,
        children: [
          <CUI.Heading key={`${name}.rates.${cleanedLabel}Header`} size={"sm"}>
            Enter a number for the numerator and the denominator. Rate will
            auto-calculate
          </CUI.Heading>,
          <CUI.Heading
            pt="1"
            key={`${name}.rates.${cleanedLabel}HeaderHelper`}
            size={"sm"}
          >
            Please review the auto-calculated rate and revise if needed.
          </CUI.Heading>,
          ...ndrSets,
        ],
      };
      checkboxes.push(ageGroupCheckBox);
    }
  });

  return checkboxes;
};

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
const buildAgeGroupsCheckboxes: CheckBoxBuilder = (props) => {
  if (!props.qualifiers.length) {
    return buildPerformanceMeasureNDRCheckboxOptions({
      ...props,
      addSecondaryRegisterTag: false,
      values: props.categories,
      rateMultiplicationValue: props.rateMultiplicationValue,
      customMask: props.customMask,
      allowNumeratorGreaterThanDenominator:
        props.allowNumeratorGreaterThanDenominator,
    });
  }
  return buildPerformanceMeasureNDRCheckboxOptions({
    ...props,
    addSecondaryRegisterTag: true,
    values: props.qualifiers,
    rateMultiplicationValue: props.rateMultiplicationValue,
    customMask: props.customMask,
    allowNumeratorGreaterThanDenominator:
      props.allowNumeratorGreaterThanDenominator,
  });
};

/**
 * Builds NDRs for Performance Measure AgeGroups
 */
const AgeGroupNDRSets = ({ name }: NdrProps) => {
  const {
    performanceMeasureArray,
    rateReadOnly,
    qualifiers,
    categories,
    rateMultiplicationValue,
    customMask,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;

  const ageGroupsOptions = buildAgeGroupsCheckboxes({
    name: name,
    rateReadOnly: !!rateReadOnly,
    performanceMeasureArray,
    qualifiers: quals,
    categories,
    rateMultiplicationValue,
    customMask,
    allowNumeratorGreaterThanDenominator:
      !!allowNumeratorGreaterThanDenominator,
  });

  return (
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={ageGroupsOptions}
    />
  );
};

/**
 * Builds NDRs for Performance Measure AgeGroups
 */
const PCRADNDRSets = ({ name }: NdrProps) => {
  const { rateReadOnly, qualifiers, customMask } =
    usePerformanceMeasureContext();
  const rates = qualifiers.map((qual, i) => {
    return { label: qual, id: i };
  });

  return (
    <>
      <CUI.Heading key={`${name}.rates.Header`} size={"sm"}>
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate
      </CUI.Heading>
      <CUI.Heading pt="1" key={`${name}.rates.HeaderHelper`} size={"sm"}>
        Please review the auto-calculated rate and revise if needed.
      </CUI.Heading>
      <MultiRate
        rates={rates}
        name={`${name}.pcrad-rate`}
        readOnly={rateReadOnly}
        customMask={customMask}
      />
    </>
  );
};

/**
 * Builds OPM Checkboxes
 */
const renderOPMChckboxOptions = ({
  OPM,
  rateReadOnly,
  name,
  rateMultiplicationValue,
  customMask,
  allowNumeratorGreaterThanDenominator,
}: OPMProps) => {
  const checkBoxOptions: QMR.CheckboxOption[] = [];

  OPM.forEach(({ description }, idx) => {
    if (description) {
      const cleanedFieldName = description?.replace(/[^\w]/g, "");

      checkBoxOptions.push({
        value: cleanedFieldName,
        displayValue: description ?? `UNSET_OPM_FIELD_NAME_${idx}`,
        children: [
          <CUI.Heading
            key={`${name}.rates.${cleanedFieldName}Header`}
            size={"sm"}
          >
            Enter a number for the numerator and the denominator. Rate will
            auto-calculate
          </CUI.Heading>,
          <CUI.Heading
            pt="1"
            size={"sm"}
            key={`${name}.rates.${cleanedFieldName}HeaderHelper`}
          >
            Please review the auto-calculated rate and revise if needed.
          </CUI.Heading>,
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
          />,
        ],
      });
    }
  });

  return checkBoxOptions;
};

/**
 * Builds NDRs for Other Performance Measure sets
 */
const OPMNDRSets = ({ name }: NdrProps) => {
  const {
    OPM = [],
    rateReadOnly,
    rateMultiplicationValue,
    customMask,
    allowNumeratorGreaterThanDenominator,
  } = usePerformanceMeasureContext();
  return (
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={renderOPMChckboxOptions({
        OPM,
        name,
        rateReadOnly: !!rateReadOnly,
        rateMultiplicationValue,
        customMask,
        allowNumeratorGreaterThanDenominator,
      })}
    />
  );
};

/**
 * Builds Base level NDR Sets
 */
export const NDRSets = ({ name }: NdrProps) => {
  const { OPM, calcTotal } = usePerformanceMeasureContext();
  return (
    <CUI.VStack key={`${name}.NDRwrapper`} alignItems={"flex-start"}>
      {OPM && <OPMNDRSets name={name} key={name} />}
      {!OPM && <PCRADNDRSets name={name} key={name} />}
      {!OPM && false && <AgeGroupNDRSets name={name} key={name} />}
      {!OPM && calcTotal && (
        <TotalNDR name={name} key={`${name}.TotalWrapper`} />
      )}
    </CUI.VStack>
  );
};
