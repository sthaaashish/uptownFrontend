import { createSlice } from "@reduxjs/toolkit";
import { clearLocal, getUser, setUser } from "./localStorage";

const initialState = {
  user: getUser(),
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addOrUpdateUser: (state, action) => {
      state.user = action.payload;
      setUser(state.user);
    },
    clearAll: (state, action) => {
      state.user = null;
      clearLocal();
    },
  },
});
export const { addOrUpdateUser,clearAll } = userSlice.actions;
export default userSlice.reducer;
