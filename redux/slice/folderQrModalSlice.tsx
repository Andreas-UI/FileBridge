import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FolderQRModalState {
  subject: string;
  qrcode_url: string;
  isOpen: boolean;
}

const initialState: FolderQRModalState = {
  isOpen: false,
  qrcode_url: "",
  subject: "F",
};

export const folderQrModalSlice = createSlice({
  name: "folderQRModal",
  initialState: initialState,
  reducers: {
    openfolderQRModal: (
      state,
      action: PayloadAction<{
        subject: FolderQRModalState["subject"];
        qrcode_url: FolderQRModalState["qrcode_url"];
      }>
    ) => {
      state.isOpen = true;
      state.subject = action.payload.subject;
      state.qrcode_url = action.payload.qrcode_url;
    },
    closefolderQRModal: (state) => {
      state.isOpen = false;
      state.subject = "";
      state.qrcode_url = "";
    },
  },
});

export const { closefolderQRModal, openfolderQRModal } =
  folderQrModalSlice.actions;

export default folderQrModalSlice.reducer;
