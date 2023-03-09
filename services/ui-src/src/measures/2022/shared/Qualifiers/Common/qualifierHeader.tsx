import * as CUI from "@chakra-ui/react";

interface Props {
  header: string;
  description: string;
}
export const QualifierHeader = ({ header, description }: Props) => {
  return (
    <CUI.Stack spacing="4" mt="10">
      <CUI.Text as="h2" fontWeight="bold">
        {header}
      </CUI.Text>
      <CUI.Text data-cy={"qualifier-header-description"} as="h3">
        {description}
      </CUI.Text>
    </CUI.Stack>
  );
};
