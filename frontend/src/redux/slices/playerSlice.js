import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  muted: true,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    toggleMute(state) {
      state.muted = !state.muted;
    },
  },
});

export const { toggleMute } = playerSlice.actions;

export default playerSlice.reducer;
