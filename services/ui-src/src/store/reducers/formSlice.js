import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  forms: {},
  statusData: {},
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (_state, action) => action.payload,
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;