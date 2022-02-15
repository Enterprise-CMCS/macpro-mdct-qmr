import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
const renderAgeGroupsCheckboxes = ({
  name,
  rateReadOnly,
  performanceMeasureArray = [[]],
}: AgeGroupProps) => {
  const checkboxes: QMR.CheckboxOption[] = [];

  ageGroups.forEach((ageGroup, i) => {
    const cleanedAgeGroupLabel =
      ageGroup?.replace(/[^\w]/g, "") ?? "AGE_GROUP_NOT_SET";
    const ndrSets: React.ReactElement[] = [];

    ndrSets.push(
      <CUI.Heading
        key={`${name}.rates.${cleanedAgeGroupLabel}Header`}
        size={"sm"}
      >
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate
      </CUI.Heading>
    );

    // create NDR sets for applicable PMs
    performanceMeasureArray.forEach((performanceMeasure, idx) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].rate
      ) {
        const cleanedPMDescLabel =
          performanceMeasureDescriptions[idx]?.replace(/[^\w]/g, "") ??
          "PERFORMANCE_MEASURE_DESC_FAILURE";
        ndrSets.push(
          <QMR.Rate
            readOnly={rateReadOnly}
            name={`${name}.rates.${cleanedAgeGroupLabel}_${cleanedPMDescLabel}`}
            key={`${name}.rates.${cleanedAgeGroupLabel}_${cleanedPMDescLabel}`}
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

    // add tp checkbox options
    const ageGroupCheckBox = {
      value: cleanedAgeGroupLabel,
      displayValue: ageGroup,
      children: ndrSets,
    };
    checkboxes.push(ageGroupCheckBox);
  });

  return checkboxes;
};

/**
 * Builds NDRs for Performance Measure AgeGroups
 */
const AgeGroupNDRSets = ({ name }: NdrProps) => {
  const { performanceMeasureArray, rateReadOnly } =
    usePerformanceMeasureContext();
  const ageGroupsOptions = renderAgeGroupsCheckboxes({
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
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={renderOPMChckboxOptions({
        OPM,
        name,
        rateReadOnly: !!rateReadOnly,
      })}
    />
  );
};

/**
 * Builds Base level NDR Sets
 */
export const NDRSets = ({ name }: NdrProps) => {
  const { OPM } = usePerformanceMeasureContext();
  const { watch, unregister } = useFormContext();
  const watchDataSourceSwitch = watch("MeasurementSpecification");

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [watchDataSourceSwitch, name, unregister]);

  if (OPM) {
    return <OPMNDRSets name={name} key={name} />;
  }
  return <AgeGroupNDRSets name={name} key={name} />;
};
