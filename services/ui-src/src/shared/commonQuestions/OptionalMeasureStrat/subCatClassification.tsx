import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { NDRSets } from "./NDR/ndrSets";
import { NDRSetsAccordion } from "../MeasureStratification/NDR/ndrSets";
import { featuresByYear } from "utils/featuresByYear";

interface AddAnotherButtonProps {
  /** onClick state updating function for dynamic rendering */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** additional text to display after "+ Add Another" on the button */
  additionalText?: string;
  isDisabled?: boolean;
  /** name for location for dynamic testing */
  testid: string;
}

/*
 * Button for handling additional values in dynamic rendering
 */
export const AddAnotherButton = ({
  onClick,
  additionalText,
  isDisabled,
  testid,
}: AddAnotherButtonProps) => {
  return (
    <QMR.ContainedButton
      buttonText={"+ Add Another " + additionalText}
      buttonProps={{
        variant: "outline",
        colorScheme: "blue",
        color: "blue.500",
        mt: "4",
      }}
      key={"AddAnotherButton"}
      onClick={onClick}
      disabledStatus={isDisabled}
      testId={testid}
    />
  );
};

interface AdditonalCategoryProps {
  /** name for react-hook-form registration */
  name: string;
  flagSubLabel?: string;
  checkboxes?: boolean;
}

/*
 * Additional [Race/Sex/Language/Etc] Category Section
 */
export const SubCatSection = ({
  name,
  flagSubLabel,
  checkboxes,
}: AdditonalCategoryProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `${name}.additionalSubCategories`,
    control,
    shouldUnregister: true,
  });

  const labels = featuresByYear.displayOptionalLanguage
    ? {
        header: "Additional/Alternative Classification/Sub-category",
        help: "Define the Alternative Classification/Sub-category",
        button: "Sub-Category",
      }
    : {
        header: "Additional Subcategory",
        help: "Define the Additional Subcategory",
        button: "Subcategory",
      };

  return (
    <CUI.Box key={`${name}.additionalSubCategoriesWrapper`}>
      {fields.map((field: any, idx: number) => (
        <QMR.DeleteWrapper
          allowDeletion
          key={field.id}
          onDelete={() => remove(idx)}
        >
          <CUI.Text size={"xl"} my="3">
            {labels.header}
          </CUI.Text>
          <QMR.QuestionChild show key={field.id}>
            <CUI.Stack spacing={"5"}>
              <QMR.TextInput
                name={`${name}.additionalSubCategories.${idx}.description`}
                key={`${name}.additionalSubCategories.${idx}.description`}
                label={labels.help}
                rules={{ required: true }}
              />
              {checkboxes ? (
                <NDRSets
                  name={`${name}.additionalSubCategories.${idx}.rateData`}
                  key={`${name}.additionalSubCategories.${idx}.rateData`}
                />
              ) : (
                <NDRSetsAccordion
                  name={`${name}.additionalSubCategories.${idx}.rateData`}
                  key={`${name}.additionalSubCategories.${idx}.rateData`}
                />
              )}
            </CUI.Stack>
          </QMR.QuestionChild>
        </QMR.DeleteWrapper>
      ))}
      <AddAnotherButton
        onClick={() => append({})}
        additionalText={labels.button}
        key={`${name}.additionalSubCategoriesButton`}
        testid={`${name}.additionalSubCategoriesButton`}
      />
      {flagSubLabel && (
        <CUI.Text mt="4" fontStyle="italic">
          {flagSubLabel}
        </CUI.Text>
      )}
    </CUI.Box>
  );
};
