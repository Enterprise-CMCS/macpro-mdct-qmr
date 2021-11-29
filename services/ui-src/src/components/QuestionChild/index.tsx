import * as CUI from "@chakra-ui/react";

interface Props {
  show: boolean;
  children?: JSX.Element[];
}

export const QuestionChild = ({ show, children }: Props) => {
  return (
    <CUI.Box
      display={!show ? "none" : "block"}
      pl={6}
      ml={2}
      borderLeft="4px"
      borderColor="blue.500"
      py={3}
    >
      {children}
    </CUI.Box>
  );
};
