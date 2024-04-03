import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Types from "../types";
import * as QMR from "components";
import { cleanString, getLabelText } from "utils";
import { useFormContext } from "react-hook-form";
import { ComponentFlagType, usePerformanceMeasureContext } from "./context";
import { useTotalAutoCalculation } from "./omsUtil";

interface NdrProps {
  name: string;
}

interface TotalProps {
  name: string;
  componentFlag: ComponentFlagType;
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
  componentFlag,
  category = DC.SINGLE_CATEGORY,
  qualifier,
}: TotalProps) => {
  const {
    qualifiers,
    measureName,
    inputFieldNames,
    ndrFormulas,
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

  useTotalAutoCalculation({ name, cleanedCategory, componentFlag });

  if (componentFlag === "IU" || componentFlag === "AIF") {
    return (
      <QMR.ComplexRate
        key={cleanedName}
        name={cleanedName}
        readOnly={rateReadOnly}
        measureName={measureName}
        inputFieldNames={inputFieldNames}
        ndrFormulas={ndrFormulas}
        rates={[{ label: label, id: 0 }]}
        categoryName={""}
      />
    );
  } else {
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
  }
};

/** OMS Total wrapper for any variation of qulaifier and category combination*/
const TotalNDRSets = ({
  componentFlag = "DEFAULT",
  name,
}: {
  componentFlag?: ComponentFlagType;
  name: string;
}) => {
  const rateArray: React.ReactElement[] = [];

  const { qualifiers, categories } = usePerformanceMeasureContext();
  const totalQual = qualifiers.slice(-1)[0];

  if (categories.length) {
    categories.forEach((cat, idx) => {
      rateArray.push(
        <CUI.Box key={`${name}.${idx}.totalWrapper`}>
          <TotalNDR
            name={name}
            category={cat}
            componentFlag={componentFlag}
            qualifier={totalQual}
          />
        </CUI.Box>
      );
    });
  } else {
    rateArray.push(
      <CUI.Box key={`${name}.totalWrapper`}>
        <TotalNDR
          name={name}
          componentFlag={componentFlag}
          key={`${name}.TotalWrapper`}
        />{" "}
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
    measureName,
    inputFieldNames,
    ndrFormulas,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    IUHHPerformanceMeasureArray,
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

    if (IUHHPerformanceMeasureArray) {
      IUHHPerformanceMeasureArray?.forEach((category, idx) => {
        // The shape of Maternity is different than all other Categories
        if (idx === 1) {
          category = [{}, category[0], {}, category[1], category[2]];
        }
        const cleanQual = cleanString(singleQual);
        const cleanCat = cleanString(categories[idx]);
        const cleanedName = `${name}.rates.${cleanQual}.${cleanCat}`;

        // Confirm that there is at least 1 rate complete
        const rate1 = category?.[qualIndex]?.fields?.[2]?.value ? true : false;
        const rate2 = category?.[qualIndex]?.fields?.[4]?.value ? true : false;
        const rate3 = category?.[qualIndex]?.fields?.[5]?.value ? true : false;
        if (rate1 || rate2 || rate3) {
          ndrSets.push(
            <QMR.ComplexRate
              readOnly={rateReadOnly}
              name={cleanedName}
              key={cleanedName}
              measureName={measureName}
              inputFieldNames={inputFieldNames}
              ndrFormulas={ndrFormulas}
              rates={[
                {
                  id: 0,
                  label: categories[idx],
                },
              ]}
              categoryName={""}
            />
          );
        }
      });
    } else if (performanceMeasureArray) {
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
    }
    rateArrays.push(ndrSets);
  });
  return rateArrays;
};

/** Creates Rate Components for each Qualifier if filled in PM */
const useQualRateArray: RateArrayBuilder = (name) => {
  const {
    qualifiers,
    measureName,
    inputFieldNames,
    ndrFormulas,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    rateMultiplicationValue,
    AIFHHPerformanceMeasureArray,
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
    } else if (AIFHHPerformanceMeasureArray) {
      AIFHHPerformanceMeasureArray?.forEach((measure) => {
        const cleanedName = `${name}.rates.${cleanString(singleQual)}.${
          DC.SINGLE_CATEGORY
        }`;
        //Confirm that there is at least 1 rate complete
        const rate1 = measure?.[qualIndex]?.fields?.[2]?.value ? true : false;
        const rate2 = measure?.[qualIndex]?.fields?.[4]?.value ? true : false;
        const rate3 = measure?.[qualIndex]?.fields?.[6]?.value ? true : false;
        if (rate1 || rate2 || rate3) {
          rateArrays.push([
            <QMR.ComplexRate
              readOnly={rateReadOnly}
              name={cleanedName}
              key={cleanedName}
              measureName={measureName}
              inputFieldNames={inputFieldNames}
              ndrFormulas={ndrFormulas}
              rates={[
                {
                  id: 0,
                },
              ]}
            />,
          ]);
        } else {
          rateArrays.push([]);
        }
      });
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

const IUHHNDRSets = ({ name }: NdrProps) => {
  const { calcTotal } = usePerformanceMeasureContext();

  const ageGroupsOptions = useAgeGroupsCheckboxes(`${name}.iuhh-rate`);

  return (
    <>
      <QMR.Checkbox
        name={`${name}.iuhh-rate.options`}
        key={`${name}.iuhh-rate.options`}
        options={ageGroupsOptions}
      />
      {calcTotal && (
        <TotalNDRSets
          componentFlag={"IU"}
          name={`${name}.iuhh-rate`}
          key={`${name}.iuhh-rate.totalWrapper`}
        />
      )}
    </>
  );
};

const AIFHHNDRSets = ({ name }: NdrProps) => {
  const { calcTotal } = usePerformanceMeasureContext();

  const ageGroupsOptions = useAgeGroupsCheckboxes(`${name}.aifhh-rate`);
  return (
    <>
      <QMR.Checkbox
        name={`${name}.aifhh-rate.options`}
        key={`${name}.aifhh-rate.options`}
        options={ageGroupsOptions}
      />
      {calcTotal && (
        <TotalNDRSets
          componentFlag={"AIF"}
          name={`${name}.aifhh-rate`}
          key={`${name}.aifhh-rate.totalWrapper`}
        />
      )}
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
      {dataSourceWatch?.[0] !== "AdministrativeData" ||
        (dataSourceWatch?.length !== 1 && (
          <CUI.Heading pt="1" key={`${name}.rates.HeaderHelper`} size={"sm"}>
            Please review the auto-calculated rate and revise if needed.
          </CUI.Heading>
        ))}
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
const useRenderOPMCheckboxOptions = (name: string) => {
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
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

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
  const options = useRenderOPMCheckboxOptions(name);
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
  const { OPM, componentFlag } = usePerformanceMeasureContext();
  const children: JSX.Element[] = [];

  if (OPM) children.push(<OPMNDRSets name={name} key={name} />);
  switch (componentFlag) {
    case "DEFAULT":
      if (!OPM) {
        children.push(<AgeGroupNDRSets name={name} key={name} />);
      }
      break;
    case "IU":
      if (!OPM) {
        children.push(<IUHHNDRSets name={name} key={name} />);
      }
      break;
    case "AIF":
      if (!OPM) {
        children.push(<AIFHHNDRSets name={name} key={name} />);
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
