/**
 * Location of all reducers for form modifications
 */

import { ActionInterface } from "@/store/reducers/ActionInterface";

// Action Types
export const UPDATE_FORM = "UPDATE_FORM";

// Initial State
const initialState = {
  forms: {},
  statusData: {},
};

const formReducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default formReducer;
