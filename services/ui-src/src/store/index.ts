import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "@/store/reducers";

// Consolidate middleware
let middlewareArray = [thunk];

// log redux only in dev environment
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  const { logger } = require("redux-logger");

  middlewareArray.push(logger);
}
const middleware = composeWithDevTools(applyMiddleware(...middlewareArray));

// Create store with reducers and middleware
const store = createStore(rootReducer, middleware);

// Export the store to be picked up by the root component in index.js
export default store;
