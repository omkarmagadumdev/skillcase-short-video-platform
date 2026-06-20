import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { fetchBookmarks } from "../redux/slices/bookmarkSlice";
import VideoCard from "../components/VideoCard";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import "./Home.css";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading, error } = useSelector(
    (state) => state.bookmark
  );

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  if (loading && bookmarks.length === 0) {
    return <LoadingState message="Loading bookmarks..." />;
  }

  if (error) {
    return (
      <EmptyState
        message="Something went wrong"
        hint={error}
        icon={FaRegBookmark}
      />
    );
  }

  if (!loading && bookmarks.length === 0) {
    return (
      <EmptyState
        message="No bookmarks yet"
        hint="Tap the bookmark icon on any video and it'll appear here."
        icon={FaRegBookmark}
      />
    );
  }

  return (
    <main className="home-container">
      {bookmarks.map((video) => (
        <section className="video-section" key={video.id}>
          <VideoCard video={video} />
        </section>
      ))}
    </main>
  );
};

export default Bookmarks;
