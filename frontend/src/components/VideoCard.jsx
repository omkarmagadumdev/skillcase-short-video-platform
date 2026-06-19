import React from "react";
import VideoPlayer from "./VideoPlayer";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import CommentSection from "./CommentSection";

const VideoCard = React.memo(({ video, hideControls = false }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "2rem",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <VideoPlayer url={video.fileUrl} />
      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>{video.title}</h3>
        <p style={{ margin: "0 0 0.5rem 0", color: "#555" }}>{video.description}</p>
        <span
          style={{
            display: "inline-block",
            padding: "0.25rem 0.5rem",
            backgroundColor: "#eee",
            borderRadius: "4px",
            fontSize: "0.875rem",
            marginBottom: "1rem"
          }}
        >
          {video.category}
        </span>
        
        {!hideControls && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <LikeButton videoId={video.id} likeCount={video.likeCount} />
              <BookmarkButton videoId={video.id} />
            </div>
            
            <CommentSection videoId={video.id} />
          </>
        )}
      </div>
    </div>
  );
});

VideoCard.displayName = "VideoCard";

export default VideoCard;
