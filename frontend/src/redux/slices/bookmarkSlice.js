import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { likeVideo, unlikeVideo } from "./likeSlice";
import {
  fetchBookmarks as apiFetchBookmarks,
  createBookmark as apiCreateBookmark,
  deleteBookmark as apiDeleteBookmark,
} from "../../api/bookmark";

export const fetchBookmarks = createAsyncThunk(
  "bookmark/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const bookmarks = await apiFetchBookmarks();

      return bookmarks.map((video) => ({
        ...video,
        fileUrl: `http://localhost:5000${video.fileUrl}`,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBookmark = createAsyncThunk(
  "bookmark/createBookmark",
  async (videoId, { dispatch, rejectWithValue }) => {
    try {
      await apiCreateBookmark(videoId);

      dispatch(fetchBookmarks());

      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBookmark = createAsyncThunk(
  "bookmark/deleteBookmark",
  async (videoId, { dispatch, rejectWithValue }) => {
    try {
      await apiDeleteBookmark(videoId);

      dispatch(fetchBookmarks());

      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookmarks: [],
  loading: false,
  error: null,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookmark.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBookmark.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookmark.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        const video = state.bookmarks.find(
          (v) => v.id === action.payload
        );

        if (!video || video.isLiked) return;

        video.isLiked = true;
        video.likeCount = (video.likeCount || 0) + 1;
      })
      .addCase(unlikeVideo.fulfilled, (state, action) => {
        const video = state.bookmarks.find(
          (v) => v.id === action.payload
        );

        if (!video || !video.isLiked) return;

        video.isLiked = false;
        video.likeCount = Math.max((video.likeCount || 0) - 1, 0);
      });
  },
});

export default bookmarkSlice.reducer; 