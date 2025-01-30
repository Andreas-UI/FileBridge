import { createSlice } from "@reduxjs/toolkit";

export interface folderQRModalState {
  isOpen: boolean;
}

const initialState: folderQRModalState = {
  isOpen: false,
};

export const folderQrModalSlice = createSlice({
  name: "folderQRModal",
  initialState: initialState,
  reducers: {
    openfolderQRModal: (state) => {
      state.isOpen = true;
    },
    closefolderQRModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closefolderQRModal, openfolderQRModal } =
  folderQrModalSlice.actions;

export default folderQrModalSlice.reducer;
