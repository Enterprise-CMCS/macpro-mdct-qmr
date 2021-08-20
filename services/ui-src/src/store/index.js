import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import logger from 'redux-logger';

export const store = configureStore({
	reducer: {
		rootReducer
	},
	middleware: (getDefaultMiddleware) =>
		process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()
});
