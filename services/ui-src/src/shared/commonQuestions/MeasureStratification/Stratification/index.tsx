import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../../../types";
import { TopLevelOmsChildren } from "../omsNodeBuilder";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { arrayIsReadOnly, cleanString, stringIsReadOnly } from "utils";
import { Accordion } from "components/Accordion";
import { PerformanceMeasureProvider } from "shared/commonQuestions/OptionalMeasureStrat/context";

/**
 * Builds out parent level checkboxes
 * ex: Race, Ethnicity, Sex, Etc.
 */
interface StratificationProps {
  year: number;
  omsData: Types.OmsNode[];
}

export const buildOmsCheckboxes = ({
  name,
  data,
  excludeOptions,
  year,
  accordion,
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
          accordion={accordion}
        />,
      ];

      return { value, displayValue, children };
    });
};

/**
 * Final OMS built
 */
export const Stratification = ({
  performanceMeasureArray,
  qualifiers = [],
  categories = [],
  measureName,
  inputFieldNames,
  ndrFormulas,
  calcTotal = false,
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
  year,
  omsData,
}: Types.OMSProps & StratificationProps) => {
  const [accordionState, setAccordionState] = useState<boolean>(true);
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

  const register = useCustomRegister<Types.OptionalMeasureStratification>();
  const checkBoxOptions = buildOmsCheckboxes({
    ...register("OptionalMeasureStratification"),
    data: omsData,
    excludeOptions,
    year,
    accordion: accordionState,
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
    if (watchDataSourceSwitch === "Other") {
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
    }
    return;
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
    <QMR.CoreQuestionWrapper testid="OMS" label="Enter Measure Stratification">
      <PerformanceMeasureProvider
        value={{
          OPM,
          performanceMeasureArray,
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
        <CUI.Text>
          Do not select categories and sub-categories for which you will not be
          reporting any data.
        </CUI.Text>
        <CUI.Text>
          For each category and sub-category, enter a number for the numerator
          and denominator. The rate will auto-calculated but can be revised if
          needed.
        </CUI.Text>
        <CUI.Box my={6}>
          <CUI.Button variant="link" onClick={() => setAccordionState(false)}>
            Expand all
          </CUI.Button>
          <CUI.Button
            variant="link"
            onClick={() => setAccordionState(true)}
            ml={6}
          >
            Collapse all
          </CUI.Button>
        </CUI.Box>
        {checkBoxOptions.map((option) => (
          <Accordion state={accordionState} label={option.displayValue}>
            {option.children}
          </Accordion>
        ))}
      </PerformanceMeasureProvider>
    </QMR.CoreQuestionWrapper>
  );
};
