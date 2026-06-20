import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  createBookmark,
  deleteBookmark,
} from "../redux/slices/bookmarkSlice";
import "./ActionButton.css";

const BookmarkButton = ({ videoId }) => {
  const dispatch = useDispatch();

  const { loading, bookmarks } = useSelector(
    (state) => state.bookmark
  );

  const saved = bookmarks.some(
    (bookmark) =>
      bookmark.id === videoId || bookmark.videoId === videoId
  );

  const handleBookmark = async () => {
    if (saved) {
      await dispatch(deleteBookmark(videoId));
    } else {
      await dispatch(createBookmark(videoId));
    }
  };

  return (
    <button
      type="button"
      className={
        saved
          ? "action-button action-button--bookmark-saved"
          : "action-button"
      }
      onClick={handleBookmark}
      disabled={loading}
      aria-label={saved ? "Remove bookmark" : "Save bookmark"}
    >
      {saved ? <BsBookmarkFill /> : <BsBookmark />}
      <span>Save</span>
    </button>
  );
};

export default BookmarkButton;
