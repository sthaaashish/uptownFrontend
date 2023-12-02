import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./Api";
import { authApi } from "./authApi";
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [Api.reducerPath]:Api.reducer,
        user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
    Api.middleware
    ]),
});
