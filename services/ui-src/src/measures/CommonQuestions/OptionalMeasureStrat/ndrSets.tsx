import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import * as Types from "../types";
import { usePerformanceMeasureContext } from "./context";

interface NdrProps {
  /** name for react-hook-form registration */
  name: string;
  // ageGroups: Types.AgeGroups;
  // performanceMeasureDescriptions: Types.PerformanceMeasureDescriptions;
}

interface AgeGroupProps {
  /** name for react-hook-form registration */
  name: string;
  /** should rate be user editable? */
  rateReadOnly: boolean;
  /** Which performance measure rates are filled in */
  performanceMeasureArray?: Types.RateFields[][];
  qualifiers: string[];
  categories: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

interface OPMProps {
  /** Rate fields and descs from OPM */
  OPM: Types.OtherRatesFields[];
  /** should rate be user editable? */
  rateReadOnly: boolean;
  /** name for react-hook-form registration */
  name: string;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

// interface TotalProps {
//   /** name for react-hook-form registration */
//   name: string;
//   /** should rate be user editable? */
//   rateReadOnly: boolean;
// }

interface NdrOptionBuilderProps extends AgeGroupProps {
  values: string[];
  addSecondaryRegisterTag: boolean;
  categories: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

interface ConditionalRateBuilderProps {
  addSecondaryRegisterTag: boolean;
  rateReadOnly: boolean;
  performanceMeasureArray: Types.RateFields[][];
  categories: string[];
  majorIndex: number;
  value: string;
  name: string;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

type CheckBoxBuilder = (props: AgeGroupProps) => QMR.CheckboxOption[];

/**
 * Total Rate NDR that calculates from filled OMS NDR sets
 */
// const CalcTotalNDR = ({}: TotalProps) => {
//   return <div>Example Placement</div>;
// };

const buildConditionalRateArray = ({
  addSecondaryRegisterTag,
  rateReadOnly,
  performanceMeasureArray = [[]],
  majorIndex,
  value,
  name,
  categories,
  rateMultiplicationValue,
  customMask,
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
        addSecondaryRegisterTag && categories[idx]
          ? `_${categories[idx].replace(/[^\w]/g, "")}`
          : "";

      const adjustedName = `${name}.rates.${cleanedLabel}${cleanedPMDescLabel}`;

      ndrSets.push(
        <QMR.Rate
          readOnly={rateReadOnly}
          name={adjustedName}
          key={adjustedName}
          rateMultiplicationValue={rateMultiplicationValue}
          customMask={customMask}
          rates={[
            {
              id: 0,
              label: `${categories[idx] ? categories[idx] : ""}`,
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
  categories,
  rateMultiplicationValue,
  customMask,
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
      categories,
      rateMultiplicationValue,
      customMask,
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
          ...(!rateReadOnly
            ? [
                <CUI.Heading
                  pt="1"
                  key={`${name}.rates.${cleanedLabel}HeaderHelper`}
                  size={"sm"}
                >
                  Please review the auto-calculated rate and revise if needed.
                </CUI.Heading>,
              ]
            : []),
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
  if (!props.qualifiers.length) {
    return buildPerformanceMeasureNDRCheckboxOptions({
      ...props,
      addSecondaryRegisterTag: false,
      values: props.categories,
      rateMultiplicationValue: props.rateMultiplicationValue,
      customMask: props.customMask,
    });
  }
  return buildPerformanceMeasureNDRCheckboxOptions({
    ...props,
    addSecondaryRegisterTag: true,
    values: props.qualifiers,
    rateMultiplicationValue: props.rateMultiplicationValue,
    customMask: props.customMask,
  });
};

/**
 * Builds NDRs for Performance Measure AgeGroups
 */
const AgeGroupNDRSets = ({ name }: NdrProps) => {
  const {
    performanceMeasureArray,
    rateReadOnly,
    qualifiers,
    categories,
    rateMultiplicationValue,
    customMask,
  } = usePerformanceMeasureContext();
  const ageGroupsOptions = buildAgeGroupsCheckboxes({
    name: name,
    rateReadOnly: !!rateReadOnly,
    performanceMeasureArray,
    qualifiers,
    categories,
    rateMultiplicationValue,
    customMask,
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
const renderOPMChckboxOptions = ({
  OPM,
  rateReadOnly,
  name,
  rateMultiplicationValue,
  customMask,
}: OPMProps) => {
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
          ...(!rateReadOnly
            ? [
                <CUI.Heading
                  pt="1"
                  size={"sm"}
                  key={`${name}.rates.${cleanedFieldName}HeaderHelper`}
                >
                  Please review the auto-calculated rate and revise if needed.
                </CUI.Heading>,
              ]
            : []),
          <QMR.Rate
            rates={[
              {
                id: 0,
              },
            ]}
            name={`${name}.rates.${cleanedFieldName}`}
            key={`${name}.rates.${cleanedFieldName}`}
            readOnly={rateReadOnly}
            rateMultiplicationValue={rateMultiplicationValue}
            customMask={customMask}
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
  const {
    OPM = [],
    rateReadOnly,
    rateMultiplicationValue,
    customMask,
  } = usePerformanceMeasureContext();
  return (
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={renderOPMChckboxOptions({
        OPM,
        name,
        rateReadOnly: !!rateReadOnly,
        rateMultiplicationValue,
        customMask,
      })}
    />
  );
};

/**
 * Builds Base level NDR Sets
 */
export const NDRSets = ({ name }: NdrProps) => {
  const { OPM } = usePerformanceMeasureContext();
  return (
    <CUI.VStack key={`${name}.NDRwrapper`} alignItems={"flex-start"}>
      {OPM && <OPMNDRSets name={name} key={name} />}
      {!OPM && <AgeGroupNDRSets name={name} key={name} />}
      {
        //TODO: finish Total section for NDRs
        /* {!OPM && calcTotal && (
        <CalcTotalNDR
          name={name}
          key={`${name}.TotalWrapper`}
          rateReadOnly={!!rateReadOnly}
        />
      )} */
      }
    </CUI.VStack>
  );
};
