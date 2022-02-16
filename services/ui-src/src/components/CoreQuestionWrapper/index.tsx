import * as CUI from "@chakra-ui/react";

export interface Props {
  label: string;
  children: any;
}

export const CoreQuestionWrapper = ({ label, children }: Props) => {
  return (
    <CUI.Box my={4}>
      <CUI.FormLabel fontWeight="bold" fontSize="lg" data-cy={label}>
        {label}
      </CUI.FormLabel>
      {children}
    </CUI.Box>
  );
};
