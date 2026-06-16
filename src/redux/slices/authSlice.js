import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  token: localStorage.getItem("adminToken") || null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;

      localStorage.setItem("adminToken", action.payload.token);

      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
    },

    logout: (state) => {
      state.admin = null;
      state.token = null;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
