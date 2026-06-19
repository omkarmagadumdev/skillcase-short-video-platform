import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice";
import likeReducer from "./slices/likeSlice";
import commentReducer from "./slices/commentSlice";
import bookmarkReducer from "./slices/bookmarkSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    like: likeReducer,
    comment: commentReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;
