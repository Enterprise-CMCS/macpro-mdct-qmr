import { UsaBanner } from "@cmsgov/design-system";
import QMRLogo from "components/QMRLogo";
import * as Bootstrap from "react-bootstrap";
import { RootStateOrAny, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Header({ handleLogout }: { handleLogout: Function }) {
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.user.attributes
  );
  return (
    <div data-testid="header">
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
                <Bootstrap.NavDropdown.Item
                  onClick={() => history.push("/profile")}
                >
                  Profile
                </Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </Bootstrap.NavDropdown.Item>
              </Bootstrap.NavDropdown>
            ) : (
              <Bootstrap.Nav.Link href="/login">Login</Bootstrap.Nav.Link>
            )}
          </Bootstrap.Navbar.Collapse>
        </Bootstrap.Container>
      </Bootstrap.Navbar>
    </div>
  );
}

export default Header;
