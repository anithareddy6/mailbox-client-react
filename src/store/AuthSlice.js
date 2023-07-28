import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  userId: "",
  recieverId: "",
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("tokenMC", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("tokenMC");
      localStorage.removeItem("emailMC");
    },
    setUserId(state, action) {
      localStorage.setItem("emailMC", action.payload);
      state.userId = action.payload.replace(/[@,.]/g, "");
    },
    setRecieverId(state, action) {
      localStorage.setItem("recieverMC", action.payload);
      state.recieverId = action.payload.replace(/[@,.]/g, "");
    },
    setIsAuth(state) {
      if (localStorage.getItem("tokenMC")) {
        state.isAuthenticated = true;
        state.token = localStorage.getItem("tokenMC");
        const UID = localStorage.getItem("emailMC");
        state.userId = UID.replace(/[@,.]/g, "");
        state.recieverId = localStorage.getItem("recieverMC");
      }
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
