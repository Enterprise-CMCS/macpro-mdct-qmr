import React from "react";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import config from "config";
import { getLocalUserInfo, logoutLocalUser } from "libs";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext<UserContextInterface>({});

interface Props {
  children?: any;
}

interface UserContextInterface {
  user?: CognitoUser;
  showLocalLogins?: boolean;
  logout?: () => Promise<void>;
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
  const isIntegrationBranch = window.location.origin.includes("cms.gov");
  const [user, setUser] = React.useState(null);
  const [showlocalLogins, setShowLocalLogins] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
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

    // attempt to fetch the info of the user that was already logged in
    const checkAuthState = async () => {
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
    };
    checkAuthState();
  }, [isIntegrationBranch]);

  const logout = async () => {
    const data = await Auth.signOut();
    console.log(data);
    try {
      logoutLocalUser();
      setUser(null);
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
    navigate("/");
  };

  const values: any = React.useMemo(
    () => ({ user, logout, showlocalLogins }),
    [user, logout, showlocalLogins]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context;
};
