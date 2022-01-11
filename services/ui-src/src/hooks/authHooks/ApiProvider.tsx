import { ReactNode, useEffect, useMemo } from "react";
import { API } from "aws-amplify";
import config from "config";
import { createContext } from "react";
import { useUser } from "hooks/authHooks";

export const ApiContext = createContext(null);

interface Props {
  children?: ReactNode;
}

export const ApiProvider = ({ children }: Props) => {
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
              user_state: userInfo!.userState,
              user_role: userInfo!.user!.role,
            };
          },
        },
      ],
    });
  }, [userInfo]);

  const values = useMemo(() => ({}), []);
  // @ts-ignore
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
