import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

import { usePerformanceMeasureContext } from "./context";
import { useController, useFormContext } from "react-hook-form";

interface NdrProps {
  /** name for react-hook-form registration */
  name: string;
}

interface TotalProps {
  /** name for react-hook-form registration */
  name: string;
  qualifier?: string;
  category?: string;
}

interface TempRate {
  numerator?: number;
  denominator?: number;
  rate: string;
}

interface CalcOmsTotalProp {
  watchOMS: any;
  cleanedCategory: string;
  qualifiers: string[];
  rateMultiplicationValue?: number;
  numberOfDecimals: number;
}
type CheckBoxBuilder = (name: string) => QMR.CheckboxOption[];
type RateArrayBuilder = (name: string) => React.ReactElement[][];

const cleanString = (s: string) => s && s.replace(/[^\w]/g, "");

/** Process all OMS rate values pertaining to set category and calculate new rate object */
const calculateOMSTotal = ({
  cleanedCategory,
  numberOfDecimals,
  qualifiers,
  rateMultiplicationValue = 100,
  watchOMS,
}: CalcOmsTotalProp) => {
  const tempRate: TempRate = {
    numerator: undefined,
    denominator: undefined,
    rate: "",
  };

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

  if (tempRate.numerator !== undefined && tempRate.denominator !== undefined) {
    tempRate.rate = (
      Math.round(
        (tempRate.numerator / tempRate.denominator) *
          rateMultiplicationValue *
          Math.pow(10, numberOfDecimals)
      ) / Math.pow(10, numberOfDecimals)
    ).toFixed(1);
  }

  return tempRate;
};

/**
 * Total Rate NDR that calculates from filled OMS NDR sets
 */
const TotalNDR = ({
  name,
  category = DC.SINGLE_CATEGORY,
  qualifier,
}: TotalProps) => {
  const {
    qualifiers,
    customMask,
    rateMultiplicationValue,
    rateReadOnly,
    allowNumeratorGreaterThanDenominator,
    numberOfDecimals,
  } = usePerformanceMeasureContext();

  const lastQualifier = qualifier ?? qualifiers.slice(-1)[0];
  const cleanedQualifier = cleanString(lastQualifier);
  const cleanedCategory = cleanString(category);
  const cleanedName = `${name}.rates.${cleanedQualifier}.${cleanedCategory}`;
  const label = category === DC.SINGLE_CATEGORY ? lastQualifier : category;
  const { control, watch } = useFormContext();
  const { field } = useController({ name: cleanedName, control });
  const watchOMS = watch(`${name}.rates`);

  return (
    <CUI.Stack spacing={0}>
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
      <QMR.ContainedButton
        buttonText={"Calculate Total"}
        buttonProps={{
          minWidth: "10rem",
          colorScheme: "blue",
          textTransform: "capitalize",
        }}
        testId={`TotalCalculation.${cleanedCategory}`}
        onClick={() => {
          const tempRate: TempRate = calculateOMSTotal({
            watchOMS,
            cleanedCategory,
            numberOfDecimals,
            qualifiers,
            rateMultiplicationValue,
          });
          field.onChange([
            {
              numerator: `${tempRate.numerator ?? ""}`,
              denominator: `${tempRate.denominator ?? ""}`,
              rate: (!isNaN(parseFloat(tempRate.rate)) && tempRate.rate) || "",
            },
          ]);
        }}
      />
    </CUI.Stack>
  );
};

/** OMS Total wrapper for any variation of qulaifier and category combination*/
const TotalNDRSets = ({ name }: { name: string }) => {
  const rateArray: React.ReactElement[] = [];

  const { qualifiers, categories } = usePerformanceMeasureContext();
  const totalQual = qualifiers.slice(-1)[0];

  if (categories.length) {
    categories.forEach((cat, idx) => {
      rateArray.push(
        <TotalNDR
          name={name}
          category={cat}
          qualifier={totalQual}
          key={`${name}.${idx}.totalWrapper`}
        />
      );
    });
  } else {
    rateArray.push(<TotalNDR name={name} key={`${name}.TotalWrapper`} />);
  }

  return (
    <>
      <CUI.Divider key={`totalNDRDivider`} />
      {categories.length > 0 && (
        <CUI.Heading size={"sm"} key={`totalNDRHeader`}>
          {totalQual}
        </CUI.Heading>
      )}
      <CUI.Stack spacing={5}>{rateArray}</CUI.Stack>
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
  const { categories, rateReadOnly, qualifiers, calcTotal } =
    usePerformanceMeasureContext();

  const qualRates = useQualRateArray(name);
  const standardRates = useStandardRateArray(name);
  const rateArrays = !categories.length ? qualRates : standardRates;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;

  quals?.forEach((value, idx) => {
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
  const { calcTotal } = usePerformanceMeasureContext();

  const ageGroupsOptions = useAgeGroupsCheckboxes(name);

  return (
    <>
      <QMR.Checkbox
        name={`${name}.options`}
        key={`${name}.options`}
        options={ageGroupsOptions}
      />
      {calcTotal && <TotalNDRSets name={name} key={`${name}.totalWrapper`} />}
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
  const { OPM, calcTotal } = usePerformanceMeasureContext();
  const extraBottomMargin = calcTotal ? 5 : undefined;
  return (
    <CUI.VStack
      key={`${name}.NDRwrapper`}
      alignItems={"flex-start"}
      mb={extraBottomMargin}
    >
      {OPM && <OPMNDRSets name={name} key={name} />}
      {!OPM && <AgeGroupNDRSets name={name} key={name} />}
    </CUI.VStack>
  );
};
