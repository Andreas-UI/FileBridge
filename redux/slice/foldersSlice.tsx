import { Folder } from "@/api/api.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface foldersState {
  isMultiSelect: boolean;
  folders: Record<Folder["id"], boolean>;
}

const initialState: foldersState = {
  isMultiSelect: false,
  folders: {},
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState: initialState,
  reducers: {
    clearFolders: (state) => {
      state.folders = {};
    },
    addFolder: (state, action: PayloadAction<Folder["id"]>) => {
      state.folders[action.payload] = false;
    },
    deleteFolder: (state, action: PayloadAction<{ id: string }>) => {
      // TODO:: To Be Fixed
      // const index = state.folders.findIndex(
      //   (folder) => folder.id === action.payload.id
      // );
      // if (index !== -1) {
      //   state.folders.splice(index, 1);
      //   state.total_folders -= 1;
      // }
    },
    selectFolder: (state, action: PayloadAction<Folder["id"]>) => {
      const id = action.payload;
      state.folders[id] = !state.folders[id];
    },
    selectAllFolder: (state) => {
      Object.keys(state.folders).forEach((id) => {
        state.folders[Number(id)] = true;
      });
    },
    enableMultiSelect: (state) => {
      state.isMultiSelect = true;
    },
    disableMultiSelect: (state) => {
      state.isMultiSelect = false;
      Object.keys(state.folders).forEach((id) => {
        state.folders[Number(id)] = false;
      });
    },
  },
});

export const {
  clearFolders,
  addFolder,
  deleteFolder,
  selectFolder,
  selectAllFolder,
  enableMultiSelect,
  disableMultiSelect,
} = foldersSlice.actions;

export default foldersSlice.reducer;
