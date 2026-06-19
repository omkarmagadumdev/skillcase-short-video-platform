const VideoPlayer = ({ url }) => {
    const fullUrl = `http://localhost:5000${url}`;

    return (
        <video
            controls
            preload="metadata"
            playsInline
            style={{
                width: "100%",
                height: "600px",
                objectFit: "contain",
                background: "#000",
            }}
        >
            <source src={fullUrl} type="video/mp4" />
        </video>
    );
};

export default VideoPlayer;