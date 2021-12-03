import { useEffect, useState } from "react";
import { UsaBanner } from "@cmsgov/design-system";
import { Logo } from "components";
import { Auth } from "aws-amplify";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as Libs from "libs";
import * as CUI from "@chakra-ui/react";

export function Header() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const checkIfUserIsAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const localUser = Libs.getLocalUserInfo();

    if (localUser) {
      setUser(localUser);
    } else {
      checkIfUserIsAuthenticated();
    }
  }, [location]);

  async function handleLogout() {
    await Libs.logoutLocalUser();
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
    // setUser(null);
    history.push("/");
  }

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
            {user && (
              <CUI.Button onClick={handleLogout} variant="link" color="white">
                Logout
              </CUI.Button>
            )}
          </CUI.Flex>
        </CUI.Container>
      </CUI.Box>
    </CUI.Box>
  );
}
