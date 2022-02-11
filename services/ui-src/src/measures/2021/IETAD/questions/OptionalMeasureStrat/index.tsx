// Left off working on NDRs

import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";

import { Measure } from "../../validation/types";
import { OMSData } from "../data/OMSData";

import { PerformanceMeasureProvider } from "./context";
import { TopLevelOmsChildren } from "./omsNodeBuilder";

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
    <PerformanceMeasureProvider
      value={{ OPM, performanceMeasureArray, rateReadOnly }}
    >
      <QMR.Checkbox
        {...register("OptionalMeasureStratification.options")}
        options={checkBoxOptions}
      />
    </PerformanceMeasureProvider>
  );
};
