import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { OmsNode } from "./data";

import { AddAnotherSection } from "./additionalCategory";
import { SubCatSection } from "./subCatClassification";
import { NDRSets } from "./NDR/ndrSets";

interface CheckboxChildrenProps extends OmsNode {
  /** name for react-hook-form registration */
  name: string;
  /** name of parent category for additionalCategory rendering */
  parentDisplayName: string;
}

interface ChildCheckBoxOptionProps {
  omsNode?: OmsNode;
  name: string;
}

interface NdrNodeProps {
  name: string;
  flagSubCat: boolean;
}

const NdrNode = ({ name }: NdrNodeProps) => {
  return (
    <CUI.Box key={`${name}.ndrWrapper`}>
      <NDRSets name={`${name}.rateData`} key={`${name}.rateData`} />
    </CUI.Box>
  );
};

/**
 * Build Sub-Category checkbox options
 * ex: Asian -> Korean, Chinese, Japanese, etc.
 */
const renderRadioButtonOptions = ({
  omsNode,
  name,
}: ChildCheckBoxOptionProps) => {
  const label = {
    YesAggregateData: `Yes, we are reporting aggregate data for the ${
      omsNode?.aggregateTitle || omsNode?.label
    } categories.`,
    NoIndependentData: `No, we are reporting disaggregated data for ${
      omsNode?.aggregateTitle || omsNode?.label
    } sub-categories`
  }

  //if year <= 2022
  const flagSubCat = !!omsNode?.flagSubCat;

  return [
    {
      displayValue: label.YesAggregateData,
      value: "YesAggregateData",
      children: [
        <NdrNode flagSubCat={flagSubCat} name={name} key={name} />,
      ],
    },
    {
      displayValue: label.NoIndependentData,
      value: "NoIndependentData",
      children: [
        <QMR.Checkbox
          name={`${name}.options`}
          key={`${name}.options`}
          options={
            omsNode?.options!.map((node) => {
              return buildChildCheckboxOption({
                omsNode: node,
                name: `${name}.selections.${node.id ?? "ID_NOT_SET"}`,
              });
            }) || []
          }
        />,
        <SubCatSection name={name} />,
      ],
    },
  ];
};

/**
 * Builds child level checkbox options
 * ex: Race -> White, African American, Asian, etc.
 */
const buildChildCheckboxOption = ({
  omsNode,
  name,
}: ChildCheckBoxOptionProps) => {
  let children = [];
  const id = omsNode?.id ? omsNode.id : "ID_NOT_SET";

  if (!omsNode?.options) {
    children = [
      <NdrNode flagSubCat={!!omsNode?.flagSubCat} name={name} key={name} />,
    ];
  }
  // catch condition for subCategory ex: Asian -> Korean
  else {
    children = [
      <QMR.RadioButton
        name={`${name}.aggregate`}
        key={`${name}.aggregate`}
        options={renderRadioButtonOptions({ omsNode, name })}
        label={`Are you reporting aggregate data for the ${
          omsNode.aggregateTitle || omsNode.label
        } category?`}
      />,
    ];
  }
  return {
    value: id,
    displayValue: omsNode?.label ?? "DISPLAY_ID_NOT_SET",
    children,
  };
};

/**
 * Renders Parent Level Children
 * ex: checkbox options, additional category, or NDR for ACA
 */
export const TopLevelOmsChildren = (props: CheckboxChildrenProps) => {
  if (!props.options) {
    return <NDRSets name={`${props.name}.rateData`} />;
  }

  return (
    <CUI.Box key={`${props.name}.topLevelCheckbox`}>
      <QMR.Checkbox
        name={`${props.name}.options`}
        key={`${props.name}.options`}
        options={[
          ...props.options.map((lvlTwoOption) => {
            const cleanedId = lvlTwoOption?.id ?? "LVL_TWO_ID_NOT_SET";

            return buildChildCheckboxOption({
              omsNode: lvlTwoOption,
              name: `${props.name}.selections.${cleanedId}`,
            });
          }),
        ]}
      />
      {props.addMore && (
        <AddAnotherSection
          name={props.name}
          flagSubCat
          parentName={props.parentDisplayName}
          key={`${props.name}.AdditionalCategorySection`}
        />
      )}
    </CUI.Box>
  );
};
