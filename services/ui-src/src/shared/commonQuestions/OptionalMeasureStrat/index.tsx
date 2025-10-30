import * as DC from "dataConstants";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "./../../types";
import { OMSData } from "./data";
import { PerformanceMeasureProvider } from "./context";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { arrayIsReadOnly, cleanString, stringIsReadOnly } from "utils";
import SharedContext from "shared/SharedContext";

/**
 * Builds out parent level checkboxes
 * ex: Race, Ethnicity, Sex, Etc.
 */
export const buildOmsCheckboxes = ({
  name,
  data,
  excludeOptions,
  year,
}: Types.OmsCheckboxProps) => {
  return data
    .filter((d) => !excludeOptions.find((options) => options === d.id)) //remove any options the measure wants to exclude
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

/**
 * Final OMS built
 */
export const OptionalMeasureStrat = ({
  performanceMeasureArray,
  qualifiers = [],
  categories = [],
  measureName,
  inputFieldNames,
  ndrFormulas,
  data,
  calcTotal = false,
  coreset,
  rateMultiplicationValue,
  allowNumeratorGreaterThanDenominator = false,
  customMask,
  excludeOptions = [],
  rateAlwaysEditable,
  numberOfDecimals = 1,
  componentFlag = "DEFAULT",
  customNumeratorLabel = "Numerator",
  customDenominatorLabel = "Denominator",
  customRateLabel = "Rate",
  customPrompt,
  rateCalc,
}: Types.OMSProps) => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);
  const year = labels.year;

  const IUHHPerformanceMeasureArray =
    measureName === "IUHH" ? performanceMeasureArray : undefined;
  const AIFHHPerformanceMeasureArray =
    measureName === "AIFHH" ? performanceMeasureArray : undefined;

  if (IUHHPerformanceMeasureArray || AIFHHPerformanceMeasureArray)
    performanceMeasureArray = undefined;

  const omsData = data ?? OMSData(year, coreset === "adult");
  const { control, watch, getValues, setValue, unregister } =
    useFormContext<Types.OMSType>();
  const values = getValues();

  const dataSourceWatch = watch("DataSource");
  const watchDataSourceSwitch = watch("MeasurementSpecification");
  //For some reason, this component grabs OPM data when it's showing OMS data. Removing OPM data directly causes things to break
  const OPM =
    watchDataSourceSwitch === "Other"
      ? values["OtherPerformanceMeasure-Rates"]
      : undefined;

  const checkBoxOptions = buildOmsCheckboxes({
    name: DC.OMS,
    data: omsData,
    excludeOptions,
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
      /*
       * unregister does not clean the data properly
       * setValue only handles it on the surface but when you select a checkbox again, it repopulates with deleted data
       */
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

  //filter out cat & qual that do not want to capture OMS data
  const cleanedQual = (qualifiers as Types.QualifierLabelData[]).filter(
    (qual) => !qual.excludeFromOMS
  );
  const cleanedCat = (categories as Types.CategoryLabelData[]).filter(
    (cat) => !cat.excludeFromOMS
  );

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
            key={"OptionalMeasureStratification.additionalContext"}
            name={"OptionalMeasureStratification.additionalContext"}
            label={labels.OptionalMeasureStratification.additionalContext}
          />
        )}
        <CUI.Text py="3">
          Do not select categories and sub-classifications for which you will
          not be reporting any data.
        </CUI.Text>
        <QMR.Checkbox
          key={"OptionalMeasureStratification.options"}
          name={"OptionalMeasureStratification.options"}
          options={checkBoxOptions}
        />
      </PerformanceMeasureProvider>
    </QMR.CoreQuestionWrapper>
  );
};
