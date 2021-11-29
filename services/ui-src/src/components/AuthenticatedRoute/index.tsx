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
