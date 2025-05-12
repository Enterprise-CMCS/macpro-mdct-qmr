import { ReactNode } from "react";
import {
  AccordionButton,
  AccordionItem as AccordionItemRoot,
  AccordionPanel,
  background,
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
          <AccordionButton
            sx={sx.accordionButton}
            aria-label={label}
            title="accordion-button"
          >
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
  },
  accordionButton: {
    minHeight: "3.5rem",
    bg: "palette.gray_lightest",
    textAlign: "left",
    backgroundColor: "yellow",
  },
  accordionPanel: {
    padding: "1.5rem 1rem 0.5rem",
    ".mobile &": {
      padding: "0.5rem 0",
    },
  },
  accordionIcon: {
    width: "1rem",
  },
};
