import React from "react";
import * as CUI from "@chakra-ui/react";

export function NotFound(): React.JSX.Element {
  return (
    <CUI.Flex h="100%" justifyContent="center" py="12">
      <CUI.Text data-testid="not-found">Oops, page not found :( </CUI.Text>
    </CUI.Flex>
  );
}
