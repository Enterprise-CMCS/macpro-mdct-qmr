import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

export function MeasuresLoading(): React.JSX.Element {
  return (
    <CUI.Flex
      h="100%"
      justifyContent="center"
      py="12"
      data-testid="loading-measure"
    >
      <QMR.LoadingWave />
    </CUI.Flex>
  );
}
