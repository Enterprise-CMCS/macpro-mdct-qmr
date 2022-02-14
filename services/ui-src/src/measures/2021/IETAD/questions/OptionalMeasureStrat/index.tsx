// Left off working on NDRs

import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";

import { Measure } from "../../validation/types";
import { OMSData } from "../data/OMSData";

import { PerformanceMeasureProvider } from "./context";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import * as CUI from "@chakra-ui/react";

interface OmsCheckboxProps {
  /** name for react-hook-form registration */
  name: string;
}

/**
 * Builds out parent level checkboxes
 * ex: Race, Ethnicity, Sex, Etc.
 */
export const buildOmsCheckboxes = ({ name }: OmsCheckboxProps) => {
  return OMSData.map((lvlOneOption) => {
    const displayValue = lvlOneOption.id;
    const value = lvlOneOption.id.replace(/[^\w]/g, "");

    const children = [
      <TopLevelOmsChildren
        options={lvlOneOption.options}
        addMore={!!lvlOneOption.addMore}
        parentDisplayName={lvlOneOption.id}
        addMoreSubCatFlag={!!lvlOneOption.addMoreSubCatFlag}
        name={`${name}.selections.${value}`}
        key={`${name}.selections.${value}`}
        id={displayValue}
      />,
    ];

    return { value, displayValue, children };
  });
};

/**
 * Final OMS built
 */
export const OMS2 = () => {
  const { watch, getValues } = useFormContext<Measure.Form>();
  // retrieve data
  const data = getValues();
  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");
  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data."
    ) ?? true;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
  const register = useCustomRegister();
  const checkBoxOptions = buildOmsCheckboxes({
    ...register("OptionalMeasureStratification"),
  });

  return (
    <QMR.CoreQuestionWrapper label="Optional Measure Stratification">
      <PerformanceMeasureProvider
        value={{ OPM, performanceMeasureArray, rateReadOnly }}
      >
        <CUI.Text py="3">
          If this measure is also reported by additional
          classifications/sub-categories, e.g. racial, ethnic, sex, language,
          disability status, or geography, complete the following as applicable.
          If your state reported for classifications/sub-categories other than
          those listed below, or reported for different rate sets, please click
          on “Add Another” to add Additional/Alternative
          Classification/Sub-categories as needed.
        </CUI.Text>
        <CUI.Text py="3">
          Do not select categories and sub-classifications for which you will
          not be reporting any data. If a sub-classification is selected, the
          system will enter zeros by default and report this as the data for
          your state/territory.
        </CUI.Text>
        <QMR.Checkbox
          {...register("OptionalMeasureStratification.options")}
          options={checkBoxOptions}
        />
      </PerformanceMeasureProvider>
    </QMR.CoreQuestionWrapper>
  );
};
