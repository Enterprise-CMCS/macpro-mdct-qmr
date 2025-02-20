import { createRoot } from "react-dom/client";
import "index.scss";
import App from "App";
import * as serviceWorker from "serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import "aws-amplify/auth/enable-oauth-listener";
import { QueryProvider } from "query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import config from "config";
import { ChakraProvider } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import { theme } from "theme";
import { UserProvider, ApiProvider } from "hooks/authHooks";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

Amplify.configure({
  Storage: {
    S3: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
    },
  },
  API: {
    REST: {
      coreSet: {
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    },
  },
  Auth: {
    Cognito: {
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolClientId: config.cognito.APP_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: config.cognito.APP_CLIENT_DOMAIN,
          redirectSignIn: [config.cognito.REDIRECT_SIGNIN],
          redirectSignOut: [config.cognito.REDIRECT_SIGNOUT],
          scopes: ["email", "openid"],
          responseType: "token",
        },
      },
    },
  },
});

// LaunchDarkly Configuration
const ldClientId = config.REACT_APP_LD_SDK_CLIENT;
(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: ldClientId!,
    options: {
      baseUrl: "https://clientsdk.launchdarkly.us",
      streamUrl: "https://clientstream.launchdarkly.us",
      eventsUrl: "https://events.launchdarkly.us",
    },
    deferInitialization: false,
  });

  const { ToastContainer } = createStandaloneToast();

  createRoot(document.getElementById("root")!).render(
    <Router>
      <UserProvider>
        <ApiProvider>
          <QueryProvider>
            <ChakraProvider cssVarsRoot="#root" theme={theme}>
              <LDProvider>
                <App />
                <ToastContainer />
              </LDProvider>
            </ChakraProvider>
            <ReactQueryDevtools />
          </QueryProvider>
        </ApiProvider>
      </UserProvider>
    </Router>
  );
})().catch((e) => {
  throw e;
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
