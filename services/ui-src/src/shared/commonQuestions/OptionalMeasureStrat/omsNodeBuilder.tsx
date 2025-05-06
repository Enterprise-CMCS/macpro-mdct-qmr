import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFlags } from "launchdarkly-react-client-sdk";

import { OmsNode } from "shared/types";

import { AddAnotherSection } from "./additionalCategory";
import { SubCatSection } from "./subCatClassification";
import { NDRSets } from "./NDR/ndrSets";
import { cleanString } from "utils/cleanString";
import { AnyObject } from "types";
import { featuresByYear } from "utils/featuresByYear";

interface CheckboxChildrenProps extends OmsNode {
  /** name for react-hook-form registration */
  name: string;
  /** name of parent category for additionalCategory rendering */
  parentDisplayName: string;
  year?: number;
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
  if (featuresByYear.hasStreamlinedOms) {
    return {
      checkboxOpt: `Are you reporting aggregate data for the ${
        omsNode.aggregateTitle || omsNode.label
      } category?`,
      YesAggregateData: `Yes, we are reporting aggregate data for the ${
        omsNode?.aggregateTitle || omsNode?.label
      } categories.`,
      NoIndependentData: `No, we are reporting disaggregated data for ${
        omsNode?.aggregateTitle || omsNode?.label
      } sub-categories`,
    };
  }
  return {
    checkboxOpt: `Are you only reporting aggregated data for all ${
      omsNode.aggregateTitle || omsNode.id
    } categories?`,
    YesAggregateData: `Yes, we are only reporting aggregated data for all ${
      omsNode?.aggregateTitle || omsNode?.id
    } categories.`,
    NoIndependentData: `No, we are reporting independent data for all ${
      omsNode?.aggregateTitle || omsNode?.id
    } categories`,
  };
};

const NdrNode = ({ flagSubCat, name }: NdrNodeProps) => {
  return (
    <CUI.Box key={`${name}.ndrWrapper`}>
      <NDRSets name={`${name}.rateData`} key={`${name}.rateData`} />
      {/* flagSubCat is only used for year <= 2022 */}
      {flagSubCat && <SubCatSection name={name} />}
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
      {flagSubCat && <SubCatSection name={name} />}
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
    children = [
      <QMR.RadioButton
        name={`${name}.aggregate`}
        key={`${name}.aggregate`}
        options={renderRadioButtonOptions({ omsNode, name, label })}
        label={label?.checkboxOpt}
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

  const sogiFlag =
    !useFlags()?.["sogi"] && props.id === "O8BrOa" && props.year! >= 2025;

  return (
    <CUI.Box key={`${props.name}.topLevelCheckbox`}>
      <QMR.Checkbox
        name={`${props.name}.options`}
        key={`${props.name}.options`}
        options={[
          ...props.options.map((lvlTwoOption) => {
            //cleanString is used for year <= 2022 options, and has no effect on year >= 2023 ids
            const cleanedId =
              cleanString(lvlTwoOption?.id) ?? "LVL_TWO_ID_NOT_SET";

            const labels = omsLabels(lvlTwoOption);

            return buildChildCheckboxOption({
              omsNode: lvlTwoOption,
              name: `${props.name}.selections.${cleanedId}`,
              label: labels,
            });
          }),
        ]}
      />
      {props.addMore && !sogiFlag && (
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
