import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVideos as apiFetchVideos } from "../../api/video";
import { likeVideo, unlikeVideo } from "./likeSlice";

export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetchVideos();
      return response.data.videos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        const video = state.videos.find(v => v.id === action.payload);
        if (video) video.likeCount = (video.likeCount || 0) + 1;
      })
      .addCase(unlikeVideo.fulfilled, (state, action) => {
        const video = state.videos.find(v => v.id === action.payload);
        if (video && video.likeCount > 0) video.likeCount -= 1;
      });
  },
});

export default videoSlice.reducer;
