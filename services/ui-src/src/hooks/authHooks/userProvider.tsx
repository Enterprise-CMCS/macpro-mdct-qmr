import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import config from "config";

import { UserContext, UserContextInterface } from "./userContext";
import { UserRoles } from "types";
import {
  DEV_HOST_DOMAIN,
  PRODUCTION_HOST_DOMAIN,
  VAL_HOST_DOMAIN,
} from "utils";

interface Props {
  children?: ReactNode;
}

const authenticateWithIDM = () => {
  const authConfig = Auth.configure();
  if (authConfig?.oauth) {
    const oAuthOpts = authConfig.oauth;
    const domain = oAuthOpts.domain;
    const responseType = oAuthOpts.responseType;
    const redirectSignIn = (oAuthOpts as any).redirectSignIn;
    const clientId = authConfig.userPoolWebClientId;
    const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
    window.location.assign(url);
  }
};

export const UserProvider = ({ children }: Props) => {
  const location = useLocation();
  const idmExclusiveDomains = [
    PRODUCTION_HOST_DOMAIN,
    VAL_HOST_DOMAIN,
    DEV_HOST_DOMAIN,
  ];
  const idmLoginOnly = idmExclusiveDomains.includes(window.location.hostname);

  const [user, setUser] = useState<any>(null);
  const [showLocalLogins, setShowLocalLogins] = useState(false);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
    window.location.href = config.POST_SIGNOUT_REDIRECT;
  }, []);

  const checkAuthState = useCallback(async () => {
    // Allow Post Logout flow alongside user login flow
    if (location?.pathname.toLowerCase() === "/postlogout") {
      window.location.href = config.POST_SIGNOUT_REDIRECT;
      return;
    }

    // Authenticate
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      setUser(authenticatedUser);
    } catch (e) {
      if (idmLoginOnly) {
        authenticateWithIDM();
      } else {
        setShowLocalLogins(true);
      }
    }
  }, [idmLoginOnly, location]);

  // "custom:cms_roles" is an string of concat roles so we need to check for the one applicable to qmr
  const userRole = (
    user?.signInUserSession?.idToken?.payload?.["custom:cms_roles"] as
      | string
      | undefined
  )
    ?.split(",")
    .find((r) => r.includes("mdctqmr"));

  const isStateUser = userRole === UserRoles.STATE_USER; // excludes all admin-type users (admin, approver, help desk, internal)

  const userState =
    user?.signInUserSession?.idToken?.payload?.["custom:cms_state"];

  // single run configuration
  useEffect(() => {
    Auth.configure({
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID,
      oauth: {
        domain: config.cognito.APP_CLIENT_DOMAIN,
        redirectSignIn: config.cognito.REDIRECT_SIGNIN,
        redirectSignOut: config.cognito.REDIRECT_SIGNOUT,
        scope: ["email", "openid"],
        responseType: "token",
      },
    });
  }, []);

  // rerender on auth state change, checking router location
  useEffect(() => {
    checkAuthState();
  }, [location, checkAuthState]);

  const values: UserContextInterface = useMemo(
    () => ({
      user,
      logout,
      showLocalLogins,
      loginWithIDM: authenticateWithIDM,
      isStateUser,
      userState,
      userRole,
    }),
    [user, logout, showLocalLogins, isStateUser, userState, userRole]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
