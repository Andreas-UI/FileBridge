import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface File {
  id: string;
  file_name: string;
  upload_date: string;
  size_kb: number;
  mime_type: string;
}

export interface Folder {
  // Multiselect
  is_selected: boolean;

  // Folder Metadata
  id: string;
  subject: string;
  description: string;
  created_date: string;
  last_modified: string;
  file_count: number;
  files: File[];
}

export interface foldersState {
  isMultiSelect: boolean;
  folders: Folder[];
  total_folders: 0;
}

const initialState: foldersState = {
  isMultiSelect: false,
  folders: [],
  total_folders: 0,
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState: initialState,
  reducers: {
    clearFolders: (state) => {
      state.folders = [];
      state.total_folders = 0;
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
      state.total_folders += 1;
    },
    deleteFolder: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.folders.findIndex(
        (folder) => folder.id === action.payload.id
      );

      if (index !== -1) {
        state.folders.splice(index, 1);
        state.total_folders -= 1;
      }
    },
    selectFolder: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.folders.findIndex(
        (folder) => folder.id === action.payload.id
      );

      if (index !== -1) {
        state.folders[index].is_selected = !state.folders[index].is_selected;
      }
    },
    selectAllFolder: (state) => {
      state.folders.forEach((folder) => (folder.is_selected = true));
    },
    enableMultiSelect: (state) => {
      state.isMultiSelect = true;
    },
    disableMultiSelect: (state) => {
      state.isMultiSelect = false;
      state.folders.forEach((folder) => (folder.is_selected = false));
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
