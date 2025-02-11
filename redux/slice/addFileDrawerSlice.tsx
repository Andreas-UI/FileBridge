import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddFileDrawerState {
  folder_id: number;
  isOpen: boolean;
}

const initialState: AddFileDrawerState = {
  folder_id: -1,
  isOpen: false,
};

export const addFileDrawerSlice = createSlice({
  name: "addFileDrawer",
  initialState: initialState,
  reducers: {
    openAddFileDrawer: (
      state,
      action: PayloadAction<AddFileDrawerState["folder_id"]>
    ) => {
      state.isOpen = true;
      state.folder_id = action.payload;
    },
    closeAddFileDrawer: (state) => {
      state.isOpen = false;
      state.folder_id = -1;
    },
  },
});

export const { closeAddFileDrawer, openAddFileDrawer } =
  addFileDrawerSlice.actions;

export default addFileDrawerSlice.reducer;
