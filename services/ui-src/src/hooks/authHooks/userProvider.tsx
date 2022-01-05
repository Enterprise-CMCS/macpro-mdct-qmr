import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import config from "config";
import { getLocalUserInfo, logoutLocalUser } from "libs";

import { UserContext, UserContextInterface } from "./userContext";
import { UserRoles } from "types";

interface Props {
  children?: ReactNode;
}

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

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIntegrationBranch = window.location.origin.includes("cms.gov");

  const [user, setUser] = useState<any>(null);
  const [showLocalLogins, setShowLocalLogins] = useState(false);

  const logout = useCallback(async () => {
    try {
      logoutLocalUser();
      setUser(null);
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
    navigate("/");
  }, [navigate]);

  const checkAuthState = useCallback(async () => {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      setUser(authenticatedUser);
    } catch (e) {
      if (isIntegrationBranch) {
        authenticateWithIDM();
      } else {
        const localUser = getLocalUserInfo();
        if (localUser) {
          setUser(localUser);
        } else {
          setShowLocalLogins(true);
        }
      }
    }
  }, [isIntegrationBranch]);

  const isStateUser =
    user?.signInUserSession?.idToken?.payload?.["custom:cms_roles"] ===
    UserRoles.STATE;

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

  useEffect(() => {
    API.configure({
      endpoints: [
        {
          name: "coreSet",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
          custom_header: async () => {
            return {
              user_state:
                user?.signInUserSession?.idToken?.payload?.["custom:cms_state"],
              user_role:
                user?.signInUserSession?.idToken?.payload?.["custom:cms_roles"],
            };
          },
        },
      ],
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
    }),
    [user, logout, showLocalLogins, isStateUser, userState]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
