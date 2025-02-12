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
    openFolderQRModal: (
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
    closeFolderQRModal: () => {
      return initialState;
    },
  },
});

export const { closeFolderQRModal, openFolderQRModal } =
  folderQrModalSlice.actions;

export default folderQrModalSlice.reducer;
