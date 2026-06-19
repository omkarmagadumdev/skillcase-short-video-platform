import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { likeVideo as apiLikeVideo, unlikeVideo as apiUnlikeVideo } from "../../api/like";

export const likeVideo = createAsyncThunk(
  "like/likeVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      await apiLikeVideo(videoId);
      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unlikeVideo = createAsyncThunk(
  "like/unlikeVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      await apiUnlikeVideo(videoId);
      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeVideo.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(likeVideo.fulfilled, (state) => { state.loading = false; })
      .addCase(likeVideo.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(unlikeVideo.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(unlikeVideo.fulfilled, (state) => { state.loading = false; })
      .addCase(unlikeVideo.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default likeSlice.reducer;
