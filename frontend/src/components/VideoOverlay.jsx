import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCommentDots, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { toggleMute } from "../redux/slices/playerSlice";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import CommentSection from "./CommentSection";
import "./VideoOverlay.css";

const VideoOverlay = ({ video, hideControls = false }) => {
    const [openComments, setOpenComments] = useState(false);
    const dispatch = useDispatch();
    const muted = useSelector((state) => state.player.muted);

    const handleMuteToggle = () => {
        dispatch(toggleMute());
    };

    return (
        <>
            <div className="overlay-gradient" />

            <div className="overlay-left">
                <span className="overlay-category">{video.category}</span>
                <h2 className="overlay-title">{video.title}</h2>
                <p className="overlay-description">{video.description}</p>
            </div>

            {!hideControls && (
                <>
                    <div className="overlay-right">
                        <LikeButton
                            videoId={video.id}
                            likeCount={video.likeCount}
                            isLiked={Boolean(video.isLiked)}
                        />

                        <button
                            type="button"
                            className="action-button"
                            onClick={() => setOpenComments(true)}
                            aria-label="Open comments"
                        >
                            <FaRegCommentDots />
                            <span>Comments</span>
                        </button>

                        <BookmarkButton videoId={video.id} />

                        <button
                            type="button"
                            className="action-button action-button--mute"
                            onClick={handleMuteToggle}
                            aria-label={muted ? "Unmute" : "Mute"}
                        >
                            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                            <span>{muted ? "Muted" : "Sound"}</span>
                        </button>
                    </div>

                    <CommentSection
                        videoId={video.id}
                        open={openComments}
                        onClose={() => setOpenComments(false)}
                    />
                </>
            )}
        </>
    );
};

export default VideoOverlay;
