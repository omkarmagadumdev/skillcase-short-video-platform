const { getPool } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const mapVideoRecord = (videoRecord) => ({
  category: videoRecord.category,
  createdAt: videoRecord.created_at,
  description: videoRecord.description,
  filePath: videoRecord.file_path,
  id: videoRecord.id,
  likeCount: videoRecord.like_count,
  title: videoRecord.title,
});

const videoSelectColumns = `
  id,
  title,
  description,
  category,
  file_path,
  like_count,
  created_at
`;

const findVideoById = async (videoId) => {
  const pool = getPool();
  const query = {
    text: `
      SELECT ${videoSelectColumns}
      FROM videos
      WHERE id = $1
      LIMIT 1
    `,
    values: [videoId],
  };
  const result = await pool.query(query);

  return result.rows[0] || null;
};

const createVideo = async ({ category, description, filePath, title }) => {
  const pool = getPool();
  const query = {
    text: `
      INSERT INTO videos (title, description, category, file_path)
      VALUES ($1, $2, $3, $4)
      RETURNING ${videoSelectColumns}
    `,
    values: [title, description, category, filePath],
  };
  const result = await pool.query(query);

  return mapVideoRecord(result.rows[0]);
};

const getAllVideos = async () => {
  const pool = getPool();
  const query = {
    text: `
      SELECT ${videoSelectColumns}
      FROM videos
      ORDER BY created_at DESC
    `,
  };
  const result = await pool.query(query);

  return result.rows.map(mapVideoRecord);
};

const getVideoById = async (videoId) => {
  const video = await findVideoById(videoId);

  if (!video) {
    throw createAppError(API_MESSAGES.VIDEO_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return mapVideoRecord(video);
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
};
