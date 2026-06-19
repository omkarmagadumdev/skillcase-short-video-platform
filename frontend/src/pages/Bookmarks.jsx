import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../redux/slices/bookmarkSlice";
import VideoCard from "../components/VideoCard";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading, error } = useSelector((state) => state.bookmark);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>My Bookmarks</h2>
      {loading && <LoadingState message="Loading bookmarks..." />}
      {error && <div style={{ color: "red", textAlign: "center", padding: "2rem" }}>{error}</div>}
      {!loading && !error && bookmarks.length === 0 && <EmptyState message="No bookmarks found." />}
      {bookmarks.map((video) => (
        <VideoCard key={video.id} video={video} hideControls={true} />
      ))}
    </div>
  );
};

export default Bookmarks;
