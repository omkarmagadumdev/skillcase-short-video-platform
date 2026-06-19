import { useDispatch, useSelector } from "react-redux";
import { createBookmark, deleteBookmark } from "../redux/slices/bookmarkSlice";

const BookmarkButton = ({ videoId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.bookmark);

  const handleBookmark = () => {
    dispatch(createBookmark(videoId));
  };

  const handleRemoveBookmark = () => {
    dispatch(deleteBookmark(videoId));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button onClick={handleBookmark} disabled={loading}>Bookmark</button>
      <button onClick={handleRemoveBookmark} disabled={loading}>Remove Bookmark</button>
      {error && <span style={{ color: "red", fontSize: "0.8rem" }}>{error}</span>}
    </div>
  );
};

export default BookmarkButton;
