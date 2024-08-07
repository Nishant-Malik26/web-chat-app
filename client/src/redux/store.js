import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./chat/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  
});

export default store;
