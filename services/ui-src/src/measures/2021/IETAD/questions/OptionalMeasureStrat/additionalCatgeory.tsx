import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";

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
  const { control, watch } = useFormContext();
  const { fields, append } = useFieldArray({
    name: `${name}.additionalSelections`,
    control,
    shouldUnregister: true,
  });

  const watchFieldArray = watch(`${name}.additionalSelections`, []);
  const controlledFields =
    (watchFieldArray &&
      fields.map((field, index) => {
        console.log({ watchFieldArray });
        return {
          ...field,
          ...watchFieldArray[index],
        };
      })) ||
    [];

  console.log({ controlledFields });
  const addAnotherField = () => {
    append({}, { shouldFocus: false });
  };

  const testOptions: QMR.CheckboxOption[] = controlledFields.map(
    (_: any, idx: number) => {
      return {
        value: `additional${parentName.replace(/[^\w]/g, "")}.${idx}`,
        displayValue: `Additional ${parentName}`,
        childKey: _.id,
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
        options={testOptions}
      />
      <AddAnotherButton
        onClick={addAnotherField}
        additionalText={parentName}
        isDisabled={
          controlledFields.length > 0 &&
          !controlledFields[controlledFields.length - 1]?.description
        }
        key={`${name}.additionalCategoriesButton`}
      />
    </CUI.Box>
  );
};
