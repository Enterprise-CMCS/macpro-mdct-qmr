import { createContext } from "react";
import { CognitoUser } from "@aws-amplify/auth";

export interface UserContextInterface {
  user?: CognitoUser;
  showLocalLogins?: boolean;
  logout: () => Promise<void>;
  loginWithIDM: () => void;
  readOnly: boolean;
}

export const UserContext = createContext<UserContextInterface>({
  logout: async () => {
    console.log("User Context failed to initialize logout functionality");
  },
  loginWithIDM: () => {
    console.log("User Context failed to initialize IDM login functionality.");
  },
  readOnly: true,
});
