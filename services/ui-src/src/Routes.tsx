import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Location } from "history";
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
import Profile from "containers/Profile";
import { RootStateOrAny, useSelector } from "react-redux";
import { getRedirectRoute } from "libs/routeHelpers";
import DemoComponents from "components/DemoComponents";
import HelpDeskHome from "containers/HelpDeskHome";
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

export default function Routes() {
  const location = useLocation<Location>();
  let redirectRoute = "/";
  const isIntegrationBranch =
    window.location.hostname.includes("cms.gov") ||
    window.location.hostname.includes("d2s29j7v4rurz6.cloudfront.net") ||
    window.location.hostname.includes("d3f1ohm9wse9tc.cloudfront.net");

  const role = useSelector((state: RootStateOrAny) =>
    state.user.attributes ? state.user.attributes["app-role"] : undefined
  );
  redirectRoute = redirectTo(role, isIntegrationBranch, location);
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
        <Route exact path="/components">
          <DemoComponents />
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

function redirectTo(
  role: string,
  isIntegrationBranch: boolean,
  location: Location
) {
  let redirectRoute = "/";
  if (location.pathname === "/components") {
    return "/components";
  }
  if (!role) {
    if (isIntegrationBranch) {
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
      <AuthenticatedRoute exact path="/helpdeskhome">
        <HelpDeskHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile">
        <Profile />
      </AuthenticatedRoute>
    </>
  );
}
