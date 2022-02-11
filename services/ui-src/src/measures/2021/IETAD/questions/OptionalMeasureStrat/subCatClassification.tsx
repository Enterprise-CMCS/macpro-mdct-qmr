import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { useFieldArray } from "react-hook-form";

import { NDRSets } from "./ndrSets";
import { useState } from "react";

interface AddAnotherButtonProps {
  /** onClick state updating function for dynamic rendering */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** additional text to display after "+ Add Another" on the button */
  additionalText?: string;
}

interface SubCatSectionProps {
  /** name for react-hook-form registration */
  name: string;
}

/**
 * Button for handling additional values in dynamic rendering
 */
export const AddAnotherButton = ({
  onClick,
  additionalText,
}: AddAnotherButtonProps) => {
  return (
    <QMR.ContainedButton
      buttonText={"+ Add Another " + additionalText}
      buttonProps={{
        variant: "outline",
        colorScheme: "blue",
        textTransform: "capitalize",
      }}
      key={"AddAnotherButton"}
      onClick={onClick}
    />
  );
};

/**
 * Build Additional SubCategory/Classification Section for Race fields and the associated Button
 */
export const SubCatSection = ({ name }: SubCatSectionProps) => {
  const { fields, append } = useFieldArray({
    name: `${name}.subCategories`,
    shouldUnregister: true,
  });

  const [subCatFields, setfieldArray] = useState(
    fields.map((_, idx) => `additionalSubCat.${idx}`)
  );

  const addAnotherField = () => {
    append({}, { shouldFocus: false });
    setfieldArray((old) => {
      return [...old, `additionalSubCat.${old.length}`];
    });
  };

  return (
    <CUI.Box key={`${name}.subCatWrapper`}>
      <QMR.Checkbox
        name={`${name}.subCatOptions`}
        key={`${name}.subCatOptions`}
        options={subCatFields.map((item, idx) => {
          return {
            value: item,
            displayValue: "Additional/Alternative Classification/Sub-category",
            children: [
              <QMR.TextInput
                label="Define the Alternative Classification/Sub-category"
                name={`${name}.subCategories.${idx}.description`}
                key={`${name}.subCategories.${idx}.description`}
              />,
              <NDRSets
                name={`${name}.subCategories.${idx}.ageRangeRates`}
                key={`${name}.subCategories.${idx}.ageRangeRates`}
              />,
            ],
          };
        })}
      />
      <AddAnotherButton
        onClick={addAnotherField}
        additionalText="Sub-Category"
        key={`${name}.AddAnotherSubCatButton`}
      />
    </CUI.Box>
  );
};
