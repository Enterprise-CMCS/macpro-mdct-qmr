import * as CUI from "@chakra-ui/react";

export interface Props {
  label: string;
  children: any;
}

export const CoreQuestionWrapper = ({ label, children }: Props) => {
  return (
    <CUI.ListItem my={4}>
      <CUI.FormLabel fontWeight="bold" fontSize="lg">
        {label}
      </CUI.FormLabel>
      {children}
    </CUI.ListItem>
  );
};
