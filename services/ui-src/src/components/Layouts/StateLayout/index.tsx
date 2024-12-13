import React, { useState, useEffect, ReactElement } from "react";
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
  const [sticky, setSticky] = useState(false);

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 89 ? setSticky(true) : setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <>
      <CUI.Box
        position={sticky ? "fixed" : "relative"}
        zIndex={3}
        padding="none"
        w="full"
        top="0"
        left="0"
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
      <CUI.Container maxW="7xl" mt={sticky ? "65px" : "0"} py="6">
        {children}
      </CUI.Container>
    </>
  );
};
