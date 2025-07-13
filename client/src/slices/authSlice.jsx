import { createSlice } from "@reduxjs/toolkit";

function safeParse(item) {
  try {
    const value = localStorage.getItem(item);
    return value && value !== "undefined" ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

const initialState = {
  token: safeParse("token"),
  userData: safeParse("userData"),
  isRegistered: safeParse("isRegistered") || false,
  isLoggedin: safeParse("isLoggedin") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.userData = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("isLoggedin", JSON.stringify(true));
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },

    logout: (state) => {
      state.isLoggedin = false;
      state.token = null;
      state.userData = null;

      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    },

    signup: (state, action) => {
      state.isRegistered = true;
      state.userData = action.payload;

      localStorage.setItem("isRegistered", JSON.stringify(true));
      localStorage.setItem("userData", JSON.stringify(action.payload)); // this may not be the right to do ,bcz how you will delete then
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
