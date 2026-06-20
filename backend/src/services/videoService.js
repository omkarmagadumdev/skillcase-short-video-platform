const path = require("path");
const { config, getPool } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const videoSelectColumns = `
  id,
  title,
  description,
  category,
  file_path,
  like_count,
  created_at
`;

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
  isLiked: Boolean(videoRecord.is_liked),
  likeCount: videoRecord.like_count,
  title: videoRecord.title,
});

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

const getAllVideos = async (userId) => {
  const pool = getPool();
  const query = {
    text: `
      SELECT
        v.id,
        v.title,
        v.description,
        v.category,
        v.file_path,
        v.like_count,
        v.created_at,
        (l.user_id IS NOT NULL) AS is_liked
      FROM videos v
      LEFT JOIN likes l
        ON l.video_id = v.id AND l.user_id = $1
      ORDER BY v.created_at DESC
    `,
    values: [userId],
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
