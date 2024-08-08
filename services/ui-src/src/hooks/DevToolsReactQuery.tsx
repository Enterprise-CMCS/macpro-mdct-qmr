import React from "react";
import config from "config";

/**
 * Render React Query Devtools exclusively in a local environment.
 * Include master or check against not production if deployed envs desired.
 *
 * https://tanstack.com/router/latest/docs/framework/react/devtools
 */
export const DevToolsReactQuery =
  config.BRANCH_NAME === "local"
    ? () => null
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        }))
      );
