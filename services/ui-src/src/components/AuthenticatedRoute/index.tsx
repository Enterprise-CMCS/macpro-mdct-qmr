import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Auth } from "aws-amplify";
import { FunctionComponent } from "react-router/node_modules/@types/react";
import { LocalLogins } from "components";
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

export function AuthenticatedRoute({
  component: Component,
  ...rest
}: IAuthenticatedRouteProps): JSX.Element {
  const isIntegrationBranch = window.location.origin.includes("cms.gov");
  const [user, setUser] = useState(null);
  const [showlocalLogins, setShowLocalLogins] = useState(false);
  const localUser = Libs.getLocalUserInfo();
  async function checkAuthState() {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      setUser(authenticatedUser);
    } catch (e) {
      if (isIntegrationBranch) {
        authenticateWithIDM();
      } else {
        if (localUser) {
          setUser(localUser);
        } else {
          setShowLocalLogins(true);
        }
      }
    }
  }
  useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <Route {...rest}>
      {user && (
        <>
          <Component user={user} />
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </>
      )}
      {!user && showlocalLogins && (
        <LocalLogins loginWithIDM={authenticateWithIDM} />
      )}
    </Route>
  );
}
interface IAuthenticatedRouteProps {
  exact: boolean;
  path?: string;
  component: FunctionComponent<any>;
}
