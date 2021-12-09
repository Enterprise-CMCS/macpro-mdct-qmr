import { Route, Routes } from "react-router-dom";
import { CognitoUser } from "@aws-amplify/auth";
import * as Views from "views";

export type Params = "state" | "year" | "coreset" | "measure";

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
    component: Views.ApiTester,
    name: "ApiTest",
    path: "/api-test",
    exact: true,
  },
  {
    component: Views.NewAmendment,
    name: "YourMom",
    path: "/amendment",
    exact: true,
  },
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
    component: Views.AdminHome,
    name: "Admin Home",
    path: "admin",
    exact: true,
  },
  {
    component: Views.AddChildCoreSet,
    name: "Add Child Core Set",
    path: "/:state/:year/add-child",
    exact: true,
  },
  {
    component: Views.AddHHCoreSet,
    name: "Add Health Homes Set",
    path: "/:state/:year/add-hh",
    exact: true,
  },
  {
    component: Views.CoreSet,
    name: "Core Set",
    path: "/:state/:year/:coreset/",
    exact: true,
  },
  {
    component: Views.DemoQuestions,
    name: "Measure",
    path: "/OH/2021/ACS/AIF-HH",
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
    path: "components",
    exact: true,
  },
  {
    component: Views.NotFound,
    name: "Not Found",
    exact: false,
    path: "*",
  },
];

export function AppRoutes({ user }: { user: CognitoUser }) {
  return (
    <main id="main-wrapper">
      <Routes>
        {routes.map(({ name, component: Component, path }) => (
          <Route key={name} path={path} element={<Component user={user} />} />
        ))}
      </Routes>
    </main>
  );
}
