import { ReactNode } from "react";
import {
  AccordionButton,
  AccordionItem as AccordionItemRoot,
  AccordionPanel,
  Image,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import plusIcon from "assets/icons/accordion/icon_plus.svg";
import minusIcon from "assets/icons/accordion/icon_minus.svg";

export const AccordionItem = ({ label, children, sx: sxOverride }: Props) => {
  return (
    <AccordionItemRoot sx={sxOverride ?? sx.root}>
      {({ isExpanded }) => (
        <>
          <AccordionButton aria-label={label} title="accordion-button" mb={2}>
            <Text flex="1">{label}</Text>
            <Image
              src={isExpanded ? minusIcon : plusIcon}
              alt={isExpanded ? "Collapse" : "Expand"}
              sx={sx.accordionIcon}
            />
          </AccordionButton>
          <AccordionPanel sx={sx.accordionPanel}>{children}</AccordionPanel>
        </>
      )}
    </AccordionItemRoot>
  );
};

interface Props {
  children?: ReactNode | ReactNode[];
  label?: string;
  sx?: SystemStyleObject;
}

const sx = {
  root: {
    borderStyle: "none",
    ".chakra-accordion__button": {
      minHeight: "3.5rem",
      textAlign: "left",
      backgroundColor: "#F2F2F2",
    },
    "div .chakra-accordion__button, div .chakra-accordion__button:hover": {
      backgroundColor: "#E6F9FD",
    },
  },
  accordionPanel: {
    ".mobile &": {
      padding: "0.5rem 0",
    },
  },
  accordionIcon: {
    width: "1rem",
  },
};
