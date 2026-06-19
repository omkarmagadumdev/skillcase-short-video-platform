const VideoPlayer = ({ url }) => {
  return (
    <video
      controls
      playsInline
      muted
      preload="metadata"
      style={{
        width: "100%",
        maxHeight: "80vh",
        objectFit: "contain",
        backgroundColor: "#000",
      }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
