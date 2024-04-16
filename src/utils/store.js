import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Slices/apiSlice";
import authReducer from "../slices/Auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
