import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import config from "config";

import { UserContext, UserContextInterface } from "./userContext";
import { UserRoles } from "types";

interface Props {
  children?: ReactNode;
}

const authenticateWithIDM = () => {
  const domain = config.cognito.APP_CLIENT_DOMAIN;
  const responseType = "token";
  const redirectSignIn = config.cognito.REDIRECT_SIGNIN;
  const clientId = config.cognito.APP_CLIENT_ID;
  const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
  window.location.assign(url);
};

export const UserProvider = ({ children }: Props) => {
  const location = useLocation();
  const isProduction = window.location.origin.includes(config.PROD_URL);

  const [user, setUser] = useState<any>(null);
  const [showLocalLogins, setShowLocalLogins] = useState(false);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      await signOut();
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
      const authenticatedUser = await getCurrentUser();
      setUser(authenticatedUser);
    } catch (e) {
      if (isProduction) {
        authenticateWithIDM();
      } else {
        setShowLocalLogins(true);
      }
    }
  }, [isProduction, location]);

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
