import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { usePerformanceMeasureContext } from "./context";
import {
  ageGroups,
  performanceMeasureDescriptions,
} from "../data/performanceMeasureData";
import { Measure } from "../../validation/types";

interface NdrProps {
  name: string;
}

interface AgeGroupProps {
  name: string;
  rateReadOnly: boolean;
  performanceMeasureArray: Measure.RateFields[][];
}

/**
 * Builds Performance Measure AgeGroup Checkboxes
 */
const renderAgeGroupsCheckboxes = ({
  name,
  rateReadOnly,
  performanceMeasureArray,
}: AgeGroupProps) => {
  const checkboxes: any = [];

  ageGroups.forEach((ageGroup: string, i: number) => {
    const cleanedAgeGroupLabel = ageGroup.replace(/[^\w]/g, "");
    const ndrSets: any = [];

    // create NDR sets for applicable PMs
    performanceMeasureArray &&
      performanceMeasureArray.forEach((performanceMeasure, index: number) => {
        if (
          performanceMeasure &&
          performanceMeasure[i] &&
          performanceMeasure[i].rate
        ) {
          const cleanedPMDescLabel = performanceMeasureDescriptions[
            index
          ].replace(/[^\w]/g, "");
          ndrSets.push(
            <QMR.Rate
              readOnly={rateReadOnly}
              name={`${name}.rates.${cleanedAgeGroupLabel}_${cleanedPMDescLabel}`}
              key={`${name}.rates.${cleanedAgeGroupLabel}${cleanedPMDescLabel}`}
              rates={[
                {
                  id: 0,
                  label: performanceMeasureDescriptions[index],
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
    rateReadOnly,
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
 * Builds NDRs for Other Performance Measure sets
 */
const OPMNDRSets = ({ name }: NdrProps) => {
  const { OPM = [], rateReadOnly } = usePerformanceMeasureContext();
  return (
    <QMR.Checkbox
      name={`${name}.options`}
      key={`${name}.options`}
      options={OPM.map(({ description }) => {
        const cleanedFieldName = description.replace(/[^\w]/g, "");

        return {
          value: cleanedFieldName,
          displayValue: description,
          children: [
            <CUI.Heading key={`${name}.rates.${cleanedFieldName}Header`}>
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
        };
      })}
    />
  );
};

/**
 * Builds Base level NDR Sets
 */
export const NDRSets = ({ name }: NdrProps) => {
  const { OPM } = usePerformanceMeasureContext();
  if (OPM) {
    return <OPMNDRSets name={name} key={name} />;
  }
  return <AgeGroupNDRSets name={name} key={name} />;
};
