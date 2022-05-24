import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { usePerformanceMeasureContext } from "./context";
import { cleanString, useTotalAutoCalculation } from "./omsUtil";
import * as Types from "../types";

interface NdrProps {
  name: string;
}

interface TotalProps {
  name: string;
  qualifier?: string;
  category?: string;
}

type CheckBoxBuilder = (name: string) => QMR.CheckboxOption[];
type RateArrayBuilder = (name: string) => React.ReactElement[][];

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
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
  } = usePerformanceMeasureContext();

  const lastQualifier = qualifier ?? qualifiers.slice(-1)[0];
  const cleanedQualifier = cleanString(lastQualifier);
  const cleanedCategory = cleanString(category);
  const cleanedName = `${name}.rates.${cleanedQualifier}.${cleanedCategory}`;
  const label = category === DC.SINGLE_CATEGORY ? lastQualifier : category;

  useTotalAutoCalculation({ name, cleanedCategory });

  return (
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
      customNumeratorLabel={customNumeratorLabel}
      customDenominatorLabel={customDenominatorLabel}
      customRateLabel={customRateLabel}
    />
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
        <CUI.Box key={`${name}.${idx}.totalWrapper`}>
          <TotalNDR name={name} category={cat} qualifier={totalQual} />
        </CUI.Box>
      );
    });
  } else {
    rateArray.push(
      <CUI.Box key={`${name}.totalWrapper`}>
        <TotalNDR name={name} key={`${name}.TotalWrapper`} />{" "}
      </CUI.Box>
    );
  }

  return (
    <CUI.Box>
      <CUI.Divider key={`totalNDRDivider`} mt={2} mb={5} />
      {categories.length > 0 && (
        <CUI.Heading size={"sm"} key={`totalNDRHeader`}>
          {totalQual}
        </CUI.Heading>
      )}
      <CUI.Box>{rateArray}</CUI.Box>
    </CUI.Box>
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
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
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
            customNumeratorLabel={customNumeratorLabel}
            customDenominatorLabel={customDenominatorLabel}
            customRateLabel={customRateLabel}
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
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
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
          customNumeratorLabel={customNumeratorLabel}
          customDenominatorLabel={customDenominatorLabel}
          customRateLabel={customRateLabel}
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
  const { categories, qualifiers, calcTotal } = usePerformanceMeasureContext();

  const qualRates = useQualRateArray(name);
  const standardRates = useStandardRateArray(name);
  const rateArrays = !categories.length ? qualRates : standardRates;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] === "AdministrativeData" &&
    dataSourceWatch.length === 1;

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

const PCRNDRSets = ({ name }: NdrProps) => {
  const { rateReadOnly, qualifiers, customMask } =
    usePerformanceMeasureContext();
  const rates = qualifiers.map((qual, i) => {
    return { label: qual, id: i };
  });
  // ! Waiting for data source refactor to type data source here
  const { watch } = useFormContext<Types.DataSource>();

  // Watch for dataSource data
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  return (
    <>
      <CUI.Heading key={`${name}.rates.Header`} size={"sm"}>
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate
      </CUI.Heading>
      {dataSourceWatch?.[0] === "AdministrativeData" &&
        dataSourceWatch.length === 1 && (
          <CUI.Heading pt="1" key={`${name}.rates.HeaderHelper`} size={"sm"}>
            Please review the auto-calculated rate and revise if needed.
          </CUI.Heading>
        )}
      <QMR.PCRRate
        rates={rates}
        name={`${name}.pcr-rate`}
        readOnly={rateReadOnly}
        customMask={customMask}
      />
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
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
  } = usePerformanceMeasureContext();

  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] === "AdministrativeData" &&
    dataSourceWatch.length === 1;

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
          <CUI.Heading
            pt="1"
            size={"sm"}
            key={`${name}.rates.${cleanedFieldName}HeaderHelper`}
            hidden={!shouldDisplay}
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
            customNumeratorLabel={customNumeratorLabel}
            customDenominatorLabel={customDenominatorLabel}
            customRateLabel={customRateLabel}
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
  const { OPM, compFlag } = usePerformanceMeasureContext();
  const children: JSX.Element[] = [];

  if (OPM) children.push(<OPMNDRSets name={name} key={name} />);
  switch (compFlag) {
    case "DEFAULT":
      if (!OPM) {
        children.push(<AgeGroupNDRSets name={name} key={name} />);
      }
      break;
    case "PCR":
      if (!OPM) {
        children.push(<PCRNDRSets name={name} key={name} />);
      }
      break;
  }

  return (
    <CUI.VStack key={`${name}.NDRwrapper`} alignItems={"flex-start"}>
      {children}
    </CUI.VStack>
  );
};
