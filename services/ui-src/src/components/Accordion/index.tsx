import { MouseEventHandler, ReactNode, useMemo, useState } from "react";
import * as CUI from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

//accordion item and accordion need to be together to get the expand/collapse to work together
export const AccordionItem = ({
  label,
  children,
  sx: sxOverride,
  onClick,
}: Props) => {
  return (
    <CUI.AccordionItem sx={sxOverride ?? sx.root}>
      {({ isExpanded }) => (
        <>
          <CUI.AccordionButton
            aria-label={label}
            title="accordion-button"
            mb={2}
            onClick={onClick}
          >
            <CUI.Text flex="1">{label}</CUI.Text>
            <CUI.Icon fontSize={"xl"} as={isExpanded ? FaMinus : FaPlus} />
          </CUI.AccordionButton>
          <CUI.AccordionPanel sx={sx.accordionPanel}>
            {children}
          </CUI.AccordionPanel>
        </>
      )}
    </CUI.AccordionItem>
  );
};

export const Accordion = ({ label, children, state }: AProps) => {
  const [index, setIndex] = useState<number>(0);

  useMemo(() => {
    if (state) setIndex(1);
    else setIndex(0);
  }, [state]);

  const toggle = () => {
    if (index === 1) setIndex(0);
    else setIndex(1);
  };

  return (
    <CUI.Accordion allowMultiple index={[index]}>
      <AccordionItem label={label} onClick={toggle}>
        {children}
      </AccordionItem>
    </CUI.Accordion>
  );
};

interface Props {
  children?: ReactNode | ReactNode[];
  label?: string;
  sx?: CUI.SystemStyleObject;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface AProps {
  children?: ReactNode | ReactNode[];
  state?: boolean;
  label?: string;
  sx?: CUI.SystemStyleObject;
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
