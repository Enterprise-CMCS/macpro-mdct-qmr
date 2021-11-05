import { UsaBanner } from "@cmsgov/design-system";
import { QMRLogo } from "components/QMRLogo";
import * as Bootstrap from "react-bootstrap";
import { RootStateOrAny, useSelector } from "react-redux";

function Header({ handleLogout }: { handleLogout: Function }) {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.user.attributes
  );
  return (
    <>
      <UsaBanner />
      <Bootstrap.Navbar className="nav-bar">
        <Bootstrap.Container>
          <Bootstrap.Navbar.Brand href="/">
            <QMRLogo />
          </Bootstrap.Navbar.Brand>
          <Bootstrap.Navbar.Toggle />
          <Bootstrap.Navbar.Collapse className="justify-content-end">
            {isAuthenticated ? (
              <Bootstrap.NavDropdown title="My Account">
                <Bootstrap.NavDropdown.Item href="/profile">
                  Profile
                </Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Item onClick={handleLogout()}>
                  Logout
                </Bootstrap.NavDropdown.Item>
              </Bootstrap.NavDropdown>
            ) : (
              <Bootstrap.Nav.Link href="/login">Login</Bootstrap.Nav.Link>
            )}
          </Bootstrap.Navbar.Collapse>
        </Bootstrap.Container>
      </Bootstrap.Navbar>
    </>
  );
}

export default Header;
