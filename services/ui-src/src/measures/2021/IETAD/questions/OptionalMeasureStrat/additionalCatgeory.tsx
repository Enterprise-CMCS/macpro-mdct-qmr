import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { AddAnotherButton, SubCatSection } from "./subCatClassification";
import { NDRSets } from "./ndrSets";

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

type AddtnlCategoryHook = ({
  name,
  parentName,
}: {
  name: string;
  parentName: string;
}) => [string[], () => void];

/**
 * Hook for tracking current additional category options
 */
const useAddtnlCategory: AddtnlCategoryHook = ({ name, parentName }) => {
  const { getValues } = useFormContext();
  const additionalCategoryValues: string[] | undefined = getValues(
    `${name}.additionalCategories`
  );

  // set initial state to be either a single unit or however many were saved last
  const cleanParentValue = parentName.replace(/[^\w]/g, "");
  const [addtnlOptions, setAddtnlOptions] = useState<string[]>(
    additionalCategoryValues?.length
      ? additionalCategoryValues.map(
          (_, i) => `${`additional${cleanParentValue}`}.${i}`
        )
      : [`${`additional${cleanParentValue}`}.0`]
  );

  // function for click event
  const addAnotherAddtnl = () => {
    setAddtnlOptions((old) => {
      const oldArray = old ?? [];
      return [...oldArray, `additional${cleanParentValue}.${oldArray.length}`];
    });
  };

  // returns render array and addAnother click function
  return [addtnlOptions, addAnotherAddtnl];
};

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
  const [options, addAnotherAddtnl] = useAddtnlCategory({ name, parentName });

  const additionalOptions: QMR.CheckboxOption[] = options.map(
    (additionalOption, idx) => {
      return {
        value: additionalOption,
        displayValue: `Additional ${parentName}`,
        children: [
          <AdditionalCategoryCheckboxChildren
            flagSubCat={flagSubCat}
            name={`${name}.additionalSelections.${idx}`}
            key={`${name}.additionalSelections.${idx}`}
            parentName={parentName}
          />,
        ],
      };
    }
  );

  return (
    <CUI.Box key={`${name}.additionalCategoriesWrapper`}>
      <QMR.Checkbox
        name={`${name}.additionalCategories`}
        key={`${name}.additionalCategories`}
        options={additionalOptions}
      />
      <AddAnotherButton
        onClick={addAnotherAddtnl}
        additionalText={parentName}
        key={`${name}.additionalCategoriesButton`}
      />
    </CUI.Box>
  );
};
