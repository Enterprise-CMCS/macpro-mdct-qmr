import { ReactNode, useEffect, useMemo } from "react";
import { API } from "aws-amplify";
import config from "config";
import { createContext } from "react";
import { useUser } from ".";

const ApiContext = createContext({});

interface Props {
  children?: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const { user } = useUser();
  useEffect(() => {
    API.configure({
      endpoints: [
        {
          name: "coreSet",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
          custom_header: async () => {
            return {
              user_state:
                user?.signInUserSession?.idToken?.payload?.["custom:cms_state"],
              user_role:
                user?.signInUserSession?.idToken?.payload?.["custom:cms_roles"],
            };
          },
        },
      ],
    });
  }, []);

  const values = useMemo(() => ({}), []);

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
