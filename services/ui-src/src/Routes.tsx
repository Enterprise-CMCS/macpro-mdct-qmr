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

export const routes = [
  {
    component: Views.Home,
    name: "Home",
    path: "/",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.AdminHome,
    name: "Admin Home",
    path: "/admin",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.BOHome,
    name: "Business Owner Home",
    path: "/bohome",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.StateHome,
    name: "State Home",
    path: "/:state/:year",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.CoreSet,
    name: "Core Set",
    path: "/:state/:year/:coreset/",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.Measure,
    name: "Measure",
    path: "/:state/:year/:coreset/:measure",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.Home,
    name: "Home",
    path: "/",
    exact: true,
    isAuthenticated: true,
  },
  {
    component: Views.Login,
    name: "Home",
    path: "/login",
    exact: true,
    isAuthenticated: false,
  },
  {
    component: Views.DemoComponents,
    name: "Components",
    path: "/components",
    exact: true,
    isAuthenticated: false,
  },
  {
    component: Views.NotFound,
    name: "Not Found",
    exact: false,
    isAuthenticated: false,
  },
];

export function Routes() {
  return (
    <main id="main-wrapper">
      <Switch>
        {routes.map(({ isAuthenticated, name, ...rest }) =>
          isAuthenticated ? (
            <AuthenticatedRoute key={name} {...rest} />
          ) : (
            <Route key={name} {...rest} />
          )
        )}
      </Switch>
    </main>
  );
}
