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
      const tokens = (await fetchAuthSession()).tokens;
      if (!tokens?.idToken) {
        throw new Error("Missing tokens auth session.");
      }
      const payload = tokens.idToken.payload;
      const { email, given_name, family_name } = payload as Record<
        string,
        string
      >;
      // "custom:cms_roles" is an string of concat roles so we need to check for the one applicable to qmr
      const role = (payload?.["custom:cms_roles"] as string | undefined)
        ?.split(",")
        .find((r) => r.includes("mdctqmr"));
      setUserRole(role as UserRoles);

      const userIsStateUser = role === UserRoles.STATE_USER;
      setIsStateUser(userIsStateUser); // excludes all admin-type users (admin, approver, help desk, internal)

      const state = payload?.["custom:cms_state"];
      setUserState(state);

      const currentUser = {
        email,
        given_name,
        family_name,
        userRole,
        state,
        userIsStateUser,
      };
      setUser(currentUser);
    } catch (e) {
      if (isProduction) {
        await authenticateWithIDM();
      } else {
        setShowLocalLogins(true);
      }
    }
  }, [isProduction, location]);

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
