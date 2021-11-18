import { Route, Redirect, useLocation } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";

export function AuthenticatedRoute({
  children,
  ...rest
}: IAuthenticatedRouteProps): JSX.Element {
  const { pathname, search } = useLocation();
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.user.attributes
  );
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
