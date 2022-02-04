import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { createContext, useState, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { OMSData, OmsNode } from "./data/OMSData";
import {
  ageGroups,
  performanceMeasureDescriptions,
} from "./data/performanceMeasureData";

interface HookFormProps {
  name: string;
}

/**
 * Builds the NDR Sets for "AgeGroups" given
 */
const AgeGroupNDRSets = ({}: HookFormProps) => {
  return <div />;
};

/**
 * Build Additional SubCategory/Classification Section for Race fields and the associated Button
 */
const buildSubCatSection = ({}: HookFormProps): JSX.Element[] => {
  return [<div />];
};

/**
 * Builds child level checkbox options
 * ex: Race -> White, African American, Asian, etc.
 */
const buildChildCheckboxOption = (omsNode: OmsNode): QMR.CheckboxOption => {
  return {
    value: omsNode.id.replace(/,| |\//g, ""),
    displayValue: omsNode.id,
    children: [
      ...(!omsNode.options
        ? [
            <AgeGroupNDRSets
              name={"TODO: registration name"}
              key={"Use whatever is in name"}
            />,
            ...(!omsNode.flagSubCat
              ? []
              : buildSubCatSection({ name: "TODO: registration name" })),
          ]
        : [
            <QMR.RadioButton
              name="TODO: registration name"
              key={"Use whatever we decide on the name being"}
              options={[
                {
                  value: `Yes, we are only reporting aggregated data for all ${
                    omsNode.aggregateTitle || omsNode.id
                  } categories.`,
                  displayValue: "YesAggregateData",
                  children: [
                    <AgeGroupNDRSets
                      name={"TODO: registration name"}
                      key={"Use whatever is in name"}
                    />,
                  ],
                },
                {
                  value: `No, we are reporting independent data for all ${
                    omsNode.aggregateTitle || omsNode.id
                  } categories`,
                  displayValue: "NoIndependentData",
                  children: [
                    <QMR.Checkbox
                      name={"TODO: registration name"}
                      key={"Use whatever name is"}
                      options={omsNode.options.map((item) => {
                        return buildChildCheckboxOption(item);
                      })}
                    />,
                  ],
                },
              ]}
            />,
          ]),
    ],
  };
};

/**
 * Build Additional Major Options and the associated AddAnother Button
 * ex: AdditionalRace fields
 */
 const buildAddAnotherSection = ({}: HookFormProps): QMR.CheckboxOption[] => {
  return [
    {
      value: "",
      displayValue: "",
    },
  ];
};

const buildAddAnotherButton = (parentDisplayName: string) => {
  return 
  <div>
    `Add Another ${parentDisplayName}`
  </div>
};


const buildCheckBoxChildren = (
  options: OmsNode[] | undefined,
  addMore: boolean,
  parentId: string,
  parentDisplayName: string
) => {
  if (!options) {
    return [
      <AgeGroupNDRSets
        name={"TODO: registration name"}
        key={"Use whatever is in name"}
      />,
    ];
  }
  
  const arrayOfMoreOptions = [...stateVarWithExistingOptions];
  if(addMore){
    arrayOfMoreOptions = [...arrayOfMoreOptions, ...functionthatdoesathing(?)]
  }
  return [
    <QMR.Checkbox
      name={"TODO: registration name"}
      key={"Use whatever we decide on the name being"}
      options={[
        ...options.map((lvlTwoOption) => {
          return buildChildCheckboxOption(lvlTwoOption);
        }),
      ]}
    />,
    ...(addMore
      ? [buildAddAnotherButton(`Additional-${parentId}`, parentDisplayName)]
      : []),
  ];
};

/**
 * Builds out parent level checkboxes
 * ex: Race, Ethnicity, Sex, Etc.
 */
const buildCheckboxes = (
  OPM: any,
  performanceMeasureArray: any
): QMR.CheckboxOption[] => {
  return OMSData.map((lvlOneOption) => {
    const value = lvlOneOption.id.replace(/,| |\//g, "");
    const displayValue = lvlOneOption.id;
    const children = buildCheckBoxChildren(
      lvlOneOption.options,
      !!lvlOneOption.addMore,
      value,
      lvlOneOption.id
    );
    return { value, displayValue, children };
  });
};

/**
 * Final OMS built
 */
export const OMS2 = (data: Measure.Form) => {
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
  const checkBoxOptions = buildCheckboxes(OPM, performanceMeasureArray);

  return (
    <QMR.Checkbox
      {...register("CategoriesReported")}
      options={checkBoxOptions}
    />
  );
};
