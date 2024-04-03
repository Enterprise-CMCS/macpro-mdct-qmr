import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Types from "../types";
import * as QMR from "components";
import { LabelData, cleanString } from "utils";
import { useFormContext } from "react-hook-form";
import { ComponentFlagType, usePerformanceMeasureContext } from "./context";
import { useTotalAutoCalculation } from "./omsUtil";

interface NdrProps {
  name: string;
}

interface TotalProps {
  name: string;
  componentFlag: ComponentFlagType;
  qualifier?: LabelData;
  category?: LabelData;
}

type CheckBoxBuilder = (name: string) => QMR.CheckboxOption[];
type RateArrayBuilder = (name: string) => React.ReactElement[][];

/**
 * Total Rate NDR that calculates from filled OMS NDR sets
 */
const TotalNDR = ({
  name,
  componentFlag,
  category = {
    id: DC.SINGLE_CATEGORY,
    label: DC.SINGLE_CATEGORY,
    text: DC.SINGLE_CATEGORY,
  },
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
    rateCalculation,
  } = usePerformanceMeasureContext();

  const lastQualifier = qualifier ?? qualifiers.slice(-1)[0];
  const cleanedQualifier = lastQualifier.id;
  const cleanedCategory = category.id;
  const cleanedName = `${name}.rates.${cleanedCategory}.${cleanedQualifier}`;
  const label =
    category.label === DC.SINGLE_CATEGORY
      ? lastQualifier.label
      : category.label;

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
        rateCalc={rateCalculation}
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

  if (categories.length && categories.some((item) => item.label)) {
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
          category={categories[0]?.id ? categories[0] : undefined}
          componentFlag={componentFlag}
          key={`${name}.TotalWrapper`}
        />{" "}
      </CUI.Box>
    );
  }

  return (
    <CUI.Box>
      <CUI.Heading size={"sm"} key={`totalNDRHeader`}>
        {totalQual.label}
      </CUI.Heading>
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
    rateCalculation,
  } = usePerformanceMeasureContext();
  const rateArrays: React.ReactElement[][] = [];

  //categories at this point has been filtered by excludeFromOMS
  categories?.forEach((cat) => {
    const ndrSets: React.ReactElement[] = [];

    if (IUHHPerformanceMeasureArray) {
      const quals = IUHHPerformanceMeasureArray.flatMap((arr) =>
        arr.filter(
          (rate) =>
            rate.uid?.includes(cat.id) &&
            (calcTotal ? !rate.uid?.includes("Total") : true)
        )
      );

      quals?.forEach((qual) => {
        const cleanedName = `${name}.rates.${qual.uid}`;

        // Confirm that there is at least 1 rate complete
        const rate1 = qual.fields?.[2]?.value ? true : false;
        const rate2 = qual.fields?.[4]?.value ? true : false;
        const rate3 = qual.fields?.[5]?.value ? true : false;
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
                  label: qual.label,
                },
              ]}
              categoryName={""}
            />
          );
        }
      });
    } else if (performanceMeasureArray) {
      //Used performanceMeasureArray over qualifiers because in OMS, we want to capture OMS n/d/r from performance measure qualifiers that had values added
      const rateQuals = performanceMeasureArray.flatMap((arr) =>
        arr.filter(
          (rate) =>
            rate.uid?.includes(cat.id) &&
            (calcTotal ? !rate.uid?.includes("Total") : true)
        )
      );

      //performanceMeasureArray does not do a filter for excludedFromOMS so we need a second filter to remove excluded qualifiers from oms.
      const unexcludedQuals = rateQuals.filter((rateQual) =>
        qualifiers.find((qual) => rateQual.uid?.includes(qual.id))
      );

      unexcludedQuals?.forEach((qual) => {
        if (qual.rate) {
          const adjustedName = `${name}.rates.${qual.uid}`; //uid is both category id appended to qualifier id

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
              rateCalc={rateCalculation}
              rates={[
                {
                  id: 0,
                  label: qual.label,
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
const useRatesForCompletedPmQualifiers: RateArrayBuilder = (name) => {
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
    rateMultiplicationValue,
    AIFHHPerformanceMeasureArray,
    rateReadOnly,
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
    rateCalculation,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  /*
   * Each qualifier should only show in OMS if the rate for that qualifier
   * has been filled out in the Performance Measure.
   * This is determined by pulling the qualifier ID out of the rate UID.
   */
  const completedQualifierIds = performanceMeasureArray?.[0]
    ?.filter((qualRateFields) => qualRateFields?.rate)
    .map((qualRateFields) => qualRateFields.uid?.split(".")[1]);

  quals?.forEach((singleQual, qualIndex) => {
    const categoryID = categories[0]?.id
      ? categories[0].id
      : DC.SINGLE_CATEGORY;
    const cleanedName = `${name}.rates.${categoryID}.${singleQual.id}`;

    if (completedQualifierIds?.includes(singleQual.id)) {
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
          rateCalc={rateCalculation}
          rates={[{ id: 0 }]}
        />,
      ]);
    } else if (AIFHHPerformanceMeasureArray) {
      AIFHHPerformanceMeasureArray?.forEach((measure) => {
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
  const { categories, qualifiers, calcTotal, customPrompt } =
    usePerformanceMeasureContext();

  const qualRates = useRatesForCompletedPmQualifiers(name);
  const standardRates = useStandardRateArray(name);
  const rateArrays =
    !categories.length || !categories.some((item) => item.label)
      ? qualRates
      : standardRates;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const { watch } = useFormContext<Types.DataSource>();
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  const shouldDisplay =
    dataSourceWatch?.[0] !== "AdministrativeData" ||
    dataSourceWatch?.length !== 1;

  const checkbox = categories.some((cat) => cat.label) ? categories : quals;
  checkbox?.forEach((value, idx) => {
    if (rateArrays?.[idx]?.length) {
      const ageGroupCheckBox = {
        value: value.id,
        displayValue: value.text,
        children: [
          <CUI.Heading
            key={`${name}.rates.${value.id}Header`}
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
            key={`${name}.rates.${value.id}HeaderHelper`}
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

  return (
    <>
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
    return { label: qual.label, id: i };
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
      const cleanedFieldName = `${DC.OPM_KEY}${cleanString(description)}`;

      const RateComponent = (
        <QMR.Rate
          rates={[
            {
              id: 0,
            },
          ]}
          name={`${name}.rates.OPM.${cleanedFieldName}`}
          key={`${name}.rates.OPM.${cleanedFieldName}`}
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
