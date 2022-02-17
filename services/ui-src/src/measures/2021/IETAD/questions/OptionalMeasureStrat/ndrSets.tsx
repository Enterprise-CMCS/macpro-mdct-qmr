import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { Measure } from "../../validation/types";
import { usePerformanceMeasureContext } from "./context";
import {
  ageGroups,
  performanceMeasureDescriptions,
} from "../data/performanceMeasureData";

interface NdrProps {
  /** name for react-hook-form registration */
  name: string;
}

interface AgeGroupProps {
  /** name for react-hook-form registration */
  name: string;
  /** should rate be user editable? */
  rateReadOnly: boolean;
  /** Which performance measure rates are filled in */
  performanceMeasureArray?: Measure.RateFields[][];
}

interface OPMProps {
  /** Rate fields and descs from OPM */
  OPM: Measure.OtherRatesFields[];
  /** should rate be user editable? */
  rateReadOnly: boolean;
  /** name for react-hook-form registration */
  name: string;
}

interface TotalProps {
  /** name for react-hook-form registration */
  name: string;
  /** should rate be user editable? */
  rateReadOnly: boolean;
}

interface NdrOptionBuilderProps extends AgeGroupProps {
  values: string[];
  addSecondaryRegisterTag: boolean;
}
interface NdrOptionBuilderProps extends AgeGroupProps {
  values: string[];
  addSecondaryRegisterTag: boolean;
}

interface ConditionalRateBuilderProps {
  addSecondaryRegisterTag: boolean;
  rateReadOnly: boolean;
  performanceMeasureArray: Measure.RateFields[][];
  majorIndex: number;
  value: string;
  name: string;
}

type CheckBoxBuilder = (props: AgeGroupProps) => QMR.CheckboxOption[];

/**
 * Total Rate NDR that calculates from filled OMS NDR sets
 */
const CalcTotalNDR = ({}: TotalProps) => {
  return <div>Example Placement</div>;
};

const buildConditionalRateArray = ({
  addSecondaryRegisterTag,
  rateReadOnly,
  performanceMeasureArray = [[]],
  majorIndex,
  value,
  name,
}: ConditionalRateBuilderProps) => {
  const ndrSets: React.ReactElement[] = [];
  const cleanedLabel = value?.replace(/[^\w]/g, "") ?? "CHECKBOX_VALUE_NOT_SET";

  // create NDR sets for applicable PMs
  performanceMeasureArray.forEach((performanceMeasure, idx) => {
    if (
      performanceMeasure &&
      performanceMeasure[majorIndex] &&
      performanceMeasure[majorIndex].rate
    ) {
      const cleanedPMDescLabel =
        addSecondaryRegisterTag && performanceMeasureDescriptions[idx]
          ? `_${performanceMeasureDescriptions[idx].replace(/[^\w]/g, "")}`
          : "";

      const adjustedName = `${name}.rates.${cleanedLabel}` + cleanedPMDescLabel;

      ndrSets.push(
        <QMR.Rate
          readOnly={rateReadOnly}
          name={adjustedName}
          key={adjustedName}
          rates={[
            {
              id: 0,
              label: performanceMeasureDescriptions[idx],
            },
          ]}
        />
      );
    }
  });

  return ndrSets;
};

/**
 * Generic builder function for any variation of AgeGroupNDRSets
 * - no ageGroups but performanceDescription
 * - no performanceDescription but ageGroups
 * - both ageGroups and performanceDescription
 */
const buildPerformanceMeasureNDRCheckboxOptions = ({
  values,
  addSecondaryRegisterTag,
  performanceMeasureArray = [[]],
  name,
  rateReadOnly,
}: NdrOptionBuilderProps) => {
  const checkboxes: QMR.CheckboxOption[] = [];

  values.forEach((val, i) => {
    // add tp checkbox options
    const ndrSets = buildConditionalRateArray({
      value: val,
      addSecondaryRegisterTag,
      performanceMeasureArray,
      rateReadOnly,
      majorIndex: i,
      name,
    });
    if (ndrSets.length) {
      const cleanedLabel = val.replace(/[^\w]/g, "");
      const ageGroupCheckBox = {
        value: cleanedLabel,
        displayValue: val,
        children: [
          <CUI.Heading key={`${name}.rates.${cleanedLabel}Header`} size={"sm"}>
            Enter a number for the numerator and the denominator. Rate will
            auto-calculate
          </CUI.Heading>,
          ...ndrSets,
        ],
      };
      checkboxes.push(ageGroupCheckBox);
    }
  });

  return checkboxes;
};

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
const buildAgeGroupsCheckboxes: CheckBoxBuilder = (props) => {
  if (!ageGroups.length) {
    return buildPerformanceMeasureNDRCheckboxOptions({
      ...props,
      addSecondaryRegisterTag: false,
      values: performanceMeasureDescriptions,
    });
  }
  return buildPerformanceMeasureNDRCheckboxOptions({
    ...props,
    addSecondaryRegisterTag: true,
    values: ageGroups,
  });
};

/**
 * Builds NDRs for Performance Measure AgeGroups
 */
const AgeGroupNDRSets = ({ name }: NdrProps) => {
  const { performanceMeasureArray, rateReadOnly } =
    usePerformanceMeasureContext();
  const ageGroupsOptions = buildAgeGroupsCheckboxes({
    name: name,
    rateReadOnly: !!rateReadOnly,
    performanceMeasureArray,
  });

  return (
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={ageGroupsOptions}
    />
  );
};

/**
 * Builds OPM Checkboxes
 */
const renderOPMChckboxOptions = ({ OPM, rateReadOnly, name }: OPMProps) => {
  const checkBoxOptions: QMR.CheckboxOption[] = [];

  OPM.forEach(({ description }, idx) => {
    if (description) {
      const cleanedFieldName = description?.replace(/[^\w]/g, "");

      checkBoxOptions.push({
        value: cleanedFieldName,
        displayValue: description ?? `UNSET_OPM_FIELD_NAME_${idx}`,
        children: [
          <CUI.Heading
            key={`${name}.rates.${cleanedFieldName}Header`}
            size={"sm"}
          >
            Enter a number for the numerator and the denominator. Rate will
            auto-calculate
          </CUI.Heading>,
          <QMR.Rate
            rates={[
              {
                id: 0,
              },
            ]}
            name={`${name}.rates.${cleanedFieldName}`}
            key={`${name}.rates.${cleanedFieldName}`}
            readOnly={rateReadOnly}
          />,
        ],
      });
    }
  });

  return checkBoxOptions;
};

/**
 * Builds NDRs for Other Performance Measure sets
 */
const OPMNDRSets = ({ name }: NdrProps) => {
  const { OPM = [], rateReadOnly } = usePerformanceMeasureContext();
  return (
    <>
      <QMR.Checkbox
        name={`${name}.options`}
        key={`${name}.options`}
        options={renderOPMChckboxOptions({
          OPM,
          name,
          rateReadOnly: !!rateReadOnly,
        })}
      />
    </>
  );
};

/**
 * Builds Base level NDR Sets
 */
export const NDRSets = ({ name }: NdrProps) => {
  const { OPM, calcTotal, rateReadOnly } = usePerformanceMeasureContext();
  return (
    <CUI.VStack key={`${name}.NDRwrapper`} alignItems={"flex-start"}>
      {OPM && <OPMNDRSets name={name} key={name} />}
      {!OPM && <AgeGroupNDRSets name={name} key={name} />}
      {calcTotal && (
        <CalcTotalNDR
          name={name}
          key={`${name}.TotalWrapper`}
          rateReadOnly={!!rateReadOnly}
        />
      )}
    </CUI.VStack>
  );
};
