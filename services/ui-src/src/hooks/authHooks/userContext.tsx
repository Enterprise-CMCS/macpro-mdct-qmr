import { createContext } from "react";

export interface UserContextInterface {
  user?: any;
  showLocalLogins?: boolean;
  logout: () => Promise<void>;
  loginWithIDM: () => Promise<void>;
  isStateUser: boolean;
  userState?: string;
  userRole?: string;
}

export const UserContext = createContext<UserContextInterface>({
  logout: async () => {
    console.log("User Context failed to initialize logout functionality");
  },
  loginWithIDM: async () => {
    console.log("User Context failed to initialize IDM login functionality.");
  },
  isStateUser: false,
});
