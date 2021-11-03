export interface AppContextInterface {
    isAuthenticated?: boolean;
    userHasAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  }