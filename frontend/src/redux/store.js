import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice";
import likeReducer from "./slices/likeSlice";
import commentReducer from "./slices/commentSlice";
import bookmarkReducer from "./slices/bookmarkSlice";
import playerReducer from "./slices/playerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    like: likeReducer,
    comment: commentReducer,
    bookmark: bookmarkReducer,
    player: playerReducer,
  },
});

export default store;
