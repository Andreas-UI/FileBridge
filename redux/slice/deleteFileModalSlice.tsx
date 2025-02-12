import { File, Folder } from "@/api/api.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface deleteFiledModalState {
  isOpen: boolean;
  folder_id: Folder["id"];
  folder_subject: Folder["subject"];
  file_name: File["name"];
  file_ids: File["id"][];
}

const initialState: deleteFiledModalState = {
  isOpen: false,
  folder_id: -1,
  folder_subject: "",
  file_name: "",
  file_ids: [],
};

export const deleteFiledModalSlice = createSlice({
  name: "deleteFiledModal",
  initialState: initialState,
  reducers: {
    openDeleteFileModal: (
      state,
      action: PayloadAction<{
        folder_subject: deleteFiledModalState["folder_subject"];
        folder_id: deleteFiledModalState["folder_id"];
        file_name: deleteFiledModalState["file_name"];
        file_ids: deleteFiledModalState["file_ids"];
      }>
    ) => {
      state.isOpen = true;
      state.file_name = action.payload.file_name;
      state.folder_id = action.payload.folder_id;
      state.folder_subject = action.payload.folder_subject;
      state.file_ids = action.payload.file_ids;
    },
    closeDeleteFileModal: () => {
      return initialState;
    },
  },
});

export const { closeDeleteFileModal, openDeleteFileModal } =
  deleteFiledModalSlice.actions;

export default deleteFiledModalSlice.reducer;
