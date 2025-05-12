import { Accordion, Box } from "@chakra-ui/react";
import { AccordionItem } from "components/Accordion";
import { OmsNode } from "shared/types";

interface Props {
  data: OmsNode[];
}

export const SubClassification = (options: OmsNode[] | undefined) => {
  if (!options) return <></>;
  return (
    <Box>
      {options.map((option) => (
        <Accordion allowToggle>
          <AccordionItem label={option.label}></AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export const Stratification = ({ data }: Props) => {
  console.log(data);
  return (
    <Box>
      {data.map((classification) => (
        <Accordion allowToggle>
          <AccordionItem label={classification.label}>
            {SubClassification(classification.options)}
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};
