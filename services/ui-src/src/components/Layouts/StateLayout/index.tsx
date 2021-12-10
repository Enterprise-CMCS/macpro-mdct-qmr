import React, { useState, useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { BreadCrumbItems } from "components";

interface Props {
  breadcrumbItems: BreadCrumbItems;
}

export const StateLayout: React.FC<Props> = ({ children, breadcrumbItems }) => {
  const [sticky, setsticky] = useState(false);

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 89 ? setsticky(true) : setsticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const singleNavigationItem = breadcrumbItems.length === 1;
  return (
    <>
      <CUI.Box
        position={sticky ? "fixed" : "relative"}
        zIndex="2"
        padding="none"
        w="full"
        top="0"
        left="0"
      >
        <CUI.Box bg={singleNavigationItem ? "blue.700" : "blue.100"}>
          <CUI.Container maxW="7xl" py="5">
            <QMR.Breadcrumbs
              items={breadcrumbItems}
              color={singleNavigationItem ? "white" : "inherit"}
            />
          </CUI.Container>
        </CUI.Box>
      </CUI.Box>
      <CUI.Container maxW="7xl" mt={sticky ? "65px" : "0"} py="6">
        {children}
      </CUI.Container>
    </>
  );
};
