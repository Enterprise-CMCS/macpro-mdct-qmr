import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

import { CompFlagType, usePerformanceMeasureContext } from "./context";
import { cleanString, useTotalAutoCalculation } from "./omsUtil";

interface NdrProps {
  name: string;
}

interface TotalProps {
  name: string;
  compFlag: CompFlagType;
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
  compFlag,
  qualifier,
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
  useTotalAutoCalculation({ name, cleanedCategory, compFlag });

  if (compFlag === "IU") {
    return (
      <QMR.IUHHRate
        key={cleanedName}
        name={cleanedName}
        readOnly={rateReadOnly}
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
      />
    );
  }
};

/** OMS Total wrapper for any variation of qulaifier and category combination*/
const TotalNDRSets = ({
  compFlag = "DEFAULT",
  name,
}: {
  compFlag?: CompFlagType;
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
            compFlag={compFlag}
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
          compFlag={compFlag}
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
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    IUHHPerformanceMeasureArray,
    rateMultiplicationValue,
    rateReadOnly,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  quals?.forEach((singleQual, qualIndex) => {
    const ndrSets: React.ReactElement[] = [];
    if (IUHHPerformanceMeasureArray) {
      IUHHPerformanceMeasureArray?.forEach((measure, idx) => {
        const cleanedName = `${name}.rates.${cleanString(
          singleQual
        )}.${cleanString(categories[idx])}`;
        const rate1 = measure?.[qualIndex]?.fields?.[2]?.value ? true : false;
        const rate2 = measure?.[qualIndex]?.fields?.[4]?.value ? true : false;
        const rate3 = measure?.[qualIndex]?.fields?.[5]?.value ? true : false;
        if (rate1 || rate2 || rate3) {
          ndrSets.push(
            <QMR.IUHHRate
              readOnly={rateReadOnly}
              name={cleanedName}
              key={cleanedName}
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
        const cleanedName = `${name}.rates.${cleanString(
          singleQual
        )}.${cleanString(categories[idx])}`;
        if (measure?.[qualIndex]?.rate) {
          ndrSets.push(
            <QMR.Rate
              readOnly={rateReadOnly}
              name={cleanedName}
              key={cleanedName}
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
    }

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
  const { categories, qualifiers, calcTotal } = usePerformanceMeasureContext();

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
          <CUI.Heading
            pt="1"
            key={`${name}.rates.${cleanedLabel}HeaderHelper`}
            size={"sm"}
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

const IUNDRSets = ({ name }: NdrProps) => {
  const { calcTotal } = usePerformanceMeasureContext();

  const ageGroupsOptions = useAgeGroupsCheckboxes(name);

  return (
    <>
      <QMR.Checkbox
        name={`${name}.options`}
        key={`${name}.options`}
        options={ageGroupsOptions}
      />
      {calcTotal && (
        <TotalNDRSets
          compFlag={"IU"}
          name={name}
          key={`${name}.totalWrapper`}
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

  return (
    <>
      <CUI.Heading key={`${name}.rates.Header`} size={"sm"}>
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate
      </CUI.Heading>
      <CUI.Heading pt="1" key={`${name}.rates.HeaderHelper`} size={"sm"}>
        Please review the auto-calculated rate and revise if needed.
      </CUI.Heading>
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
    case "IU":
      if (!OPM) {
        children.push(<IUNDRSets name={name} key={name} />);
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
