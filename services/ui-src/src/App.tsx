// import { useEffect, useState, useCallback } from "react";
import { Auth } from "aws-amplify";
// import { CognitoUser } from "@aws-amplify/auth";
import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins } from "components";
// import { useLocation } from "react-router-dom";
// import * as Libs from "libs";
import { useUser } from "hooks/authHooks/user";

const authenticateWithIDM = () => {
  const authConfig = Auth.configure();
  if (authConfig?.oauth) {
    const oAuthOpts = authConfig.oauth;
    const domain = oAuthOpts.domain;
    const responseType = oAuthOpts.responseType;
    let redirectSignIn;

    if ("redirectSignOut" in oAuthOpts) {
      redirectSignIn = oAuthOpts.redirectSignOut;
    }

    const clientId = authConfig.userPoolWebClientId;
    const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
    window.location.assign(url);
  }
};

const App = () => {
  // const isIntegrationBranch = window.location.origin.includes("cms.gov");
  // const [user, setUser] = useState<CognitoUser | null>(null);
  // const [showlocalLogins, setShowLocalLogins] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  const { logout, user, showLocalLogins } = useUser();

  // const checkAuthState = useCallback(async () => {
  //   try {
  //     const authenticatedUser = await Auth.currentAuthenticatedUser();
  //     setUser(authenticatedUser);
  //   } catch (e) {
  //     if (isIntegrationBranch) {
  //       authenticateWithIDM();
  //     } else {
  //       const localUser = Libs.getLocalUserInfo();
  //       if (localUser) {
  //         setUser(localUser);
  //       } else {
  //         setShowLocalLogins(true);
  //       }
  //     }
  //   }
  // }, [isIntegrationBranch]);

  // async function handleLogout() {
  //   try {
  //     Libs.logoutLocalUser();
  //     setUser(null);
  //     await Auth.signOut();
  //   } catch (error) {
  //     console.log("error signing out: ", error);
  //   }
  //   navigate("/");
  // }

  // useEffect(() => {
  //   checkAuthState();
  // }, [location, checkAuthState]);

  return (
    <div id="app-wrapper">
      {user && (
        <>
          <QMR.Header handleLogout={logout!} />
          <AppRoutes user={user} />
          <QMR.Footer />
        </>
      )}
      {!user && showLocalLogins && (
        <LocalLogins loginWithIDM={authenticateWithIDM} />
      )}
    </div>
  );
};

export default App;
