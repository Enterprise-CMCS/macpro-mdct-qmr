import { UsaBanner } from "@cmsgov/design-system";
import { Logo } from "components";
import { Link } from "react-router-dom";
import * as CUI from "@chakra-ui/react";

export function Header({ handleLogout }: any) {
  return (
    <CUI.Box data-testid="header">
      <UsaBanner />
      {/* using hex color here for branded color */}
      <CUI.Box bg="#0071bc">
        <CUI.Container maxW="7xl">
          <CUI.Flex py="4">
            <Link to="/">
              <Logo />
            </Link>
            <CUI.Spacer />
            <CUI.Button onClick={handleLogout} variant="link" color="white">
              Logout
            </CUI.Button>
          </CUI.Flex>
        </CUI.Container>
      </CUI.Box>
    </CUI.Box>
  );
}
