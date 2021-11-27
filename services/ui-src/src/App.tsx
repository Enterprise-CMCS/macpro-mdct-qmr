import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Routes } from "./Routes";
import * as QMR from "components";
import * as Libs from "./libs";

function App(): JSX.Element | null {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let user;
      try {
        user = await Auth.currentAuthenticatedUser();
      } catch {
        setIsAuthenticating(false);
      }
      if (user) {
        const cmsRoleAttribute =
          user?.attributes ?? user?.signInUserSession?.idToken?.payload;
        if (!user.attributes) user.attributes = {};
        // *** make sure attributes exist and are in standard format
        user.attributes["app-role"] = Libs.determineRole(
          cmsRoleAttribute ? cmsRoleAttribute["custom:cms_roles"] : ""
        );
        setIsAuthenticating(false);
        userHasAuthenticated(true);
      }
      setIsAuthenticating(false);
    })();
  }, []);

  async function handleLogout() {
    userHasAuthenticated(false);
    try {
      await Auth.signOut();
      const oAuthOpts = Auth.configure()?.oauth;

      if (oAuthOpts && "redirectSignOut" in oAuthOpts) {
        window.location.href = oAuthOpts.redirectSignOut;
      }
    } catch (error) {
      console.log("error signing out: ", error);
    }
    history.push("/");
  }

  if (isAuthenticating) {
    return null;
  }

  return (
    <div id="app-wrapper">
      <QMR.Header handleLogout={handleLogout} />
      <Libs.AppContext.Provider
        value={{
          isAuthenticated,
          userHasAuthenticated,
        }}
      >
        <Routes />
        <QMR.Footer />
      </Libs.AppContext.Provider>
    </div>
  );
}

export default App;
