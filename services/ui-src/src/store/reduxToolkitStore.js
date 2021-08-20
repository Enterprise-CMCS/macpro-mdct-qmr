import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import formReducer from './reducers/formSlice';

export const store = configureStore({
  reducer: { 
    rootReducer,
    form: formReducer
  }
});