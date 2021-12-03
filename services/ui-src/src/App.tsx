import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Routes } from "./Routes";
import * as QMR from "components";
import { LocalLogins } from "components";
import { useLocation, useHistory } from "react-router-dom";
import * as Libs from "libs";

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
  const isIntegrationBranch = window.location.origin.includes("cms.gov");
  const [user, setUser] = useState(null);
  const [showlocalLogins, setShowLocalLogins] = useState(false);
  const history = useHistory();
  const location = useLocation();

  async function checkAuthState() {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      setUser(authenticatedUser);
    } catch (e) {
      if (isIntegrationBranch) {
        authenticateWithIDM();
      } else {
        const localUser = Libs.getLocalUserInfo();
        if (localUser) {
          setUser(localUser);
        } else {
          setShowLocalLogins(true);
        }
      }
    }
  }

  async function handleLogout() {
    try {
      Libs.logoutLocalUser();
      setUser(null);
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
    history.push("/");
  }

  useEffect(() => {
    checkAuthState();
  }, [location]);

  return (
    <div id="app-wrapper">
      {user && (
        <>
          <QMR.Header handleLogout={handleLogout} />
          <Routes user={user} />
          <QMR.Footer />
        </>
      )}
      {!user && showlocalLogins && (
        <LocalLogins loginWithIDM={authenticateWithIDM} />
      )}
    </div>
  );
};

export default App;
