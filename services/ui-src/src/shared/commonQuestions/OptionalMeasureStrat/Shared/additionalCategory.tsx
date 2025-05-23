import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { AddAnotherButton, SubCatSection } from "./subCatClassification";
import { NDRSets } from "./../NDR/ndrSets";
import { Accordion } from "components/Accordion";

interface AdditonalCategoryProps {
  /** name for react-hook-form registration */
  name: string;
  /** name of parent category for additional text */
  parentName: string;
  /** should the additional categories have a subCat option? */
  flagSubCat?: boolean;
  accordion?: boolean;
}

/**
 * Additional [Race/Sex/Language/Etc] Category Section
 */
export const AddAnotherSection = ({
  name,
  parentName,
  flagSubCat,
}: AdditonalCategoryProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `${name}.additionalSelections`,
    control,
    shouldUnregister: true,
  });

  return (
    <CUI.Box key={`${name}.additionalCategoriesWrapper`}>
      {fields.map((field: any, idx: number) => (
        <QMR.DeleteWrapper
          allowDeletion
          onDelete={() => remove(idx)}
          key={field.id}
        >
          <CUI.Text size={"2xl"} my="3">{`Additional ${parentName}`}</CUI.Text>
          <QMR.QuestionChild show key={field.id}>
            <CUI.Stack spacing={"5"}>
              <QMR.TextInput
                name={`${name}.additionalSelections.${idx}.description`}
                label={`Define the Additional ${parentName}`}
                rules={{ required: true }}
              />
              <NDRSets name={`${name}.additionalSelections.${idx}.rateData`} />
            </CUI.Stack>
            {flagSubCat && (
              <SubCatSection
                name={`${name}.additionalSelections.${idx}`}
                key={`${name}.additionalSelections.${idx}`}
              />
            )}
          </QMR.QuestionChild>
        </QMR.DeleteWrapper>
      ))}
      <AddAnotherButton
        onClick={() => append({})}
        additionalText={parentName}
        key={`${name}.additionalCategoriesButton`}
        testid={`${name}.additionalCategoriesButton`}
      />
    </CUI.Box>
  );
};

export const AddAnotherSectionAccordian = ({
  name,
  parentName,
  accordion,
}: AdditonalCategoryProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `${name}.additionalSelections`,
    control,
    shouldUnregister: true,
  });

  if (fields.length === 0) append({});

  return (
    <Accordion label={`Add another ${parentName}`} state={accordion}>
      <CUI.Box key={`${name}.additionalCategoriesWrapper`}>
        {fields.map((field: any, idx: number) => (
          <QMR.DeleteWrapper
            allowDeletion
            onDelete={() => remove(idx)}
            key={field.id}
          >
            <CUI.Stack spacing={"5"} my={4}>
              <QMR.TextInput
                name={`${name}.additionalSelections.${idx}.description`}
                label={`Additional ${parentName}`}
                rules={{ required: true }}
              />
              <QMR.QuestionChild show key={field.id}>
                <NDRSets
                  name={`${name}.additionalSelections.${idx}.rateData`}
                />
              </QMR.QuestionChild>
            </CUI.Stack>
          </QMR.DeleteWrapper>
        ))}
        <AddAnotherButton
          onClick={() => append({})}
          additionalText={parentName}
          key={`${name}.additionalCategoriesButton`}
          testid={`${name}.additionalCategoriesButton`}
        />
      </CUI.Box>
    </Accordion>
  );
};
