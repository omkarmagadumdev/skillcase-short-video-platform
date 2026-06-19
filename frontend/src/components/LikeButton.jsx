import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo, unlikeVideo } from "../redux/slices/likeSlice";

const LikeButton = ({ videoId, likeCount }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.like);

  const handleToggleLike = async () => {
    if (isLiked) {
      const action = await dispatch(unlikeVideo(videoId));
      if (unlikeVideo.fulfilled.match(action)) {
        setIsLiked(false);
      }
    } else {
      const action = await dispatch(likeVideo(videoId));
      if (likeVideo.fulfilled.match(action)) {
        setIsLiked(true);
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button onClick={handleToggleLike} disabled={loading}>
        {isLiked ? "Unlike" : "Like"}
      </button>
      <span>{likeCount} Likes</span>
      {error && <span style={{ color: "red", fontSize: "0.8rem" }}>{error}</span>}
    </div>
  );
};

export default LikeButton;
