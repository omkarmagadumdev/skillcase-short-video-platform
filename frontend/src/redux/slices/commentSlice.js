import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments as apiFetchComments, createComment as apiCreateComment, deleteComment as apiDeleteComment } from "../../api/comment";

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (videoId, { rejectWithValue }) => {
    try {
      const comments = await apiFetchComments(videoId);
      return { videoId, comments };
    } catch (error) {
      return rejectWithValue({ videoId, error: error.message });
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const comment = await apiCreateComment(videoId, content);
      return { videoId, comment };
    } catch (error) {
      return rejectWithValue({ videoId, error: error.message });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ videoId, commentId }, { rejectWithValue }) => {
    try {
      await apiDeleteComment(commentId);
      return { videoId, commentId };
    } catch (error) {
      return rejectWithValue({ videoId, error: error.message });
    }
  }
);

const initialState = {
  commentsByVideo: {},
  loadingByVideoId: {},
  errorByVideoId: {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => { 
        const videoId = action.meta.arg;
        state.loadingByVideoId[videoId] = true; 
        state.errorByVideoId[videoId] = null; 
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { videoId, comments } = action.payload;
        state.loadingByVideoId[videoId] = false;
        state.commentsByVideo[videoId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => { 
        const videoId = action.meta.arg;
        state.loadingByVideoId[videoId] = false; 
        state.errorByVideoId[videoId] = action.payload?.error || action.error.message; 
      })
      .addCase(createComment.pending, (state, action) => { 
        const videoId = action.meta.arg.videoId;
        state.loadingByVideoId[videoId] = true; 
        state.errorByVideoId[videoId] = null; 
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { videoId, comment } = action.payload;
        state.loadingByVideoId[videoId] = false;
        if (!state.commentsByVideo[videoId]) {
          state.commentsByVideo[videoId] = [];
        }
        state.commentsByVideo[videoId].unshift(comment);
      })
      .addCase(createComment.rejected, (state, action) => { 
        const videoId = action.meta.arg.videoId;
        state.loadingByVideoId[videoId] = false; 
        state.errorByVideoId[videoId] = action.payload?.error || action.error.message; 
      })
      .addCase(deleteComment.pending, (state, action) => { 
        const videoId = action.meta.arg.videoId;
        state.loadingByVideoId[videoId] = true; 
        state.errorByVideoId[videoId] = null; 
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { videoId, commentId } = action.payload;
        state.loadingByVideoId[videoId] = false;
        if (state.commentsByVideo[videoId]) {
          state.commentsByVideo[videoId] = state.commentsByVideo[videoId].filter(c => c.id !== commentId);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => { 
        const videoId = action.meta.arg.videoId;
        state.loadingByVideoId[videoId] = false; 
        state.errorByVideoId[videoId] = action.payload?.error || action.error.message; 
      });
  },
});

export default commentSlice.reducer;
