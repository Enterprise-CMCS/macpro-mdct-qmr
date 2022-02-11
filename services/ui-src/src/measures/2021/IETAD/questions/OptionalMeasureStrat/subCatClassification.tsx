import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { NDRSets } from "./ndrSets";

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

type SubCatHook = ({ name }: { name: string }) => [string[], () => void];

/**
 * Hook for tracking current subCat options
 */
const useSubCatFields: SubCatHook = ({ name }) => {
  const { getValues } = useFormContext();
  const subCatValues: string[] | undefined = getValues(`${name}.subCatOptions`);

  // set initial state to be either a single unit or however many were saved last
  const [subCatOptions, setSubCatOptions] = useState<string[]>(
    subCatValues?.length
      ? subCatValues.map((_, i) => `${`additionalSubCat`}.${i}`)
      : [`additionalSubCat.0`]
  );

  // function for click event
  const addAnotherSubCat = () => {
    setSubCatOptions((old) => {
      const oldArray = old ?? [];
      return [...oldArray, `additionalSubCat.${oldArray.length}`];
    });
  };

  return [subCatOptions, addAnotherSubCat];
};

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
  const [subCatFields, addAnotherSubCat] = useSubCatFields({ name });

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
        onClick={addAnotherSubCat}
        additionalText="Sub-Category"
        key={`${name}.AddAnotherSubCatButton`}
      />
    </CUI.Box>
  );
};
