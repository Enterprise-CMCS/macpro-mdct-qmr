import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (_state, action) => action.payload,
    unsetUser: () => ({}),
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
