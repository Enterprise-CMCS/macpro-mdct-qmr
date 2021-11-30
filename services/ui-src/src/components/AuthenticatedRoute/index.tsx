import { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";

export function AuthenticatedRoute({
  children,
  ...rest
}: IAuthenticatedRouteProps): JSX.Element {
  const { pathname, search } = useLocation();
  const isAuthenticated = true;

  useEffect(() => {
    (async () => {
      try {
        const auth = await Auth.currentAuthenticatedUser();
        console.log({ auth });
      } catch (e) {
        const authConfig = Auth.configure();
        console.log({ authConfig });

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

        console.log(e);
      }
    })();
  }, []);

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/home?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
interface IAuthenticatedRouteProps {
  exact: boolean;
  path: string;
  children: JSX.Element;
}
