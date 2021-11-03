/**
 * Location of all reducers for User modifications
 */
 import { ActionInterface } from "@/store/reducers/ActionInterface";

// Action Types
export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";

const userReducer = (state = {}, action: ActionInterface) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UNSET_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
