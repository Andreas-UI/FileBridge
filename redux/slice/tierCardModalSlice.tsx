import { createSlice } from "@reduxjs/toolkit";

export interface tierCardModalState {
  isOpen: boolean;
}

const initialState: tierCardModalState = {
  isOpen: false,
};

export const tierCardModalSlice = createSlice({
  name: "tierCardModal",
  initialState: initialState,
  reducers: {
    openTierCardModal: (state) => {
      state.isOpen = true;
    },
    closeTierCardModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeTierCardModal, openTierCardModal } =
  tierCardModalSlice.actions;

export default tierCardModalSlice.reducer;
