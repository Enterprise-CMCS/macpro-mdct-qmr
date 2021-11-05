import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "libs/contextLib";
import { IUnauthenticatedRouteProps } from "components/IUnathenticatedRouteProps";

function querystring(name: string, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute({
  children,
  ...rest
}: IUnauthenticatedRouteProps): JSX.Element {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
  );
}
