import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as QMR from "components";
import { LabelData, stringToLabelData } from "utils";
import { ComponentFlagType, usePerformanceMeasureContext } from "../context";
import { useTotalAutoCalculation } from "../omsUtil";

interface TotalProps {
  name: string;
  componentFlag: ComponentFlagType;
  qualifier?: LabelData;
  category?: LabelData;
}

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

  const lastQualifier = qualifier ?? stringToLabelData(qualifiers).slice(-1)[0];
  const cleanedQualifier = lastQualifier.id;
  const cleanedCategory = category.id;

  const type = typeof qualifiers[0] === "string" || qualifiers[0].isLegacy;
  const cleanedName = type
    ? `${name}.rates.${cleanedQualifier}.${cleanedCategory}`
    : `${name}.rates.${cleanedCategory}.${cleanedQualifier}`;

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
export const TotalNDRSets = ({
  componentFlag = "DEFAULT",
  name,
}: {
  componentFlag?: ComponentFlagType;
  name: string;
}) => {
  const rateArray: React.ReactElement[] = [];

  const { qualifiers, categories } = usePerformanceMeasureContext();
  const cleanedCategories: LabelData[] = stringToLabelData(categories);
  const cleanedQualifiers: LabelData[] = stringToLabelData(qualifiers);
  const totalQual = cleanedQualifiers.slice(-1)[0];

  const type = typeof qualifiers[0] === "string" || qualifiers[0].isLegacy;
  const ndrCategory =
    !type && cleanedCategories[0]?.id ? cleanedCategories[0] : undefined;

  if (
    cleanedCategories.length &&
    cleanedCategories.some((item) => item.label)
  ) {
    cleanedCategories.forEach((cat, idx) => {
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
          category={ndrCategory}
          componentFlag={componentFlag}
          key={`${name}.TotalWrapper`}
        />{" "}
      </CUI.Box>
    );
  }

  return (
    <CUI.Box>
      {type && <CUI.Divider key={`totalNDRDivider`} mt={2} mb={5} />}
      {categories.length > 0 && (
        <CUI.Heading size={"sm"} key={`totalNDRHeader`}>
          {totalQual.label}
        </CUI.Heading>
      )}
      <CUI.Box>{rateArray}</CUI.Box>
    </CUI.Box>
  );
};
