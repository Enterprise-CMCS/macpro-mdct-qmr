import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "./../../types";
import { OMSData } from "./data";
import { PerformanceMeasureProvider, ComponentFlagType } from "./context";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ndrFormula } from "types";
import { LabelData, cleanString } from "utils";
import SharedContext from "shared/SharedContext";

interface OmsCheckboxProps {
  /** name for react-hook-form registration */
  name: string;
  /** data object for dynamic rendering */
  data: Types.OmsNode[];
  isSingleSex: boolean;
  year: number;
}

/**
 * Builds out parent level checkboxes
 * ex: Race, Ethnicity, Sex, Etc.
 */
export const buildOmsCheckboxes = ({
  name,
  data,
  isSingleSex,
  year,
}: OmsCheckboxProps) => {
  return data
    .filter((d) => !isSingleSex || (d.id !== "O8BrOa" && d.id !== "Sex")) // remove sex as a top level option if isSingleSex
    .map((lvlOneOption) => {
      const displayValue = lvlOneOption.label;
      const value = cleanString(lvlOneOption.id);

      const children = [
        <TopLevelOmsChildren
          options={lvlOneOption.options}
          addMore={!!lvlOneOption.addMore}
          parentDisplayName={
            lvlOneOption.aggregateTitle! || lvlOneOption.label!
          }
          addMoreSubCatFlag={!!lvlOneOption.addMoreSubCatFlag}
          name={`${name}.selections.${value}`}
          key={`${name}.selections.${value}`}
          id={value}
          label={displayValue}
          year={year}
        />,
      ];

      return { value, displayValue, children };
    });
};

interface BaseProps extends Types.Qualifiers, Types.Categories {
  measureName?: string;
  inputFieldNames?: LabelData[];
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
  data: Types.OmsNode[];
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
  const year = labels.year;

  const omsData = data ?? OMSData(year, adultMeasure);
  const { control, watch, getValues, setValue, unregister } =
    useFormContext<OMSType>();
  const values = getValues();

  const dataSourceWatch = watch("DataSource");
  const watchDataSourceSwitch = watch("MeasurementSpecification");
  //For some reason, this component grabs OPM data when it's showing OMS data. Removing OPM data directly causes things to break
  const OPM =
    watchDataSourceSwitch === "Other"
      ? values["OtherPerformanceMeasure-Rates"]
      : undefined;

  const register = useCustomRegister<Types.OptionalMeasureStratification>();
  const checkBoxOptions = buildOmsCheckboxes({
    ...register("OptionalMeasureStratification"),
    data: omsData,
    isSingleSex,
    year,
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
      //unregister does not clean the data properly
      //setValue only handles it on the surface but when you select a checkbox again, it repopulates with deleted data
      setValue("OptionalMeasureStratification", {
        options: [],
        selections: {},
      });
      //this is definitely the wrong way to fix this issue but it cleans a layer deeper than setValue, we need to use both
      control._defaultValues.OptionalMeasureStratification = {
        options: [],
        selections: {},
      };
      unregister("OptionalMeasureStratification.options");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDataSourceSwitch]);

  let cleanedQual = qualifiers;
  let cleanedCat = categories;

  if (typeof qualifiers[0] !== "string") {
    cleanedQual = (qualifiers as Types.QualifierLabelData[]).filter(
      (qual) => !qual.excludeFromOMS
    );
    cleanedCat = (categories as Types.CategoryLabelData[]).filter(
      (cat) => !cat.excludeFromOMS
    );
  }

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
          qualifiers: cleanedQual,
          measureName,
          inputFieldNames,
          ndrFormulas,
          categories: cleanedCat,
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
        {labels.OptionalMeasureStratification.additionalContext && (
          <QMR.TextArea
            label={labels.OptionalMeasureStratification.additionalContext}
            {...register("OptionalMeasureStratification.additionalContext")}
          />
        )}
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
