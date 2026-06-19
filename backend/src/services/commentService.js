const { getPool } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const findVideoById = async (client, videoId) => {
  const result = await client.query(
    `
      SELECT id
      FROM videos
      WHERE id = $1
      LIMIT 1
    `,
    [videoId]
  );

  return result.rows[0] || null;
};

const ensureVideoExists = async (client, videoId) => {
  const video = await findVideoById(client, videoId);

  if (!video) {
    throw createAppError(API_MESSAGES.VIDEO_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
};

const mapCommentRecord = (record) => ({
  id: record.id,
  content: record.content,
  userId: record.user_id,
  videoId: record.video_id,
  createdAt: record.created_at,
});

const createComment = async ({ userId, videoId, content }) => {
  const pool = getPool();
  
  const client = await pool.connect();
  try {
    await ensureVideoExists(client, videoId);
    
    const result = await client.query(
      `
        INSERT INTO comments (user_id, video_id, content)
        VALUES ($1, $2, $3)
        RETURNING id, content, user_id, video_id, created_at
      `,
      [userId, videoId, content]
    );

    return mapCommentRecord(result.rows[0]);
  } finally {
    client.release();
  }
};

const getCommentsByVideoId = async (videoId) => {
  const pool = getPool();
  const client = await pool.connect();
  
  try {
    await ensureVideoExists(client, videoId);

    const result = await client.query(
      `
        SELECT id, content, user_id, video_id, created_at
        FROM comments
        WHERE video_id = $1
        ORDER BY created_at ASC
      `,
      [videoId]
    );

    return result.rows.map(mapCommentRecord);
  } finally {
    client.release();
  }
};

const findCommentById = async (client, commentId) => {
  const result = await client.query(
    `
      SELECT id, user_id
      FROM comments
      WHERE id = $1
      LIMIT 1
    `,
    [commentId]
  );

  return result.rows[0] || null;
};

const deleteComment = async ({ userId, commentId }) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const comment = await findCommentById(client, commentId);

    if (!comment) {
      throw createAppError(API_MESSAGES.COMMENT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (Number(comment.user_id) !== Number(userId)) {
      throw createAppError(API_MESSAGES.FORBIDDEN_ACTION, HTTP_STATUS.FORBIDDEN);
    }

    await client.query(
      `
        DELETE FROM comments
        WHERE id = $1
      `,
      [commentId]
    );
  } finally {
    client.release();
  }
};

module.exports = {
  createComment,
  getCommentsByVideoId,
  deleteComment,
};
