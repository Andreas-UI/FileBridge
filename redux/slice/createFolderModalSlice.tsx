import { createSlice } from "@reduxjs/toolkit";

export interface createFolderState {
  subject: string;
  description: string;
}

export interface createFolderModalState {
  isOpen: boolean;
  data: createFolderState;
}

const initialState: createFolderModalState = {
  isOpen: false,
  data: {
    subject: "",
    description: "",
  },
};

export const createFolderModalSlice = createSlice({
  name: "createFolderModal",
  initialState: initialState,
  reducers: {
    openCreateFolderModal: (state) => {
      state.isOpen = true;
    },
    closeCreateFolderModal: (state) => {
      return initialState
    },
  },
});

export const { closeCreateFolderModal, openCreateFolderModal } =
  createFolderModalSlice.actions;

export default createFolderModalSlice.reducer;
