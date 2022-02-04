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
const renderNDRSets = () => {
  return <div />;
};

const AgeGroupNDRSets = ({}: HookFormProps) => {
  return <div />;
};

/**
 * Build Additional SubCategory/Classification Section for Race fields and the associated Button
 */
const buildSubCatSection = ({}: HookFormProps): JSX.Element[] => {
  const [addtnlSubCat, setAddtnlSubCat] = useState<OmsNode[]>([]);
  const addAddtnlSubCat = () => {
    setAddtnlSubCat((oldArray) => [
      ...oldArray,
      { id: "Additional/Alternative Classification/Sub-Category" },
    ]);
  };

  //registration will be wonky
  return [
    <QMR.Checkbox
      name="TODO: registration name"
      key="copy name"
      options={addtnlSubCat.map((item, idx) => {
        return {
          value: `${item.id}.${idx}`.replace(/,| |\//g, ""),
          displayValue: item.id,
          children: [
            <QMR.TextInput name="TODO: registration" key="use name" />,
            renderNDRSets(),
          ],
        };
      })}
    />,
    buildAddAnotherButton(addAddtnlSubCat, "Sub-Category"),
  ];
};

const renderRadioButtonOptions = (omsNode: OmsNode) => {
  return [
    {
      value: `Yes, we are only reporting aggregated data for all ${
        omsNode.aggregateTitle || omsNode.id
      } categories.`,
      displayValue: "YesAggregateData",
      children: [renderNDRSets(), ...buildSubCatSection({ name: "TODO" })],
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
          options={omsNode.options!.map((item) => {
            return buildChildCheckboxOption(item);
          })}
        />,
      ],
    },
  ];
};

/**
 * Builds child level checkbox options
 * ex: Race -> White, African American, Asian, etc.
 */
const buildChildCheckboxOption = (omsNode: OmsNode): QMR.CheckboxOption => {
  const value = omsNode.id.replace(/,| |\//g, "");
  const displayValue = omsNode.id;
  let children = [];
  if (!omsNode.options) {
    children = [
      renderNDRSets(),
      ...(!omsNode.flagSubCat
        ? []
        : buildSubCatSection({ name: "TODO: registration name" })),
    ];
  } else {
    children = [
      <QMR.RadioButton
        name="TODO: registration name"
        key={"Use whatever we decide on the name being"}
        options={renderRadioButtonOptions(omsNode)}
      />,
    ];
  }
  return {
    value,
    displayValue,
    children,
  };
};

const buildAddAnotherButton = (
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  additionalText?: string
) => {
  return (
    <QMR.ContainedButton
      buttonText={"+ Add Another " + additionalText}
      buttonProps={{
        variant: "outline",
        colorScheme: "blue",
        textTransform: "capitalize",
      }}
      onClick={onClick}
    />
  );
};

const buildCheckBoxChildren = (
  options: OmsNode[] | undefined,
  addMore: boolean,
  // parentId: string,
  parentDisplayName: string,
  addMoreSubCatFlag: boolean
) => {
  const [addtnlOptions, setAddtnlOptions] = useState<OmsNode[]>([]);

  const addAnotherAddtnl = () => {
    setAddtnlOptions((oldArray) => [
      ...oldArray,
      { id: `Additional ${parentDisplayName}`, flagSubCat: addMoreSubCatFlag },
    ]);
  };

  if (!options) {
    return [renderNDRSets()];
  }

  const combinedOptions = [...options, ...addtnlOptions];

  return [
    <QMR.Checkbox
      name={"TODO: registration name"}
      key={"Use whatever we decide on the name being"}
      options={[
        ...combinedOptions.map((lvlTwoOption) => {
          return buildChildCheckboxOption(lvlTwoOption);
        }),
      ]}
    />,
    ...(addMore
      ? [buildAddAnotherButton(addAnotherAddtnl, parentDisplayName)]
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
      // value,
      lvlOneOption.id,
      !!lvlOneOption.addMoreSubCatFlag
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

const currentOMSState = [];
