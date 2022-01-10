import { useContext } from "react";
import { ApiContext } from "./ApiProvider";
import { API } from "aws-amplify";
import { useEffect } from "react";
import config from "config";
import { useUser } from "hooks/authHooks";

export const useApi = () => {
  const context = useContext(ApiContext);

  const userInfo = useUser();
  useEffect(() => {
    API.configure({
      endpoints: [
        {
          name: "coreSet",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
          custom_header: async () => {
            return {
              //@ts-ignore
              user_state: userInfo!.userState!,
              //@ts-ignore
              user_role: userInfo!.user!.role!,
            };
          },
        },
      ],
    });
  }, []);

  if (context === undefined) {
    throw new Error("`useApi` hook must be used within a `UserApi` component");
  }
  return context;
};
