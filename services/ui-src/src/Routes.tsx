import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Auth } from "aws-amplify";
import Home from "containers/Home";
import NotFound from "containers/NotFound";
import AdminHome from "containers/AdminHome";
import BOHome from "containers/BOHome";
import CoreSet from "containers/CoreSet";
import Measure from "containers/Measure/Measure";
import StateHome from "containers/StateHome";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import ContactUs from "containers/ContactUs";
import UserManagement from "containers/UserManagement";
import Login from "containers/Login/Login";
import { RootStateOrAny, useSelector } from "react-redux";
import { getRedirectRoute } from "libs/routeHelpers";
// Todo: Uncomment this segment when need to run S3 locally
///////////////////////////////////////////////////////////
// import AWS from "aws-sdk";
// import {
//   s3AmplifyUpload,
//   s3LocalUploader,
//   s3AmplifyGetURL,
//   s3LocalGetURL,
// } from "libs/awsLib";
// import config from "config";

export default function Routes(): JSX.Element  {
  let redirectRoute = "/";
  const role = useSelector((state: RootStateOrAny) =>
    state.user.attributes ? state.user.attributes["app-role"] : undefined
  );
  redirectRoute = redirectTo(role);
  return (
    <main id="main-wrapper">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/contactus">
          <ContactUs />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        {authenticatedRoutes()}
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Redirect to={redirectRoute} />
    </main>
  );
}

function isStage() {
  const stages = [
    "cms.gov",
    "d3oa1modhpamdr", // Develop cloudfront subdomain
    "d2trmwuh71fc6", // Val cloudfront subdomain
    "d3f1ohm9wse9tc", // Prod cloudfront subdomain
  ];
  const hostName = window.location.hostname;
  return (
    hostName.indexOf(stages[0]) >= 0 ||
    hostName.indexOf(stages[1]) >= 0 ||
    hostName.indexOf(stages[2]) >= 0 ||
    hostName.indexOf(stages[3]) >= 0
  );
}

function redirectTo(role: string) {
  let redirectRoute = "/";
  if (!role) {
    if (isStage()) {
      const authConfig = Auth.configure();

      if (authConfig?.oauth) {
        const { domain, redirectSignIn, responseType }: any = authConfig.oauth;
        const clientId = authConfig.userPoolWebClientId;
        const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
        window.location.assign(url);
      }
    } else {
      redirectRoute = "/login";
    }
  } else {
    redirectRoute = getRedirectRoute(role);
  }
  return redirectRoute;
}

function authenticatedRoutes() {
  return (
    <>
      <AuthenticatedRoute exact path="/adminhome">
        <AdminHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/bohome">
        <BOHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/coreset">
        <CoreSet />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/measure">
        <Measure />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/statehome">
        <StateHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/usermanagement">
        <UserManagement />
      </AuthenticatedRoute>
    </>
  );
}
