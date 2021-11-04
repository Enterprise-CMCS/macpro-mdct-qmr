/**
 * Location of all actions for user reducers
 */
import { IUser } from "components/LocalLogins/IUser";

// Action Types
export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";

// Action Creators
export const setUser = (user: IUser) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER,
  };
};
