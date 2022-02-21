// Left off working on NDRs

import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useFormContext } from "react-hook-form";

import * as Types from "../types";
import { OMSData } from "./OMSData";

import { PerformanceMeasureProvider } from "./context";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import * as CUI from "@chakra-ui/react";
import { useEffect } from "react";

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

interface Props extends Types.AgeGroups, Types.PerformanceMeasureDescriptions {
  performanceMeasureArray: Types.RateFields[][];
}

/**
 * Final OMS built
 */

type OMSType = Types.OptionalMeasureStratification & {
  DataSource: string[];
} & { MeasurementSpecification: string } & {
  "OtherPerformanceMeasure-Rates": Types.OtherRatesFields[];
};

export const OptionalMeasureStrat = ({
  performanceMeasureArray,
  ageGroups,
  performanceMeasureDescriptions,
}: Props) => {
  const { watch, getValues, unregister } = useFormContext<OMSType>();
  const data = getValues();

  const dataSourceWatch = watch("DataSource");
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const watchDataSourceSwitch = watch("MeasurementSpecification");

  const register = useCustomRegister();
  const checkBoxOptions = buildOmsCheckboxes({
    ...register("OptionalMeasureStratification"),
  });

  const rateReadOnly =
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data."
    ) ?? true;

  /**
   * Clear all data from OMS if the user switches from Performance Measure to Other Performance measure or vice-versa
   */
  useEffect(() => {
    return () => {
      unregister("OptionalMeasureStratification");
    };
  }, [watchDataSourceSwitch, unregister]);

  return (
    <QMR.CoreQuestionWrapper label="Optional Measure Stratification">
      <PerformanceMeasureProvider
        value={{
          OPM,
          performanceMeasureArray,
          rateReadOnly,
          calcTotal: true,
          ageGroups,
          performanceMeasureDescriptions,
        }}
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
