import * as CUI from "@chakra-ui/react";

export interface Props {
  label: string;
  children: any;
  testid?: string;
}

export const CoreQuestionWrapper = ({ label, children, testid }: Props) => {
  return (
    <CUI.Box my={4}>
      <CUI.FormLabel
        fontWeight="bold"
        data-testid={testid}
        fontSize="lg"
        data-cy={label}
        as="h2"
      >
        {label}
      </CUI.FormLabel>
      <fieldset>{children}</fieldset>
    </CUI.Box>
  );
};
