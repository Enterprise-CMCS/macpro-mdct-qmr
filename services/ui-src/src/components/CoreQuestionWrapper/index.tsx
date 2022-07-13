import * as CUI from "@chakra-ui/react";

export interface Props {
  label: string;
  children: any;
  id?: string;
}

export const CoreQuestionWrapper = ({ label, children, id }: Props) => {
  return (
    <CUI.Box my={4} id={id}>
      <CUI.FormLabel fontWeight="bold" fontSize="lg" data-cy={label}>
        {label}
      </CUI.FormLabel>
      {children}
    </CUI.Box>
  );
};
