export interface IAppContextInterface {
    isAuthenticated?: boolean;
    userHasAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  }