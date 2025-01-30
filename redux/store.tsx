import { configureStore } from "@reduxjs/toolkit";
import createFolderModalReducer from "./slice/createFolderModalSlice";
import tierCardModalReducer from "./slice/tierCardModalSlice";
import folderQrModalReducer from "./slice/folderQrModalSlice";
import foldersReducer from "./slice/foldersSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    createFolderModal: createFolderModalReducer,
    tierCardModal: tierCardModalReducer,
    folderQrModal: folderQrModalReducer,
    folders: foldersReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
