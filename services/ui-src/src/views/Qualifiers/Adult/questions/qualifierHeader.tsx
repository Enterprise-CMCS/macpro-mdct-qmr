import * as CUI from "@chakra-ui/react";

interface Props {
  header: string;
  description: string;
}
export const QualifierHeader = ({ header, description }: Props) => {
  return (
    <CUI.Stack spacing="4" mt="10">
      <CUI.Text fontWeight="bold">{header}</CUI.Text>
      <CUI.Text>{description}</CUI.Text>
    </CUI.Stack>
  );
};
