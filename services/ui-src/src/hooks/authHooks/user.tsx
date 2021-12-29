import React from "react";
import { Auth } from "aws-amplify";
import config from "config";

export const UserContext = React.createContext(null);

interface UserProviderInterface {
  children?: any;
}

export const UserProvider = ({ children }: UserProviderInterface) => {
  const [user, setUser] = React.useState(null);

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
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const logout = () =>
    Auth.signOut().then((data) => {
      setUser(null);
      return data;
    });

  const values: any = React.useMemo(() => ({ user, logout }), [user]);

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
