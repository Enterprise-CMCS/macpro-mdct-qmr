import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { AuthenticatedRouteProps } from "@/components/AuthenticatedRouteProps"

export default function AuthenticatedRoute({ children, ...rest }: AuthenticatedRouteProps): JSX.Element  {
  const { pathname, search } = useLocation();
  const isAuthenticated = useSelector((state: RootStateOrAny) => state.user.attributes);
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
