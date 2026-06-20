import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo, unlikeVideo } from "../redux/slices/likeSlice";
import "./ActionButton.css";

const LikeButton = ({ videoId, likeCount, isLiked }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.like);

  const handleLike = () => {
    if (loading) return;

    if (isLiked) {
      dispatch(unlikeVideo(videoId));
    } else {
      dispatch(likeVideo(videoId));
    }
  };

  return (
    <button
      type="button"
      className="action-button"
      onClick={handleLike}
      disabled={loading}
      aria-label={isLiked ? "Unlike video" : "Like video"}
    >
      {isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
