import { configureStore } from "@reduxjs/toolkit";
import createFolderModalReducer from "./slice/createFolderModalSlice";
import tierCardModalReducer from "./slice/tierCardModalSlice";
import foldersReducer from "./slice/foldersSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    createFolderModal: createFolderModalReducer,
    tierCardModal: tierCardModalReducer,
    folders: foldersReducer,
  },
});

// Infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;
