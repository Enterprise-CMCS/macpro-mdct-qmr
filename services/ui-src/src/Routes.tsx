import { Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "components";
import * as Views from "views";

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
  return (
    <main id="main-wrapper">
      <Switch>
        <AuthenticatedRoute exact path="/" component={Views.Home} />
        <AuthenticatedRoute
          exact
          path="/:state/adminhome"
          component={Views.AdminHome}
        />
        <AuthenticatedRoute exact path="/bohome" component={Views.BOHome} />
        <AuthenticatedRoute
          exact
          path="/:state/:year/:coreset/"
          component={Views.CoreSet}
        />
        <AuthenticatedRoute
          exact
          path="/:state/:year/:coreset/:measure"
          component={Views.Measure}
        />
        <AuthenticatedRoute
          exact
          path="/statehome"
          component={Views.StateHome}
        />
        <AuthenticatedRoute
          exact
          path="/usermanagement"
          component={Views.UserManagement}
        />
        <AuthenticatedRoute exact path="/helpdesk" component={Views.HelpDesk} />
        <AuthenticatedRoute exact path="/profile" component={Views.Profile} />
        <AuthenticatedRoute exact path="/" component={Views.Home} />
        <Route exact path="/login" component={Views.Login} />
        <Route exact path="/components" component={Views.DemoComponents} />
        <Route component={Views.NotFound} />
      </Switch>
    </main>
  );
}
