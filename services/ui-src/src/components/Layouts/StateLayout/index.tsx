import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

export const StateLayout: React.FC<any> = ({ children, breadcrumbItems }) => {
  const singleNavigationItem = breadcrumbItems.length === 1;
  return (
    <>
      <CUI.Box bg={singleNavigationItem ? "blue.700" : "blue.100"}>
        <CUI.Container maxW="7xl" py="5">
          <QMR.Breadcrumbs
            items={breadcrumbItems}
            color={singleNavigationItem ? "white" : "inherit"}
          />
        </CUI.Container>
      </CUI.Box>
      <CUI.Container maxW="7xl" py="5">
        {children}
      </CUI.Container>
    </>
  );
};
