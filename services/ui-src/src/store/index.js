import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import userReducer from "./reducers/user/userSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    rootReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "development"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});
