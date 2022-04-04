import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

import { usePerformanceMeasureContext } from "./context";
import { useController, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

interface NdrProps {
  /** name for react-hook-form registration */
  name: string;
}

interface TotalProps {
  /** name for react-hook-form registration */
  name: string;
  qualifier?: string;
  category?: string;
  divider?: boolean;
}

interface TempRate {
  numerator?: number;
  denominator?: number;
  rate: string;
}

type CheckBoxBuilder = (name: string) => QMR.CheckboxOption[];
type RateArrayBuilder = (name: string) => React.ReactElement[][];

const cleanString = (s: string) => s && s.replace(/[^\w]/g, "");
/**
 * Hook to track and update oms totals. Use state to track to view previous calculated rate.
 * If total is adjusted manually, this will not change the state object which stops a forced recalculation/render
 */
const useOmsTotalRate = (
  omsName: string,
  totalName: string,
  category = DC.SINGLE_CATEGORY
) => {
  const { qualifiers, rateMultiplicationValue, numberOfDecimals } =
    usePerformanceMeasureContext();
  const { watch, control } = useFormContext();
  const cleanedCategory = cleanString(category);

  const watchOMS = watch(omsName);
  const { field } = useController({ name: totalName, control });
  const [prevRunWasLoad, setPrevRunWasLoad] = useState(true);
  const [prevCalcRate, setPrevCalcRate] = useState<TempRate>({
    numerator: undefined,
    denominator: undefined,
    rate: "",
  });

  useEffect(() => {
    // calc new rate, adjust if new values
    const tempRate: { numerator?: number; denominator?: number; rate: string } =
      {
        numerator: undefined,
        denominator: undefined,
        rate: "",
      };

    const prevFields: any[] = [];
    for (const qual of qualifiers.map((s) => cleanString(s))) {
      prevFields.push(watchOMS?.[qual]?.[cleanedCategory]?.[0]?.rate);
    }
    const currentRunIsLoadState = prevFields.every((x) => x === undefined);
    for (const qual of qualifiers.slice(0, -1).map((s) => cleanString(s))) {
      if (
        watchOMS?.[qual]?.[cleanedCategory]?.[0]?.numerator &&
        watchOMS?.[qual]?.[cleanedCategory]?.[0]?.denominator &&
        watchOMS?.[qual]?.[cleanedCategory]?.[0]?.rate
      ) {
        tempRate.numerator ??= 0;
        tempRate.denominator ??= 0;
        tempRate.numerator += parseFloat(
          watchOMS[qual][cleanedCategory][0].numerator
        );
        tempRate.denominator += parseFloat(
          watchOMS[qual][cleanedCategory][0].denominator
        );
      }
    }

    if (
      tempRate.numerator !== undefined &&
      tempRate.denominator !== undefined
    ) {
      tempRate.rate = (
        Math.round(
          (tempRate.numerator / tempRate.denominator) *
            (rateMultiplicationValue ?? 100) *
            Math.pow(10, numberOfDecimals)
        ) / Math.pow(10, numberOfDecimals)
      ).toFixed(1);
    }

    if (
      tempRate.numerator !== prevCalcRate.numerator ||
      tempRate.denominator !== prevCalcRate.denominator
    ) {
      setPrevCalcRate(tempRate);
      if (
        (!prevRunWasLoad || !field.value?.[0]?.rate) &&
        !currentRunIsLoadState
      ) {
        field.onChange([
          {
            numerator: `${tempRate.numerator ?? ""}`,
            denominator: `${tempRate.denominator ?? ""}`,
            rate: (!isNaN(parseFloat(tempRate.rate)) && tempRate.rate) || "",
          },
        ]);
      }
      setPrevRunWasLoad(currentRunIsLoadState);
    }
  }, [
    watchOMS,
    qualifiers,
    rateMultiplicationValue,
    field,
    prevCalcRate,
    setPrevCalcRate,
    numberOfDecimals,
    cleanedCategory,
    prevRunWasLoad,
    setPrevRunWasLoad,
  ]);
};

/**
 * Total Rate NDR that calculates from filled OMS NDR sets
 */
export const TotalNDR = ({
  name,
  category = DC.SINGLE_CATEGORY,
  qualifier,
  divider = false,
}: TotalProps) => {
  const {
    qualifiers,
    customMask,
    rateMultiplicationValue,
    rateReadOnly,
    allowNumeratorGreaterThanDenominator,
  } = usePerformanceMeasureContext();

  const lastQualifier = qualifier ?? qualifiers.slice(-1)[0];
  const cleanedQualifier = cleanString(lastQualifier);
  const cleanedCategory = cleanString(category);
  const cleanedName = `${name}.rates.${cleanedQualifier}.${cleanedCategory}`;
  const label = category === DC.SINGLE_CATEGORY ? lastQualifier : category;

  useOmsTotalRate(`${name}.rates`, cleanedName, category);

  return (
    <>
      {divider && <CUI.Divider />}
      <QMR.Rate
        key={cleanedName}
        name={cleanedName}
        readOnly={rateReadOnly}
        customMask={customMask}
        rates={[{ label: label, id: 0 }]}
        rateMultiplicationValue={rateMultiplicationValue}
        allowNumeratorGreaterThanDenominator={
          allowNumeratorGreaterThanDenominator
        }
      />
    </>
  );
};

/** Creates Rate Component Arrays for every category with a filled qualifier */
const useStandardRateArray: RateArrayBuilder = (name) => {
  const {
    categories,
    qualifiers,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    rateMultiplicationValue,
    rateReadOnly,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  quals?.forEach((singleQual, qualIndex) => {
    const ndrSets: React.ReactElement[] = [];

    performanceMeasureArray?.forEach((measure, idx) => {
      if (measure?.[qualIndex]?.rate) {
        const adjustedName = `${name}.rates.${cleanString(
          singleQual
        )}.${cleanString(categories[idx])}`;

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
                label: categories[idx],
              },
            ]}
          />
        );
      }
    });
    rateArrays.push(ndrSets);
  });

  if (calcTotal) {
    const totalQual = qualifiers.slice(-1)[0];
    const ndrSets: React.ReactElement[] = [];
    categories.forEach((cat, idx) => {
      ndrSets.push(
        <TotalNDR
          name={name}
          category={cat}
          qualifier={totalQual}
          key={`${name}.${idx}.totalWrapper`}
        />
      );
    });
    rateArrays.push(ndrSets);
  }

  return rateArrays;
};

/** Creates Rate Components for each Qualifier if filled in PM */
const useQualRateArray: RateArrayBuilder = (name) => {
  const {
    qualifiers,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    rateMultiplicationValue,
    rateReadOnly,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  quals?.forEach((singleQual, qualIndex) => {
    if (performanceMeasureArray?.[0]?.[qualIndex]?.rate) {
      const cleanedName = `${name}.rates.${cleanString(singleQual)}.${
        DC.SINGLE_CATEGORY
      }`;

      rateArrays.push([
        <QMR.Rate
          readOnly={rateReadOnly}
          name={cleanedName}
          key={cleanedName}
          rateMultiplicationValue={rateMultiplicationValue}
          allowNumeratorGreaterThanDenominator={
            allowNumeratorGreaterThanDenominator
          }
          customMask={customMask}
          rates={[{ id: 0 }]}
        />,
      ]);
    } else {
      rateArrays.push([]);
    }
  });

  return rateArrays;
};

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
const useAgeGroupsCheckboxes: CheckBoxBuilder = (name) => {
  const options: QMR.CheckboxOption[] = [];
  const { categories, rateReadOnly, qualifiers } =
    usePerformanceMeasureContext();

  const qualRates = useQualRateArray(name);
  const standardRates = useStandardRateArray(name);
  const rateArrays = !categories.length ? qualRates : standardRates;

  qualifiers?.forEach((value, idx) => {
    if (rateArrays?.[idx]?.length) {
      const cleanedLabel = cleanString(value);
      const ageGroupCheckBox = {
        value: cleanedLabel,
        displayValue: value,
        children: [
          <CUI.Heading key={`${name}.rates.${cleanedLabel}Header`} size={"sm"}>
            Enter a number for the numerator and the denominator. Rate will
            auto-calculate
          </CUI.Heading>,
          ...(!rateReadOnly
            ? [
                <CUI.Heading
                  pt="1"
                  key={`${name}.rates.${cleanedLabel}HeaderHelper`}
                  size={"sm"}
                >
                  Please review the auto-calculated rate and revise if needed.
                </CUI.Heading>,
              ]
            : []),
          ...rateArrays[idx],
        ],
      };
      options.push(ageGroupCheckBox);
    }
  });

  return options;
};

/**
 * Builds NDRs for Performance Measure AgeGroups
 */
const AgeGroupNDRSets = ({ name }: NdrProps) => {
  const { categories, calcTotal } = usePerformanceMeasureContext();

  const ageGroupsOptions = useAgeGroupsCheckboxes(name);

  return (
    <>
      <QMR.Checkbox
        name={`${name}.options`}
        key={`${name}.options`}
        options={ageGroupsOptions}
      />
      {!categories.length && calcTotal && (
        <TotalNDR name={name} key={`${name}.TotalWrapper`} divider />
      )}
    </>
  );
};

/**
 * Builds OPM Checkboxes
 */
const useRenderOPMChckboxOptions = (name: string) => {
  const checkBoxOptions: QMR.CheckboxOption[] = [];

  const {
    OPM,
    rateReadOnly,
    rateMultiplicationValue,
    customMask,
    allowNumeratorGreaterThanDenominator,
  } = usePerformanceMeasureContext();

  OPM?.forEach(({ description }, idx) => {
    if (description) {
      const cleanedFieldName = cleanString(description);

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
          ...(!rateReadOnly
            ? [
                <CUI.Heading
                  pt="1"
                  size={"sm"}
                  key={`${name}.rates.${cleanedFieldName}HeaderHelper`}
                >
                  Please review the auto-calculated rate and revise if needed.
                </CUI.Heading>,
              ]
            : []),
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
  const options = useRenderOPMChckboxOptions(name);
  return (
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={options}
    />
  );
};

/**
 * Builds Base level NDR Sets
 */
export const NDRSets = ({ name }: NdrProps) => {
  const { OPM } = usePerformanceMeasureContext();
  return (
    <CUI.VStack key={`${name}.NDRwrapper`} alignItems={"flex-start"}>
      {OPM && <OPMNDRSets name={name} key={name} />}
      {!OPM && <AgeGroupNDRSets name={name} key={name} />}
    </CUI.VStack>
  );
};
