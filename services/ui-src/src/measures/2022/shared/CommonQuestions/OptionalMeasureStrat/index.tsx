import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../types";
import { OMSData, OmsNode } from "./data";
import { PerformanceMeasureProvider, ComponentFlagType } from "./context";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cleanString } from "utils/cleanString";
import { ndrFormula } from "types";
import SharedContext from "shared/SharedContext";

interface OmsCheckboxProps {
  /** name for react-hook-form registration */
  name: string;
  /** data object for dynamic rendering */
  data: OmsNode[];
  isSingleSex: boolean;
}

/**
 * Builds out parent level checkboxes
 * ex: Race, Ethnicity, Sex, Etc.
 */
export const buildOmsCheckboxes = ({
  name,
  data,
  isSingleSex,
}: OmsCheckboxProps) => {
  return data
    .filter((d) => !isSingleSex || d.id !== "Sex") // remove sex as a top level option if isSingleSex
    .map((lvlOneOption) => {
      const displayValue = lvlOneOption.id;
      const value = cleanString(lvlOneOption.id);

      const children = [
        <TopLevelOmsChildren
          options={lvlOneOption.options}
          addMore={!!lvlOneOption.addMore}
          parentDisplayName={lvlOneOption.aggregateTitle || lvlOneOption.id}
          addMoreSubCatFlag={!!lvlOneOption.addMoreSubCatFlag}
          name={`${name}.selections.${value}`}
          key={`${name}.selections.${value}`}
          id={displayValue}
        />,
      ];

      return { value, displayValue, children };
    });
};

interface BaseProps extends Types.Qualifiers, Types.Categories {
  measureName?: string;
  inputFieldNames?: string[];
  ndrFormulas?: ndrFormula[];
  /** string array for perfromance measure descriptions */
  performanceMeasureArray?: Types.RateFields[][];
  IUHHPerformanceMeasureArray?: Types.complexRateFields[][];
  AIFHHPerformanceMeasureArray?: Types.complexRateFields[][];
  /** should the total for each portion of OMS be calculated? */
  calcTotal?: boolean;
  rateMultiplicationValue?: number;
  allowNumeratorGreaterThanDenominator?: boolean;
  customMask?: RegExp;
  isSingleSex?: boolean;
  rateAlwaysEditable?: boolean;
  numberOfDecimals?: number;
  componentFlag?: ComponentFlagType;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  customPrompt?: string;
  rateCalc?: RateFormula;
}

/** data for dynamic rendering will be provided */
interface DataDrivenProp {
  /** data array for dynamic rendering */
  data: OmsNode[];
  /** cannot set adultMeasure if using custom data*/
  adultMeasure?: never;
}

/** default data is being used for this component */
interface DefaultDataProp {
  /** is this an adult measure? Should this contain the ACA portion? */
  adultMeasure: boolean;
  /** cannot set data if using default data */
  data?: never;
}

type Props = BaseProps & (DataDrivenProp | DefaultDataProp);

/** OMS react-hook-form typing */
type OMSType = Types.OptionalMeasureStratification & {
  DataSource: string[];
} & { MeasurementSpecification: string } & {
  "OtherPerformanceMeasure-Rates": Types.OtherRatesFields[];
};

const stringIsReadOnly = (dataSource: string) => {
  return dataSource === "AdministrativeData";
};

const arrayIsReadOnly = (dataSource: string[]) => {
  if (dataSource.length === 0) {
    return false;
  }
  return (
    dataSource?.every((source) => source === "AdministrativeData") ?? false
  );
};

/**
 * Final OMS built
 */
export const OptionalMeasureStrat = ({
  performanceMeasureArray,
  IUHHPerformanceMeasureArray,
  AIFHHPerformanceMeasureArray,
  qualifiers = [],
  categories = [],
  measureName,
  inputFieldNames,
  ndrFormulas,
  data,
  calcTotal = false,
  adultMeasure,
  rateMultiplicationValue,
  allowNumeratorGreaterThanDenominator = false,
  customMask,
  isSingleSex = false,
  rateAlwaysEditable,
  numberOfDecimals = 1,
  componentFlag = "DEFAULT",
  customNumeratorLabel = "Numerator",
  customDenominatorLabel = "Denominator",
  customRateLabel = "Rate",
  customPrompt,
  rateCalc,
}: Props) => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const omsData = data ?? OMSData(adultMeasure);
  const { watch, getValues, unregister } = useFormContext<OMSType>();
  const values = getValues();

  const dataSourceWatch = watch("DataSource");
  const OPM = values["OtherPerformanceMeasure-Rates"];
  const watchDataSourceSwitch = watch("MeasurementSpecification");

  const register = useCustomRegister<Types.OptionalMeasureStratification>();
  const checkBoxOptions = buildOmsCheckboxes({
    ...register("OptionalMeasureStratification"),
    data: omsData,
    isSingleSex,
  });

  let rateReadOnly = false;
  if (rateAlwaysEditable !== undefined) {
    rateReadOnly = false;
  } else if (dataSourceWatch && Array.isArray(dataSourceWatch)) {
    rateReadOnly = arrayIsReadOnly(dataSourceWatch);
  } else if (dataSourceWatch) {
    rateReadOnly = stringIsReadOnly(dataSourceWatch);
  }

  /**
   * Clear all data from OMS if the user switches from Performance Measure to Other Performance measure or vice-versa
   */
  useEffect(() => {
    return () => {
      unregister("OptionalMeasureStratification");
    };
  }, [watchDataSourceSwitch, unregister]);
  return (
    <QMR.CoreQuestionWrapper
      testid="OMS"
      label="Optional Measure Stratification"
    >
      <PerformanceMeasureProvider
        value={{
          OPM,
          performanceMeasureArray,
          IUHHPerformanceMeasureArray,
          AIFHHPerformanceMeasureArray,
          rateReadOnly,
          calcTotal,
          qualifiers,
          measureName,
          inputFieldNames,
          ndrFormulas,
          categories,
          rateMultiplicationValue,
          customMask,
          allowNumeratorGreaterThanDenominator,
          numberOfDecimals,
          componentFlag,
          customDenominatorLabel,
          customNumeratorLabel,
          customRateLabel,
          customPrompt,
          rateCalculation: rateCalc,
        }}
      >
        <CUI.Text py="3">
          {labels.OptionalMeasureStratification.section}
        </CUI.Text>
        <CUI.Text py="3">
          Do not select categories and sub-classifications for which you will
          not be reporting any data.
        </CUI.Text>
        <QMR.Checkbox
          {...register("OptionalMeasureStratification.options")}
          options={checkBoxOptions}
        />
      </PerformanceMeasureProvider>
    </QMR.CoreQuestionWrapper>
  );
};
