// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import components from "./components";

export const store = configureStore({
  reducer: {
    components,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
