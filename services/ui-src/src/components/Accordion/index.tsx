import {
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as CUI from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import SharedContext from "shared/SharedContext";

//accordion item and accordion need to be together to get the expand/collapse to work together
export const AccordionItem = ({
  label,
  children,
  sx: sxOverride,
  onClick,
}: AccordionItemProps) => {
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

export const Accordion = ({
  label,
  children,
  externalControlled,
  value,
}: AccordionProps) => {
  const [index, setIndex] = useState<number>(1);
  const shared: any = useContext(SharedContext);

  useEffect(() => {
    if (externalControlled && shared?.broadcast?.length > 0) {
      if (value) {
        const keys = shared?.broadcast;
        for (var i = 0; i < keys.length; i++) {
          if (keys[i].includes(value)) {
            setIndex(0);
          }
        }
      }
    }
  }, [shared?.broadcast]);

  if (externalControlled) {
    //only way to really capture when the user has clicked expand all/ collapse all button for the measure stratification section
    addEventListener("click", (event) => {
      const label = (event.target as Element).innerHTML;
      if (label === "Expand all") {
        setIndex(0);
      } else if (label === "Collapse all") {
        setIndex(1);
      }
    });
  }

  const toggle = () => {
    if (index === 1) setIndex(0);
    else setIndex(1);
  };

  return (
    <CUI.Accordion allowMultiple index={[index]}>
      <AccordionItem label={label + ": " + value} onClick={toggle}>
        {children}
      </AccordionItem>
    </CUI.Accordion>
  );
};

interface AccordionItemProps {
  children?: ReactNode | ReactNode[];
  label?: string;
  sx?: CUI.SystemStyleObject;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface AccordionProps {
  children?: ReactNode | ReactNode[];
  externalControlled?: boolean;
  label?: string;
  sx?: CUI.SystemStyleObject;
  value?: string;
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
