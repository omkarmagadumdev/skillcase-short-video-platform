import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./VideoPlayer.css";

const VideoPlayer = ({ url }) => {
    const videoRef = useRef(null);
    const muted = useSelector((state) => state.player.muted);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.7 }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    const handleLoadedData = () => {
        videoRef.current?.play().catch(() => { });
    };

    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    };

    return (
        <video
            ref={videoRef}
            src={url}
            className="video-player"
            muted={muted}
            loop
            playsInline
            autoPlay
            preload="auto"
            onLoadedData={handleLoadedData}
            onClick={handleVideoClick}
        />
    );
};

export default VideoPlayer;
