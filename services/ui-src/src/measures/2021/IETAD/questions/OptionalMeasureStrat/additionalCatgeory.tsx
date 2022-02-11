import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";

import { AddAnotherButton, SubCatSection } from "./subCatClassification";
import { NDRSets } from "./ndrSets";
import { useState } from "react";

interface AdditonalCategoryProps {
  /** name for react-hook-form registration */
  name: string;
  /** name of parent category for additional text */
  parentName: string;
  /** should the additional categories have a subCat option? */
  flagSubCat: boolean;
}

interface CheckboxChildrenProps {
  /** name for react-hook-form registration */
  name: string;
  /** should this section have a subCat option? */
  flagSubCat: boolean;
  /** parent category name for description label */
  parentName: string;
}

/**
 * Children for each Additional Category Section
 */
const AdditionalCategoryCheckboxChildren = ({
  name,
  flagSubCat,
  parentName,
}: CheckboxChildrenProps) => {
  return (
    <CUI.Box key={`${name}.ageRangeWrapper`}>
      <QMR.TextInput
        name={`${name}.description`}
        key={`${name}.description`}
        label={`Define the additional ${parentName}`}
      />
      <NDRSets name={`${name}.ageRangeRates`} key={`${name}.ageRangeRates`} />
      {flagSubCat && <SubCatSection name={name} key={name} />}
    </CUI.Box>
  );
};

/**
 * Additional [Race/Sex/Language/Etc] Category Section
 */
export const AddAnotherSection = ({
  name,
  parentName,
  flagSubCat,
}: AdditonalCategoryProps) => {
  const { fields, append } = useFieldArray({
    name: `${name}.additionalSelections`,
    shouldUnregister: true,
  });

  const [fieldArray, setfieldArray] = useState(
    fields.map(
      (_, idx) => `additional${parentName.replace(/[^\w]/g, "")}.${idx}`
    )
  );

  const addAnotherField = () => {
    append({}, { shouldFocus: false });
    setfieldArray((old) => {
      return [
        ...old,
        `additional${parentName.replace(/[^\w]/g, "")}.${old.length}`,
      ];
    });
  };

  const testOptions: QMR.CheckboxOption[] = fieldArray.map((val, idx) => {
    return {
      value: val,
      displayValue: `Additional ${parentName}`,
      childKey: fields[idx].id,
      children: [
        <AdditionalCategoryCheckboxChildren
          flagSubCat={flagSubCat}
          name={`${name}.additionalSelections.${idx}`}
          key={`${name}.additionalSelections.${idx}`}
          parentName={parentName}
        />,
      ],
    };
  });

  return (
    <CUI.Box key={`${name}.additionalCategoriesWrapper`}>
      <QMR.Checkbox
        name={`${name}.additionalCategories`}
        key={`${name}.additionalCategories`}
        options={testOptions}
      />
      <AddAnotherButton
        onClick={addAnotherField}
        additionalText={parentName}
        key={`${name}.additionalCategoriesButton`}
      />
    </CUI.Box>
  );
};
