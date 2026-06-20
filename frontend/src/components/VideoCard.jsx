import React from "react";
import VideoPlayer from "./VideoPlayer";
import VideoOverlay from "./VideoOverlay";
import "./VideoCard.css";

const VideoCard = React.memo(({ video, hideControls = false }) => {
  return (
    <section className="video-card">
      <div className="video-stage">
        <VideoPlayer url={video.fileUrl} />
        <VideoOverlay video={video} hideControls={hideControls} />
      </div>
    </section>
  );
});

VideoCard.displayName = "VideoCard";

export default VideoCard;
