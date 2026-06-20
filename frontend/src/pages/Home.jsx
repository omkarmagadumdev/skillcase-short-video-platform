import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";
import { fetchVideos } from "../redux/slices/videoSlice";
import { fetchBookmarks } from "../redux/slices/bookmarkSlice";
import VideoCard from "../components/VideoCard";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const { videos, loading, error } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchVideos());
    }

    dispatch(fetchBookmarks());
  }, [dispatch, videos.length]);

  if (loading && videos.length === 0) {
    return <LoadingState message="Loading videos..." />;
  }

  if (error) {
    return (
      <EmptyState
        message="Something went wrong"
        hint={error}
        icon={FaVideo}
      />
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <EmptyState
        message="No videos found"
        hint="Check back in a moment — new videos drop here."
        icon={FaVideo}
      />
    );
  }

  return (
    <main className="home-container">
      {videos.map((video) => (
        <section className="video-section" key={video.id}>
          <VideoCard video={video} />
        </section>
      ))}
    </main>
  );
};

export default Home;
