const { getPool } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const findVideoById = async (client, videoId) => {
  const result = await client.query(
    `
      SELECT id, like_count
      FROM videos
      WHERE id = $1
      LIMIT 1
    `,
    [videoId]
  );

  return result.rows[0] || null;
};

const findLike = async (client, userId, videoId) => {
  const result = await client.query(
    `
      SELECT user_id, video_id
      FROM likes
      WHERE user_id = $1 AND video_id = $2
      LIMIT 1
    `,
    [userId, videoId]
  );

  return result.rows[0] || null;
};

const ensureVideoExists = async (client, videoId) => {
  const video = await findVideoById(client, videoId);

  if (!video) {
    throw createAppError(API_MESSAGES.VIDEO_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
};

const likeVideo = async ({ userId, videoId }) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await ensureVideoExists(client, videoId);

    const existingLike = await findLike(client, userId, videoId);

    if (existingLike) {
      throw createAppError(API_MESSAGES.LIKE_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
    }

    await client.query(
      `
        INSERT INTO likes (user_id, video_id)
        VALUES ($1, $2)
      `,
      [userId, videoId]
    );

    await client.query(
      `
        UPDATE videos
        SET like_count = like_count + 1
        WHERE id = $1
      `,
      [videoId]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const unlikeVideo = async ({ userId, videoId }) => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await ensureVideoExists(client, videoId);

    const existingLike = await findLike(client, userId, videoId);

    if (!existingLike) {
      throw createAppError(API_MESSAGES.LIKE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await client.query(
      `
        DELETE FROM likes
        WHERE user_id = $1 AND video_id = $2
      `,
      [userId, videoId]
    );

    await client.query(
      `
        UPDATE videos
        SET like_count = GREATEST(like_count - 1, 0)
        WHERE id = $1
      `,
      [videoId]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  likeVideo,
  unlikeVideo,
};
