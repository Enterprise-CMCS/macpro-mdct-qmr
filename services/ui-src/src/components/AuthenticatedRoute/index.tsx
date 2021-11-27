import { Route, Redirect, useLocation } from "react-router-dom";

export function AuthenticatedRoute({
  children,
  ...rest
}: IAuthenticatedRouteProps): JSX.Element {
  const { pathname, search } = useLocation();
  const isAuthenticated = true;
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
