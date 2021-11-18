import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { Location } from "history";
import { Auth } from "aws-amplify";
import { getRedirectRoute } from "libs";
import { AuthenticatedRoute } from "components";
import * as Pages from "pages";

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
  const isIntegrationBranch = window.location.hostname.includes("cms.gov");
  const role = useSelector((state: RootStateOrAny) =>
    state.user.attributes ? state.user.attributes["app-role"] : undefined
  );
  redirectRoute = redirectTo(role, isIntegrationBranch, location);
  return (
    <main id="main-wrapper">
      <Switch>
        <Route exact path="/">
          <Pages.Home />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/contactus">
          <Pages.ContactUs />
        </Route>
        <Route exact path="/login">
          <Pages.Login />
        </Route>
        <Route exact path="/components">
          <Pages.DemoComponents />
        </Route>
        <AuthenticatedRoutes />
        <Route>
          <Pages.NotFound />
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

function AuthenticatedRoutes() {
  return (
    <>
      <AuthenticatedRoute exact path="/adminhome">
        <Pages.AdminHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/bohome">
        <Pages.BOHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/coreset">
        <Pages.CoreSet />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/measure">
        <Pages.Measure />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/statehome">
        <Pages.StateHome />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/usermanagement">
        <Pages.UserManagement />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/helpdesk">
        <Pages.HelpDesk />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile">
        <Pages.Profile />
      </AuthenticatedRoute>
    </>
  );
}
