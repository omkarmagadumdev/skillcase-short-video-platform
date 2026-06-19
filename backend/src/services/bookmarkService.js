const path = require("path");
const { config, getPool } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const buildPublicFileUrl = (filePath) => {
  const fileName = path.basename(filePath || "");
  return `${config.uploads.publicPath}/${encodeURIComponent(fileName)}`;
};

const mapVideoRecord = (videoRecord) => ({
  category: videoRecord.category,
  createdAt: videoRecord.created_at,
  description: videoRecord.description,
  fileUrl: buildPublicFileUrl(videoRecord.file_path),
  id: videoRecord.id,
  likeCount: videoRecord.like_count,
  title: videoRecord.title,
});

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

const findBookmark = async (client, userId, videoId) => {
  const result = await client.query(
    `
      SELECT user_id, video_id
      FROM bookmarks
      WHERE user_id = $1 AND video_id = $2
      LIMIT 1
    `,
    [userId, videoId]
  );
  return result.rows[0] || null;
};

const createBookmark = async ({ userId, videoId }) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await ensureVideoExists(client, videoId);

    const existingBookmark = await findBookmark(client, userId, videoId);

    if (existingBookmark) {
      throw createAppError(API_MESSAGES.BOOKMARK_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
    }

    await client.query(
      `
        INSERT INTO bookmarks (user_id, video_id)
        VALUES ($1, $2)
      `,
      [userId, videoId]
    );
  } finally {
    client.release();
  }
};

const getBookmarks = async (userId) => {
  const pool = getPool();

  const result = await pool.query(
    `
      SELECT v.id, v.title, v.description, v.category, v.file_path, v.like_count, v.created_at
      FROM videos v
      INNER JOIN bookmarks b ON v.id = b.video_id
      WHERE b.user_id = $1
      -- videos.created_at is intentionally used as the closest available ordering 
      -- because bookmark timestamps are not present in the provided schema.
      ORDER BY v.created_at DESC
    `,
    [userId]
  );

  return result.rows.map(mapVideoRecord);
};

const removeBookmark = async ({ userId, videoId }) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const existingBookmark = await findBookmark(client, userId, videoId);

    if (!existingBookmark) {
      throw createAppError(API_MESSAGES.BOOKMARK_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await client.query(
      `
        DELETE FROM bookmarks
        WHERE user_id = $1 AND video_id = $2
      `,
      [userId, videoId]
    );
  } finally {
    client.release();
  }
};

module.exports = {
  createBookmark,
  getBookmarks,
  removeBookmark,
};
