import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { Location } from "history";
import { Auth } from "aws-amplify";
import { getRedirectRoute } from "libs";
import { AuthenticatedRoute } from "components";
import * as Views from "views";

export interface Params {
  state: string;
  year: string;
  coreSetId: string;
  measureId: string;
}

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

export function Routes() {
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
          <Views.Home />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/contactus">
          <Views.ContactUs />
        </Route>
        <Route exact path="/login">
          <Views.Login />
        </Route>
        <Route exact path="/components">
          <Views.DemoComponents />
        </Route>
        <Route exact path="/:state/:year/:coreSetId/:measureId">
          <Views.DemoQuestions />
        </Route>
        <AuthenticatedRoutes />
        <Route>
          <Views.NotFound />
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
  // for demo purposes
  if (location.pathname === "/OH/2021/ACS/AIF-HH") {
    return "/OH/2021/ACS/AIF-HH";
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

function AuthenticatedRoutes() {
  return (
    <>
      <AuthenticatedRoute exact path="/adminhome">
        <Views.AdminHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/bohome">
        <Views.BOHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/coreset">
        <Views.CoreSet />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/measure">
        <Views.Measure />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/statehome">
        <Views.StateHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/usermanagement">
        <Views.UserManagement />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/helpdesk">
        <Views.HelpDesk />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile">
        <Views.Profile />
      </AuthenticatedRoute>
    </>
  );
}
