import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, createComment, deleteComment } from "../redux/slices/commentSlice";

const CommentSection = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  
  const dispatch = useDispatch();
  const { commentsByVideo, loadingByVideoId, errorByVideoId } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);

  const comments = commentsByVideo[videoId];
  const loading = loadingByVideoId[videoId];
  const error = errorByVideoId[videoId];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && comments === undefined) {
      dispatch(fetchComments(videoId));
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    dispatch(createComment({ videoId, content })).then((action) => {
      if (createComment.fulfilled.match(action)) {
        setContent("");
      }
    });
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment({ videoId, commentId }));
  };

  const displayComments = comments || [];

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={handleToggle}>
        {isOpen ? "Hide Comments" : "View Comments"}
      </button>

      {isOpen && (
        <div style={{ marginTop: "1rem" }}>
          {error && <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>}
          
          <form onSubmit={handleAddComment} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input 
              type="text" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Add a comment..." 
              style={{ flex: 1, padding: "0.5rem" }}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>Post</button>
          </form>

          {loading && displayComments.length === 0 && <div>Loading comments...</div>}

          {displayComments.map((comment) => (
            <div key={comment.id} style={{ padding: "0.5rem", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>User {comment.userId || comment.user_id}</strong>: {comment.content}
              </div>
              {user && user.id === (comment.userId || comment.user_id) && (
                <button onClick={() => handleDelete(comment.id)} disabled={loading} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>
                  Delete
                </button>
              )}
            </div>
          ))}
          {displayComments.length === 0 && !loading && comments !== undefined && <div>No comments yet.</div>}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
