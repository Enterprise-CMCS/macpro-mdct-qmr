import { UsaBanner } from "@cmsgov/design-system";
import { Logo } from "components";
import { Link } from "react-router-dom";
import * as CUI from "@chakra-ui/react";

interface Props {
  handleLogout: () => void;
}

export function Header({ handleLogout }: Props) {
  return (
    <header
      data-testid="header"
      className="hidden-print-items"
      style={{ zIndex: 3 }}
    >
      <UsaBanner />
      {/* using hex color here for branded color */}
      <CUI.Box bg="blue.800">
        <CUI.Container maxW="7xl">
          <CUI.Flex py="4" alignItems="center">
            <Link to="/" aria-label="State home page" className="logo-link">
              <Logo />
            </Link>
            <CUI.Spacer flex={6} />
            <CUI.Button onClick={handleLogout} variant="link-white">
              <CUI.Image
                src="/header/logout.svg"
                alt=""
                sx={{ maxWidth: "24px", marginRight: "0.25rem" }}
              />
              <CUI.Hide below="md">Logout</CUI.Hide>
            </CUI.Button>
          </CUI.Flex>
        </CUI.Container>
      </CUI.Box>
    </header>
  );
}
