import { Accordion, Box, Button, HStack } from "@chakra-ui/react";
import { AccordionItem } from "components/Accordion";
import { OmsNode } from "shared/types";
import * as QMR from "components";

interface Props {
  data: OmsNode[];
}

export const SubClassificationNDR = () => {
  /* Rate component will be determined by the measure
   * Have it be passed from the base so that component type/data happens in one central area
   */
  return (
    <QMR.Rate
      name="rate"
      rates={[
        {
          id: 0,
          label: "test",
        },
      ]}
    ></QMR.Rate>
  );
};

export const SubClassificationCheckboxes = (subOptions: OmsNode[]) => {
  const checkboxes: QMR.CheckboxOption[] = subOptions.map((option) => {
    return {
      displayValue: option.label,
      value: option.id,
      children: [SubClassificationNDR()],
    };
  });

  return (
    <Box>
      <QMR.Checkbox
        name="sub-class-checkbox"
        options={checkboxes}
      ></QMR.Checkbox>
      <Button>Add Another Sub-Category</Button>
    </Box>
  );
};

export const SubClassificationRadio = (subOptions: OmsNode[]) => {
  const options = [
    {
      displayValue: "Yes, we are reporting aggregate data",
      value: "yes",
    },
    {
      displayValue: "No, we are reporting disaggregated data ",
      value: "no",
      children: [SubClassificationCheckboxes(subOptions)],
    },
  ];

  return (
    <QMR.RadioButton
      name="Are you reporting aggregate data for the Asian category?"
      options={options}
    ></QMR.RadioButton>
  );
};

export const SubClassification = (options: OmsNode[] | undefined) => {
  if (!options) return <></>;
  return (
    <Box>
      {options.map((option) => (
        <Accordion allowToggle>
          <AccordionItem label={option.label}>
            {option.options && option.options?.length > 0
              ? SubClassificationRadio(option.options)
              : SubClassificationNDR()}
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export const AddAnother = (label: string) => {
  return (
    <Accordion allowToggle>
      <AccordionItem label={`Add another ${label}`}>
        Race and ethnicity needs a unique label
        <HStack>
          <QMR.TextInput name="" label={`Additional ${label}`}></QMR.TextInput>
          <Button>Delete</Button>
        </HStack>
        {SubClassificationNDR()}
        <Button>Add Another {label}</Button>
      </AccordionItem>
    </Accordion>
  );
};

export const Stratification = ({ data }: Props) => {
  //this is where we get the rate data
  //also the rate component being used, i.e. Rate, ComplexRate, IETRate, etc
  //anything that is relevant to how the view will render happens here and only here

  console.log(data);
  return (
    <Box>
      {data.map((classification) => (
        <Accordion allowToggle>
          <AccordionItem label={classification.label}>
            {SubClassification(classification.options)}
            {AddAnother(classification.label!)}
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};
