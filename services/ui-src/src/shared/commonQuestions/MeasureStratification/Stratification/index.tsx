import * as DC from "dataConstants";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../../../types";
import { TopLevelOmsChildren } from "../omsNodeBuilder";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  arrayIsReadOnly,
  cleanString,
  getFilledKeys,
  stringIsReadOnly,
} from "utils";
import { PerformanceMeasureProvider } from "shared/commonQuestions/OptionalMeasureStrat/context";
import { useUser } from "hooks/authHooks";
import { UserRoles } from "types";
import { usePathParams } from "hooks/api/usePathParams";

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
  overrideAccordion,
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
          overrideAccordion={overrideAccordion}
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
  const { control, watch, getValues, setValue, unregister } = useFormContext<
    Types.OMSType & Types.OptionalMeasureStratification
  >();
  const values = getValues();
  const { userRole } = useUser();
  const { measureId } = usePathParams();

  const dataSourceWatch = watch("DataSource");
  const watchDataSourceSwitch = watch("MeasurementSpecification");
  const watchStratification = watch("OptionalMeasureStratification.selections");
  //For some reason, this component grabs OPM data when it's showing OMS data. Removing OPM data directly causes things to break
  const OPM =
    watchDataSourceSwitch === "Other"
      ? values["OtherPerformanceMeasure-Rates"]
      : undefined;

  //utilize for internalusers as they have a read only mode. we want to expand the accordion only if it has data filled in
  const overrideAccordion = (option: string) => {
    //only state users enter data, all other users are read only
    const isReadOnly = userRole !== UserRoles.STATE_USER;

    if (isReadOnly || measureId === "pdf") {
      const keys = getFilledKeys(watchStratification);
      return keys.some((key) => key.includes(option));
    }
    return false;
  };

  const checkBoxOptions = buildOmsCheckboxes({
    name: DC.OMS,
    data: omsData,
    excludeOptions,
    year,
    overrideAccordion,
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
          Do not select categories and subcategories for which your state does
          not collect data.
        </CUI.Text>
        <CUI.Text>
          For each category and subcategory, enter a number for the numerator
          and denominator. The rate will auto-calculate but can be revised if
          needed.
        </CUI.Text>
        <CUI.UnorderedList
          my={6}
          aria-label="accordion controls"
          variant="links"
          display="flex"
        >
          <CUI.ListItem>
            <CUI.Button variant="outline-primary">Expand all</CUI.Button>
          </CUI.ListItem>
          <CUI.ListItem>
            <CUI.Button variant="outline-primary" ml={6}>
              Collapse all
            </CUI.Button>
          </CUI.ListItem>
        </CUI.UnorderedList>
        {checkBoxOptions.map((option) => (
          <QMR.Accordion
            externalControlled
            label={option.displayValue}
            overrideExpand={overrideAccordion(option.value)}
          >
            {option.children}
          </QMR.Accordion>
        ))}
      </PerformanceMeasureProvider>
    </QMR.CoreQuestionWrapper>
  );
};
