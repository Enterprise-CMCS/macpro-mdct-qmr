import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Auth } from "aws-amplify";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AdminHome from "./containers/AdminHome";
import BOHome from "./containers/BOHome";
import CoreSet from "./containers/CoreSet";
import Measure from "./containers/Measure";
import StateHome from "./containers/StateHome";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import ContactUs from "./containers/ContactUs";
import UserManagement from "./containers/UserManagement";
import Login from "./containers/Login/Login";
import { useSelector } from "react-redux";
import { getRedirectRoute } from "./libs/routeHelpers";

// Todo: Uncomment this segment when need to run S3 locally
///////////////////////////////////////////////////////////
// import AWS from "aws-sdk";
// import {
//   s3AmplifyUpload,
//   s3LocalUploader,
//   s3AmplifyGetURL,
//   s3LocalGetURL,
// } from "./libs/awsLib";
// import config from "./config";

export default function Routes() {
  // Todo: Uncomment this segment when need to run S3 locally
  ///////////////////////////////////////////////////////////
  // // This might not be quite the right place for it, but I'm doing
  // // dependency injection here, on the component level.
  // // Local Login
  // const localLogin = config.LOCAL_LOGIN === "true";

  // // Local s3
  // const localEndpoint = config.s3.LOCAL_ENDPOINT;
  // let s3Upload = s3AmplifyUpload;
  // let s3URLResolver = s3AmplifyGetURL;
  // if (localLogin && localEndpoint !== "") {
  //   // Amplify doesn't allow you to configure the AWS Endpoint, so for local dev we need our own S3Client configured.
  //   let s3Client = new AWS.S3({
  //     s3ForcePathStyle: true,
  //     apiVersion: "2006-03-01",
  //     accessKeyId: "S3RVER", // This specific key is required when working offline   pragma: allowlist secret
  //     secretAccessKey: "S3RVER", // pragma: allowlist secret
  //     params: { Bucket: config.s3.BUCKET },
  //     endpoint: new AWS.Endpoint(localEndpoint),
  //   });
  //   s3Upload = s3LocalUploader(s3Client);
  //   s3URLResolver = s3LocalGetURL(s3Client);
  // }

  const isStage = () => {
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
  };
  let redirectRoute = "/";
  const role = useSelector((state) => {
    if (state.user.attributes) {
      return state.user.attributes["app-role"];
    }
    return undefined;
  });
  if (!role) {
    if (isStage()) {
      const authConfig = Auth.configure();
      const { domain, redirectSignIn, responseType } = authConfig.oauth;
      const clientId = authConfig.userPoolWebClientId;
      const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
      window.location.assign(url);
    } else {
      redirectRoute = "/login";
    }
  } else {
    redirectRoute = getRedirectRoute(role);
  }

  return (
    <>
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Redirect to={redirectRoute} />
    </>
  );
}
