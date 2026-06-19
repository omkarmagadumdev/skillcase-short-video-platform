import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookmarks as apiFetchBookmarks, createBookmark as apiCreateBookmark, deleteBookmark as apiDeleteBookmark } from "../../api/bookmark";

export const fetchBookmarks = createAsyncThunk(
  "bookmark/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const bookmarks = await apiFetchBookmarks();
      return bookmarks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBookmark = createAsyncThunk(
  "bookmark/createBookmark",
  async (videoId, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiCreateBookmark(videoId);
      dispatch(fetchBookmarks()); 
      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBookmark = createAsyncThunk(
  "bookmark/deleteBookmark",
  async (videoId, { rejectWithValue }) => {
    try {
      await apiDeleteBookmark(videoId);
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
      .addCase(fetchBookmarks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload);
      });
  },
});

export default bookmarkSlice.reducer;
