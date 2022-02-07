// Left off working on NDRs

import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { createContext, useState, useContext } from "react";
import { OMSData, OmsNode } from "./data/OMSData";
import {
  ageGroups,
  performanceMeasureDescriptions,
} from "./data/performanceMeasureData";
import { useFormContext } from "react-hook-form";

interface HookFormProps {
  name: string;
}

// Expects an array of strings and numbers
const generateUniqueId = (inputs: any[]) => {
  let uniqueId = "";
  inputs.forEach((input) => {
    uniqueId = uniqueId + String(input);
  });
  uniqueId = uniqueId.replace(/,| |\//g, "");
  return uniqueId;
};

//Builds Base level NDR Sets
const renderNDRSets = (uniqueId: string) => {
  const { OPM } = useContext(PerformanceMeasureContext);
  if (OPM) {
    return [OPMNDRSets({ name: "nothing1" }, uniqueId)];
  }
  return [AgeGroupNDRSets({ name: "nothing2" }, uniqueId)];
};

const renderSingleNdrWithLabel = (uniqueId: string, label: string) => {
  const { rateReadOnly } = useContext(PerformanceMeasureContext);
  return (
    <QMR.Rate
      readOnly={rateReadOnly}
      name={uniqueId}
      key={uniqueId}
      rates={[
        {
          id: 0,
          label: label,
        },
      ]}
    />
  );
};

const renderAgeGroupsCheckboxes = (id: string) => {
  const { performanceMeasureArray } = useContext(PerformanceMeasureContext);
  console.log(useContext(PerformanceMeasureContext));
  const checkboxes: any = [];
  ageGroups.forEach((ageGroup: string, i: number) => {
    let ndrSets: any = [];
    performanceMeasureArray &&
      performanceMeasureArray.forEach((performanceMeasure, index: number) => {
        const measureId = generateUniqueId([
          id,
          performanceMeasureDescriptions[index],
          index,
        ]);
        if (performanceMeasure[i] && performanceMeasure[i].rate) {
          ndrSets.push(
            renderSingleNdrWithLabel(
              measureId,
              performanceMeasureDescriptions[index]
            )
          );
        }
      });
    const ageGroupId = generateUniqueId([id, ageGroup]);
    const ageGroupCheckBox = {
      value: ageGroupId,
      displayValue: ageGroup,
      children: ndrSets,
    };
    checkboxes.push(ageGroupCheckBox);
  });
  return checkboxes;
};

const AgeGroupNDRSets = ({}: HookFormProps, uniqueId: string) => {
  const ageGroupsOptions = renderAgeGroupsCheckboxes(uniqueId);
  return (
    <QMR.Checkbox
      name={uniqueId}
      key={uniqueId}
      // @ts-ignore
      options={ageGroupsOptions}
    />
  );
};

// render age checkboxes
// for each age checkbox render the NDR set with description

const OPMNDRSets = ({}: HookFormProps, uniqueId: string) => {
  const { OPM, rateReadOnly } = useContext(PerformanceMeasureContext);
  return (
    <QMR.Checkbox
      name={uniqueId}
      key={uniqueId}
      // @ts-ignore
      options={OPM!.map((item, id: number) => {
        const newUniqueId = generateUniqueId([uniqueId, item.description, id]);
        return {
          value: newUniqueId,
          displayValue: item.description,
          children: [
            <CUI.Heading key={`${newUniqueId}1`}>
              Enter a number for the numerator and the denominator. Rate will
              auto-calculate
            </CUI.Heading>,
            <QMR.Rate
              rates={[
                {
                  id,
                },
              ]}
              name={newUniqueId}
              readOnly={rateReadOnly}
            />,
          ],
        };
      })}
    />
  );
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
      //@ts-ignore
      options={addtnlSubCat.map((item, idx) => {
        const uniqueId = generateUniqueId([item.id, idx]);
        return {
          value: uniqueId,
          displayValue: item.id,
          children: [
            <QMR.TextInput name="TODO: registration" key="use name" />,
            renderNDRSets(uniqueId),
          ],
        };
      })}
    />,
    buildAddAnotherButton(addAddtnlSubCat, "Sub-Category"),
  ];
};

const renderRadioButtonOptions = (omsNode: OmsNode) => {
  const uniqueId = generateUniqueId([omsNode.id]);
  return [
    {
      value: `Yes, we are only reporting aggregated data for all ${
        omsNode.aggregateTitle || omsNode.id
      } categories.`,
      displayValue: "YesAggregateData",
      children: [
        renderNDRSets(uniqueId),
        ...buildSubCatSection({ name: "TODO" }),
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
          //@ts-ignore
          options={omsNode.options!.map((item) => {
            return buildChildCheckboxOption(item, uniqueId);
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
const buildChildCheckboxOption = (omsNode: OmsNode, parentId: string) => {
  const value = generateUniqueId([parentId, omsNode.id]);
  const displayValue = omsNode.id;
  let children = [];
  if (!omsNode.options) {
    children = [
      renderNDRSets(value),
      ...(!omsNode.flagSubCat
        ? []
        : buildSubCatSection({ name: `Add Additional ${displayValue}` })),
    ];
  } else {
    children = [
      <QMR.RadioButton
        name={displayValue}
        key={value}
        //@ts-ignore
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
  const uniqueId = generateUniqueId([parentDisplayName]);
  const addAnotherAddtnl = () => {
    setAddtnlOptions((oldArray) => [
      ...oldArray,
      { id: `Additional ${parentDisplayName}`, flagSubCat: addMoreSubCatFlag },
    ]);
  };

  if (!options) {
    return [renderNDRSets(uniqueId)];
  }

  const combinedOptions = [...options, ...addtnlOptions];
  return [
    <QMR.Checkbox
      name={parentDisplayName}
      key={uniqueId}
      //@ts-ignore
      options={[
        ...combinedOptions.map((lvlTwoOption) => {
          return buildChildCheckboxOption(lvlTwoOption, uniqueId);
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
const buildCheckboxes = () => {
  return OMSData.map((lvlOneOption) => {
    const value = generateUniqueId([lvlOneOption.id]);
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

interface contextProps {
  OPM: any[];
  performanceMeasureArray: any[][];
  rateReadOnly: boolean;
}

const PerformanceMeasureContext = createContext<contextProps>({});
/**
 * Final OMS built
 */
export const OMS2 = (data: Measure.Form) => {
  const { watch } = useFormContext<Measure.Form>();
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
  const checkBoxOptions = buildCheckboxes();

  return (
    <PerformanceMeasureContext.Provider
      value={{ OPM, performanceMeasureArray, rateReadOnly }}
    >
      <QMR.Checkbox
        {...register("CategoriesReported")}
        //@ts-ignore
        options={checkBoxOptions}
      />
    </PerformanceMeasureContext.Provider>
  );
};
