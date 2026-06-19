const bcrypt = require("bcrypt");
const { getPool } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");
const { generateToken } = require("../utils/jwt");

const SALT_ROUNDS = 10;

const mapUserRecord = (userRecord) => ({
  createdAt: userRecord.created_at,
  email: userRecord.email,
  id: userRecord.id,
  username: userRecord.username,
});

const findUserByEmail = async (email, withPasswordHash = false) => {
  const pool = getPool();
  const query = {
    text: `
      SELECT
        id,
        username,
        email,
        ${withPasswordHash ? "password_hash," : ""}
        created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    values: [email],
  };
  const result = await pool.query(query);

  return result.rows[0] || null;
};

const findUserById = async (userId) => {
  const pool = getPool();
  const query = {
    text: `
      SELECT
        id,
        username,
        email,
        created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    values: [userId],
  };
  const result = await pool.query(query);

  return result.rows[0] || null;
};

const findUserByUsername = async (username) => {
  const pool = getPool();
  const query = {
    text: `
      SELECT
        id,
        username,
        email,
        created_at
      FROM users
      WHERE username = $1
      LIMIT 1
    `,
    values: [username],
  };
  const result = await pool.query(query);

  return result.rows[0] || null;
};

const registerUser = async ({ email, password, username }) => {
  const [existingEmailUser, existingUsernameUser] = await Promise.all([
    findUserByEmail(email),
    findUserByUsername(username),
  ]);

  if (existingEmailUser) {
    throw createAppError(API_MESSAGES.EMAIL_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
  }

  if (existingUsernameUser) {
    throw createAppError(API_MESSAGES.USERNAME_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const pool = getPool();
  const query = {
    text: `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `,
    values: [username, email, passwordHash],
  };

  try {
    const result = await pool.query(query);
    return mapUserRecord(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "uq_users_username") {
        throw createAppError(API_MESSAGES.USERNAME_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
      }

      throw createAppError(API_MESSAGES.EMAIL_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
    }

    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email, true);

  if (!user) {
    throw createAppError(API_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw createAppError(API_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const sanitizedUser = mapUserRecord(user);
  const token = generateToken({
    sub: String(sanitizedUser.id),
    username: sanitizedUser.username,
  });

  return {
    token,
    user: sanitizedUser,
  };
};

const getAuthenticatedUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw createAppError(API_MESSAGES.AUTHENTICATION_REQUIRED, HTTP_STATUS.UNAUTHORIZED);
  }

  return mapUserRecord(user);
};

module.exports = {
  getAuthenticatedUser,
  loginUser,
  registerUser,
};
