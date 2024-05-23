import { UsaBanner } from "@cmsgov/design-system";
import { Logo } from "components";
import { Link } from "react-router-dom";
import * as CUI from "@chakra-ui/react";

interface Props {
  handleLogout: () => void;
}

export function Header({ handleLogout }: Props) {
  return (
    <CUI.Box data-testid="header" className="hidden-print-items" zIndex={3}>
      <UsaBanner />
      {/* using hex color here for branded color */}
      <CUI.Box bg="#0071bc">
        <CUI.Container maxW="7xl">
          <CUI.Flex py="4" alignItems="center">
            <Link to="/" aria-label="State home page" className="logo-link">
              <Logo />
            </Link>
            <CUI.Spacer flex={6} />
            <CUI.Button onClick={handleLogout} variant="link-white">
              Logout
            </CUI.Button>
          </CUI.Flex>
        </CUI.Container>
      </CUI.Box>
    </CUI.Box>
  );
}
