import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/slices/videoSlice";
import VideoCard from "../components/VideoCard";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchVideos());
    }
  }, [dispatch, videos.length]);

  if (loading && videos.length === 0) {
    return <LoadingState message="Loading videos..." />;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        {error}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return <EmptyState message="No videos found. Check back later!" />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Home;
