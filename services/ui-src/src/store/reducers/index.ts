/**
 * Central location for combining reducers
 */

import { combineReducers } from "redux";
import formReducer from "store/reducers/formReducer";
import userReducer from "store/reducers/userReducer";

const rootReducer = combineReducers({ form: formReducer, user: userReducer });

export default rootReducer;
