import { configureStore } from "@reduxjs/toolkit";
import createFolderModalReducer from "./slice/createFolderModalSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    createFolderModal: createFolderModalReducer,
  },
});

// Infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;
