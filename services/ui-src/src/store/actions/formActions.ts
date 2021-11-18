/**
 * Location of all actions for form reducers
 */

// Action Types
export const UPDATE_FORM = "UPDATE_FORM";

// Action Creators
export const setFormValues = (form: Object) => {
  return {
    type: UPDATE_FORM,
    form,
  };
};
