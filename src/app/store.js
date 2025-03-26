import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/ApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDiffultMiddlewares) => {
    return getDiffultMiddlewares().concat(apiSlice.middleware);
  },
});
