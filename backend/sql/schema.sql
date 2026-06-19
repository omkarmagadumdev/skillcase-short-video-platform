CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_users_username UNIQUE (username),
  CONSTRAINT uq_users_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_path TEXT NOT NULL,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_videos_like_count_non_negative CHECK (like_count >= 0)
);

CREATE TABLE IF NOT EXISTS likes (
  user_id BIGINT NOT NULL,
  video_id BIGINT NOT NULL,
  CONSTRAINT pk_likes PRIMARY KEY (user_id, video_id),
  CONSTRAINT fk_likes_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_likes_video
    FOREIGN KEY (video_id)
    REFERENCES videos (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  video_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_comments_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_comments_video
    FOREIGN KEY (video_id)
    REFERENCES videos (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookmarks (
  user_id BIGINT NOT NULL,
  video_id BIGINT NOT NULL,
  CONSTRAINT pk_bookmarks PRIMARY KEY (user_id, video_id),
  CONSTRAINT fk_bookmarks_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_bookmarks_video
    FOREIGN KEY (video_id)
    REFERENCES videos (id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS videos_category_idx ON videos (category);
