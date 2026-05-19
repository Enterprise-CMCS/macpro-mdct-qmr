import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchAuthSession,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import config from "config";

import { UserContext, UserContextInterface } from "./userContext";
import { UserRoles } from "types";

interface Props {
  children?: ReactNode;
}

const authenticateWithIDM = async () => {
  // Clear any stale cached tokens / OAuth state before initiating the
  // redirect. If a previous session left expired tokens or stale PKCE
  // values in localStorage, signInWithRedirect can fail silently or
  // produce an OAuth state mismatch when IDM redirects back. This runs
  // in all environments because every caller of this function is about
  // to redirect away — we never call it on a user with a valid session.
  try {
    await signOut({ global: false });
  } catch {
    // Ignore — we only care about clearing local state, not server-side.
  }
  await signInWithRedirect({ provider: { custom: "Okta" } });
};

export const UserProvider = ({ children }: Props) => {
  const location = useLocation();
  const isProduction = window.location.origin.includes(config.PROD_URL);

  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRoles>();
  const [isStateUser, setIsStateUser] = useState<boolean>(false);
  const [userState, setUserState] = useState<any>("");
  const [showLocalLogins, setShowLocalLogins] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      await signOut();
    } catch (error) {
      console.log("error signing out:", error);
    }
  }, []);

  const checkAuthState = useCallback(async () => {
    // Allow Post Logout flow alongside user login flow
    if (location?.pathname.toLowerCase() === "/postlogout") {
      window.location.href = config.POST_SIGNOUT_REDIRECT;
      return;
    }

    // Authenticate
    try {
      setIsLoading(true);
      const tokens = (await fetchAuthSession()).tokens;
      if (!tokens?.idToken) {
        throw new Error("Missing tokens auth session.");
      }
      const payload = tokens.idToken.payload;
      // "custom:cms_roles" is an string of concat roles so we need to check for the one applicable to qmr
      const role = (payload?.["custom:cms_roles"] as string | undefined)
        ?.split(",")
        .find((r) => r.includes("mdctqmr"));
      setUserRole(role as UserRoles);

      const userIsStateUser = role === UserRoles.STATE_USER;
      setIsStateUser(userIsStateUser); // excludes all admin-type users (admin, approver, help desk, internal)

      const state = payload?.["custom:cms_state"];
      setUserState(state);
      setUser({
        ...payload,
      });
    } catch {
      if (isProduction) {
        try {
          await authenticateWithIDM();
        } catch (error) {
          // signInWithRedirect failed before navigating away (network,
          // config, etc.). Surface an error so the user isn't stuck on
          // a blank spinner with no recovery path.
          console.log("Error initiating IDM sign-in:", error);
          setAuthError(true);
        }
      } else {
        setShowLocalLogins(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isProduction, location]);

  // rerender on auth state change, checking router location
  useEffect(() => {
    checkAuthState();
  }, [location, checkAuthState]);

  const loginWithIDM = useCallback(async () => {
    setAuthError(false);
    try {
      await authenticateWithIDM();
    } catch (error) {
      console.log("Error initiating IDM sign-in:", error);
      setAuthError(true);
    }
  }, []);

  const values: UserContextInterface = useMemo(
    () => ({
      user,
      logout,
      showLocalLogins,
      isLoading,
      authError,
      loginWithIDM,
      isStateUser,
      userState,
      userRole,
    }),
    [
      user,
      logout,
      showLocalLogins,
      isLoading,
      authError,
      loginWithIDM,
      isStateUser,
      userState,
      userRole,
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
