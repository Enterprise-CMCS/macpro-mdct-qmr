import React, { ReactElement } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { BreadCrumbItems } from "components";

interface Props {
  breadcrumbItems: BreadCrumbItems;
  buttons?: ReactElement<any, any>;
}

export const StateLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  breadcrumbItems,
  buttons,
}) => {
  return (
    <>
      <CUI.Box
        sx={sx.root}
        data-testid="state-layout-container"
        className="state-layout-container"
        data-cy="state-layout-container"
      >
        <CUI.Box bg={"blue.100"}>
          <CUI.Flex
            maxW="7xl"
            p="3"
            alignItems="center"
            mx="auto"
            justifyContent="center"
            flexWrap={{ base: "wrap", lg: "nowrap" }}
          >
            <QMR.Breadcrumbs items={breadcrumbItems} color={"inherit"} />
            {buttons}
          </CUI.Flex>
        </CUI.Box>
      </CUI.Box>
      <CUI.Container maxW="7xl" py="6">
        {children}
      </CUI.Container>
    </>
  );
};

const sx = {
  root: {
    position: "sticky",
    zIndex: 3,
    padding: "none",
    width: "full",
    top: 0,
    left: 0,
    ".tablet &, .mobile &": {
      position: "static",
    },
  },
};
