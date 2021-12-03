import { Route, Switch } from "react-router-dom";
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
  },
  {
    component: Views.StateHome,
    name: "State",
    path: "/:state/:year",
    exact: true,
  },
  {
    component: Views.CoreSet,
    name: "Core Set",
    path: "/:state/:year/:coreset/",
    exact: true,
  },
  {
    component: Views.Measure,
    name: "Measure",
    path: "/:state/:year/:coreset/:measure",
    exact: true,
  },
  {
    component: Views.DemoComponents,
    name: "Components",
    path: "/components",
    exact: true,
  },
  {
    component: Views.NotFound,
    name: "Not Found",
    exact: false,
  },
];

export function Routes({ user }: any) {
  return (
    <main id="main-wrapper">
      <Switch>
        {routes.map(({ name, component: Component, exact, path }) => (
          <Route key={name} exact={exact} path={path}>
            <Component user={user} />
          </Route>
        ))}
      </Switch>
    </main>
  );
}
