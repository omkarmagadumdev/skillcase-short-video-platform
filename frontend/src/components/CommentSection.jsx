import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  createComment,
  deleteComment,
} from "../redux/slices/commentSlice";
import "./CommentSection.css";

const CommentSection = ({ videoId, open, onClose }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const comments =
    useSelector((state) => state.comment.commentsByVideo[videoId]) || [];

  const loading =
    useSelector((state) => state.comment.loadingByVideoId[videoId]);

  const error =
    useSelector((state) => state.comment.errorByVideoId[videoId]);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (open) {
      dispatch(fetchComments(videoId));
    }
  }, [dispatch, open, videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    const action = await dispatch(
      createComment({
        videoId,
        content,
      })
    );

    if (createComment.fulfilled.match(action)) {
      setContent("");
    }
  };

  const handleDelete = (commentId) => {
    dispatch(
      deleteComment({
        videoId,
        commentId,
      })
    );
  };

  if (!open) return null;

  return (
    <div className="comment-overlay" onClick={onClose}>
      <div
        className="comment-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Comments</h3>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <div className="comment-list">
          {loading && comments.length === 0 ? (
            <p>Loading...</p>
          ) : comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item"
              >
                <strong>
                  User {comment.userId || comment.user_id}
                </strong>

                <p>{comment.content}</p>

                {user &&
                  user.id ===
                  (comment.userId || comment.user_id) && (
                    <button
                      onClick={() =>
                        handleDelete(comment.id)
                      }
                    >
                      Delete
                    </button>
                  )}
              </div>
            ))
          )}
        </div>

        <form
          className="comment-input"
          onSubmit={handleSubmit}
        >
          <input
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Add a comment..."
          />

          <button type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;