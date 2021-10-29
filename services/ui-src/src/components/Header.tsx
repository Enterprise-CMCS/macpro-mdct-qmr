import React from "react";
import { UsaBanner } from "@cmsgov/design-system";
import { QMRLogo } from "@/src/components/QMRLogo";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Component containing header
 * @param {Object} props - component properties
 */

function Header(props) {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.user.attributes);
  return (
    <>
      <div className="usa-banner-custom">
        <UsaBanner />
      </div>
      <div className="nav-bar">
        <div className="header-wrapper">
          <div className="nav-left">
            <QMRLogo />
          </div>
          <div className="nav-right">
            <Navbar.Collapse>
              <Nav pullRight>
                {isAuthenticated ? (
                  <>
                    <NavDropdown id="User" title="My Account">
                      <LinkContainer to="/profile">
                        <NavItem>User Profile</NavItem>
                      </LinkContainer>
                      <NavItem onClick={() => props.handleLogout()}>
                        Logout
                      </NavItem>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <NavItem
                      id="loginButton"
                      onClick={() => history.push("/login")}
                    >
                      Login
                    </NavItem>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
