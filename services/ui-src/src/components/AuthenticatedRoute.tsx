import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthenticatedRoute({ children, ...rest }): JSX.Element  {
  const { pathname, search } = useLocation();
  const isAuthenticated = useSelector((state) => state.user.attributes);
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
