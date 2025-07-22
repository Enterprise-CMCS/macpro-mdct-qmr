import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { OmsNode } from "shared/types";

import { cleanString } from "utils/cleanString";
import { AnyObject } from "types";
import { featuresByYear } from "utils/featuresByYear";
import { Accordion } from "components/Accordion";
import { NDRSetsAccordion } from "./NDR/ndrSets";
import { SubCatSection } from "../OptionalMeasureStrat/subCatClassification";
import { AddAnotherSectionAccordian } from "../OptionalMeasureStrat/additionalCategory";
import { useFlags } from "launchdarkly-react-client-sdk";

interface CheckboxChildrenProps extends OmsNode {
  /** name for react-hook-form registration */
  name: string;
  /** name of parent category for additionalCategory rendering */
  parentDisplayName: string;
  year?: number;
  accordion?: boolean;
}

interface ChildCheckBoxOptionProps {
  omsNode?: OmsNode;
  name: string;
  label?: AnyObject;
  year?: number;
}

interface NdrNodeProps {
  name: string;
  flagSubCat: boolean;
}

const omsLabels = (omsNode: OmsNode) => {
  return {
    checkboxOpt: `Are you reporting aggregate data for the ${
      omsNode.aggregateTitle || omsNode.label
    } category?`,
    YesAggregateData: `Yes, we are reporting aggregate data for the ${
      omsNode?.aggregateTitle || omsNode?.label
    } category.`,
    NoIndependentData: `No, we are reporting disaggregated data for ${
      omsNode?.aggregateTitle || omsNode?.label
    } subcategories.`,
  };
};

const NdrNode = ({ name }: NdrNodeProps) => {
  return (
    <CUI.Box key={`${name}.ndrWrapper`}>
      <NDRSetsAccordion name={`${name}.rateData`} key={`${name}.rateData`} />
    </CUI.Box>
  );
};

const NdrSubNode = (omsNode: OmsNode, flagSubCat: boolean, name: string) => {
  return (
    <>
      <QMR.Checkbox
        name={`${name}.options`}
        key={`${name}.options`}
        options={
          omsNode?.options!.map((node) => {
            return buildChildCheckboxOption({
              omsNode: node,
              name: `${name}.selections.${
                cleanString(node.id) ?? "ID_NOT_SET"
              }`,
            });
          }) || []
        }
      />
      {flagSubCat && (
        <SubCatSection name={name} flagSubLabel={omsNode.flagSubLabel} />
      )}
    </>
  );
};

/**
 * Build Sub-Category checkbox options
 * ex: Asian -> Korean, Chinese, Japanese, etc.
 */
const renderRadioButtonOptions = ({
  omsNode,
  name,
  label,
}: ChildCheckBoxOptionProps) => {
  //this was the legacy way of displaying the sub categories
  const flagYesSubCat =
    featuresByYear.hasQualCatLabels && !!omsNode?.flagSubCat;
  //in 2023, we moved the sub categories to the no option and changed the yes
  const flagNoSubCat = !featuresByYear.hasQualCatLabels;

  return [
    {
      displayValue: label?.YesAggregateData,
      value: "YesAggregateData",
      children: [<NdrNode flagSubCat={flagYesSubCat} name={name} key={name} />],
    },
    {
      displayValue: label?.NoIndependentData,
      value: "NoIndependentData",
      children: [NdrSubNode(omsNode!, flagNoSubCat, name)],
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
  label,
}: ChildCheckBoxOptionProps) => {
  let children = [];
  const id = omsNode?.id ? cleanString(omsNode.id) : "ID_NOT_SET";

  if (!omsNode?.options) {
    children = [
      <NdrNode flagSubCat={!!omsNode?.flagSubCat} name={name} key={name} />,
    ];
  }
  // catch condition for subCategory ex: Asian -> Korean
  else {
    let options = renderRadioButtonOptions({ omsNode, name, label });

    children = [
      <CUI.Box display="flex" flexDir="row">
        <QMR.RadioButton
          name={`${name}.aggregate`}
          key={`${name}.aggregate`}
          options={options}
          label={label?.checkboxOpt}
          formLabelProps={{ fontWeight: "bold" }}
          clearable
        />
      </CUI.Box>,
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
    return <NDRSetsAccordion name={`${props.name}.rateData`} />;
  }
  //a flag added in 2025, if it's turned off, it'll hide [+Add Another Sex] button
  const sogiFlag =
    useFlags()?.["sogi-stratification-options"] &&
    props.id === "O8BrOa" &&
    props.year! >= 2025;

  const checkboxOptions = [
    ...props.options.map((lvlTwoOption) => {
      return buildChildCheckboxOption({
        omsNode: lvlTwoOption,
        name: `${props.name}.selections.${lvlTwoOption.id}`,
        label: omsLabels(lvlTwoOption),
      });
    }),
  ];

  return (
    <CUI.Box key={`${props.name}.topLevelCheckbox`}>
      {checkboxOptions.map((options) => (
        <Accordion externalControlled label={options.displayValue}>
          {options.children}
        </Accordion>
      ))}
      {props.addMore && (props.id !== "O8BrOa" || sogiFlag) && (
        <AddAnotherSectionAccordian
          name={props.name}
          parentName={props.parentDisplayName}
          key={`${props.name}.AdditionalCategorySection`}
        />
      )}
    </CUI.Box>
  );
};
