# Skillcase Shorts

A full-stack short-video platform inspired by YouTube Shorts and Instagram Reels. Built for the Skillcase Intern Assessment.

![Node](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-4169E1?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)

A vertical, full-screen video feed with authentication, likes, comments, and bookmarks — backed by a PostgreSQL database and a clean Express API.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Database design](#database-design)
- [Redux architecture](#redux-architecture)
- [API overview](#api-overview)
- [Authentication flow](#authentication-flow)
- [How videos are served](#how-videos-are-served)
- [Environment variables](#environment-variables)
- [Installation & run](#installation--run)
- [Notable design decisions](#notable-design-decisions)
- [Assumptions](#assumptions)
- [Trade-offs](#trade-offs)
- [Future improvements](#future-improvements)
- [Deployment notes](#deployment-notes)
- [Submission notes](#submission-notes)

---

## Features

- 🔐 **Authentication** — register / login / `/me`, JWT-based sessions with bcrypt-hashed passwords.
- 📜 **Vertical feed** — full-screen, scroll-snap, autoplay-on-view via `IntersectionObserver`.
- ❤️ **Likes** — atomic like/unlike with database-level transactions, mirrored across the feed and the bookmark list.
- 💬 **Comments** — per-video sheet, add and delete (owner-only).
- 🔖 **Bookmarks** — save and revisit videos on a dedicated page.
- 🔊 **Global mute / unmute** — single Redux flag drives every player, browser-autoplay-friendly.
- 🛡️ **Protected routes** — token guard on the client, JWT middleware on the server.
- ⚡ **Redux Toolkit** — single source of truth for video, bookmark, like, comment, auth, and player state.
- 📱 **Responsive** — desktop / tablet / mobile; action rail stays attached to the video on every viewport.

---

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, Redux Toolkit, React Router 6, Axios, react-icons |
| Backend | Node.js, Express 5, pg, bcrypt, jsonwebtoken, dotenv, cors |
| Database | PostgreSQL 15+ |
| Tooling | npm workspaces (root), nodemon |

---

## Screenshots

> Replace these with your captured PNGs before submission.

| Login | Feed (desktop) | Feed (mobile) |
|---|---|---|
| ![Login](./docs/screens/login.png) | ![Home desktop](./docs/screens/home-desktop.png) | ![Home mobile](./docs/screens/home-mobile.png) |

| Bookmarks | Comments | Empty state |
|---|---|---|
| ![Bookmarks](./docs/screens/bookmarks.png) | ![Comments](./docs/screens/comments.png) | ![Empty](./docs/screens/empty.png) |

---

## Architecture

```
┌────────────────────────┐         ┌────────────────────────┐         ┌────────────────────────┐
│       React + Vite     │  HTTPS  │     Express (Node.js)  │   SQL   │       PostgreSQL       │
│ Redux Toolkit, Axios   │ ──────▶ │   Layered architecture │ ──────▶ │  users, videos, likes, │
│ Protected client routes│         │  controller → service  │         │  comments, bookmarks   │
└────────────┬───────────┘         └────────────┬───────────┘         └────────────────────────┘
             │                                  │
             │  GET /uploads/{file}.mp4         │  express.static('/uploads')
             └──────────────────────────────────┘
```

- **Layered backend:** routes → controllers → services. Controllers handle HTTP. Services own DB access and business rules. No DB calls happen in controllers.
- **State-first frontend:** Redux Toolkit slices own the data. Components are presentational and dispatch thunks.
- **Single envelope** for all HTTP responses: `{ success, message, data, errors }`.

---

## Project structure

```text
skillcase-short-video-platform/
├── backend/
│   ├── server.js                     # entry point
│   ├── sql/
│   │   ├── schema.sql                # tables + constraints + indexes
│   │   └── initSchema.js             # applies schema.sql
│   └── src/
│       ├── app.js                    # express app wiring
│       ├── config/
│       │   ├── env.js                # env loader & validation
│       │   ├── database.js           # pg Pool factory
│       │   └── index.js              # barrel
│       ├── controllers/              # HTTP layer
│       │   ├── authController.js
│       │   ├── videoController.js
│       │   ├── likeController.js
│       │   ├── commentController.js
│       │   └── bookmarkController.js
│       ├── services/                 # business + persistence
│       │   ├── authService.js
│       │   ├── videoService.js
│       │   ├── likeService.js
│       │   ├── commentService.js
│       │   └── bookmarkService.js
│       ├── routes/                   # express routers per resource
│       ├── middlewares/
│       │   ├── authenticate.js       # JWT verification
│       │   └── errorHandler.js       # centralized error responses
│       ├── utils/
│       │   ├── jwt.js
│       │   ├── createAppError.js
│       │   └── constants.js
│       └── uploads/                  # mp4 files served at /uploads/*
├── frontend/
│   ├── index.html
│   └── src/
│       ├── main.jsx                  # root + Provider + Router
│       ├── App.jsx                   # route table
│       ├── api/                      # axios + per-resource clients
│       ├── components/
│       │   ├── VideoCard.jsx
│       │   ├── VideoPlayer.jsx
│       │   ├── VideoOverlay.jsx
│       │   ├── LikeButton.jsx
│       │   ├── BookmarkButton.jsx
│       │   ├── CommentSection.jsx
│       │   ├── Navigation.jsx
│       │   ├── AuthForm.jsx
│       │   ├── LoadingState.jsx
│       │   └── EmptyState.jsx
│       ├── pages/
│       │   ├── Home.jsx              # vertical feed
│       │   ├── Bookmarks.jsx         # saved feed
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── NotFound.jsx
│       ├── redux/
│       │   ├── store.js
│       │   └── slices/
│       │       ├── authSlice.js
│       │       ├── videoSlice.js
│       │       ├── bookmarkSlice.js
│       │       ├── likeSlice.js
│       │       ├── commentSlice.js
│       │       └── playerSlice.js
│       ├── styles/                   # global tokens
│       └── utils/                    # routes, validation
└── README.md
```

---

## Database design

```text
users (id PK, username UQ, email UQ, password_hash, created_at, updated_at)
videos (id PK, title, description, category, file_path, like_count CHECK >= 0, created_at)
likes (user_id, video_id, PK(user_id, video_id))
comments (id PK, user_id, video_id, content, created_at)
bookmarks (user_id, video_id, PK(user_id, video_id))
```

All foreign keys cascade on delete. `likes` and `bookmarks` use composite primary keys to make duplicate state impossible at the database layer. `videos.like_count` is maintained inside the same transaction as the `likes` row insert/delete (`BEGIN ... COMMIT`).

Indexes:

- `videos_category_idx` on `videos(category)`.
- Composite PKs on `likes` and `bookmarks` cover their hot lookups.

See [`backend/sql/schema.sql`](./backend/sql/schema.sql).

---

## Redux architecture

| Slice | Owns | Notable |
|---|---|---|
| `auth` | user, token, login/register status | Rehydrates from `localStorage` on boot |
| `video` | `videos[]` for the home feed, `loading`, `error` | Listens to `likeVideo.fulfilled` to keep `isLiked` and `likeCount` in sync |
| `bookmark` | `bookmarks[]` for the bookmarks page | Same like-listener — keeps Home and Bookmarks in lockstep |
| `like` | global `loading` flag for in-flight like requests | Thin — actual list mutations happen in `video` and `bookmark` |
| `comment` | `commentsByVideo[videoId]`, `loadingByVideoId`, `errorByVideoId` | Per-video maps avoid touching unrelated videos on a single comment action |
| `player` | global `muted` boolean | One click unmutes every video; persists across route changes |

**Why two slices both track `isLiked`/`likeCount`.** The same video can appear on Home and on Bookmarks. Mirroring the like-toggle in both slice reducers (instead of normalizing into one) keeps each page's data self-contained, avoids a join in the client, and makes it possible to swap the data sources later (e.g. a profile page) without rewiring like UI.

---

## API overview

All responses use the envelope:

```json
{ "success": true, "message": "Human-readable", "data": { /* payload */ }, "errors": [] }
```

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/health` | — | Liveness probe |
| POST | `/auth/register` | — | Create account |
| POST | `/auth/login` | — | Returns `{ token, user }` |
| GET | `/auth/me` | ✅ | Current user from JWT |
| GET | `/videos` | ✅ | List feed; returns `isLiked` per current user |
| GET | `/videos/:id` | — | Single video |
| POST | `/videos` | ✅ | Create (expects `file_path`; no multipart upload in scope) |
| POST | `/likes/:videoId` | ✅ | Like (transactional) |
| DELETE | `/likes/:videoId` | ✅ | Unlike (transactional) |
| POST | `/comments/:videoId` | ✅ | Add comment (1–500 chars) |
| GET | `/comments/:videoId` | — | List comments |
| DELETE | `/comments/:commentId` | ✅ | Owner-only delete |
| POST | `/bookmarks/:videoId` | ✅ | Save |
| GET | `/bookmarks` | ✅ | List saved videos with `isLiked` |
| DELETE | `/bookmarks/:videoId` | ✅ | Remove |

---

## Authentication flow

```text
┌──────────┐      POST /auth/login            ┌──────────┐
│  Client  │ ───────────────────────────────▶ │  Server  │
└─────┬────┘                                  └────┬─────┘
      │  { token, user }                          │ bcrypt.compare()
      │ ◀──────────────────────────────────────── │ jwt.sign({ sub, username })
      │
      │ localStorage.setItem('token', ...)
      │
      │ Axios interceptor injects
      │ Authorization: Bearer <token>
      │
      │ Subsequent requests                       │ authenticate middleware:
      │ ────────────────────────────────────────▶ │ jwt.verify(token, secret)
      │                                           │ sets req.user = { id, username }
```

- JWT is signed with `JWT_SECRET` (env), expiry from `JWT_EXPIRES_IN` (default `1d`).
- The middleware accepts only `Authorization: Bearer <token>`; missing or malformed headers return `401`.
- The client persists the token in `localStorage` and rehydrates Redux on app boot.

---

## How videos are served

- mp4 files live in `backend/src/uploads/` and are exposed via `express.static` at the `/uploads` path.
- The DB stores `file_path` (an absolute disk path); the service layer maps it to a public `fileUrl` (`/uploads/<filename>`).
- The frontend prepends the API origin and binds it to `<video src>`. The IntersectionObserver plays / pauses depending on viewport visibility.
- Autoplay starts muted to comply with browser policy. A click on the mute button in the action rail toggles a Redux flag that propagates to every mounted player.

---

## Environment variables

### `backend/.env`

```dotenv
PORT=5000
DATABASE_URL=postgresql://USER:PASS@HOST:5432/DBNAME
JWT_SECRET=replace-with-a-long-random-string
JWT_EXPIRES_IN=1d
```

### `frontend/.env`

```dotenv
VITE_API_BASE_URL=http://localhost:5000
```

`.env.example` files are committed; `.env` files are gitignored.

---

## Installation & run

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 15+

### 1. Install

```bash
git clone git@github.com:omkarmagadumdev/skillcase-short-video-platform.git
cd skillcase-short-video-platform

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env       # edit values
cp frontend/.env.example frontend/.env     # default works for local
```

### 3. Initialize the database

```bash
# create the database first
createdb skillcase_short_video_platform

# from the backend directory:
cd backend
npm run db:init
```

### 4. (Optional) Seed sample videos

The three mp4 files in `backend/src/uploads/` are ready to use. Insert rows pointing at them so the feed isn't empty on first run:

```sql
INSERT INTO videos (title, description, category, file_path) VALUES
  ('Introduction German', 'Basic German introduction', 'Education',
   'Introduction_German.mp4'),
  ('Learning German',     'Learn common German words', 'Education',
   'Learning_German.mp4'),
  ('Story German',        'German story for beginners','Education',
   'Story_German.mp4');
```

### 5. Run

```bash
# terminal 1
cd backend && npm run dev      # http://localhost:5000

# terminal 2
cd frontend && npm run dev     # http://localhost:5173
```

---

## Notable design decisions

**Why layered backend, not MVC.** `routes/`, `controllers/`, `services/` is the same separation idea as MVC but lets controllers stay thin HTTP adapters while services own SQL. Easier to test in isolation, easier to reuse the service from a worker or a CLI later.

**Why one envelope for every response.** Frontends written against this API never have to branch on response shape. Errors and successes look symmetric to the client. The error middleware fills in the same envelope for thrown `AppError`s, so the same toast component works everywhere.

**Why `isLiked` is computed by the server.** The like state is per-`(user, video)`. Computing it on the server with a `LEFT JOIN likes` means the client doesn't have to fetch a separate "my likes" list or maintain a parallel structure. One query, one render.

**Why mute is a global Redux flag.** TikTok/Reels-style UX: one click on any video unmutes the feed and the choice persists. Per-video mute would (a) lose the user's preference between videos and (b) re-trigger autoplay rejection on every new video they scroll to.

**Why composite primary keys on `likes` / `bookmarks`.** A duplicate like is a data bug, not a UX bug. The DB rejects it at the constraint level; the application then handles `23505` (or the app-level "already liked" check) without ever needing a unique index.

---

## Assumptions

- Single-user video creation isn't in scope. `POST /videos` exists but no multipart upload — the assignment focuses on consuming videos that already exist on disk.
- Comments display the user ID. A `username` would require either a `JOIN users` in `commentService.getCommentsByVideoId` or a denormalized `username` column.
- Pagination on the feed isn't in scope. The feed is small enough to ship as a single response.
- The reviewer has Node 20+ and PostgreSQL 15+ available. No Docker compose included.

---

## Trade-offs

| Choice | Pro | Con |
|---|---|---|
| JWT in `localStorage` | Simple, survives reload, no CSRF concerns | XSS-readable; httpOnly cookie would be safer |
| Two slices mirror like state | Each page is self-contained | Reducers updated in two places — covered by tests in a real codebase |
| Plain JS, no TypeScript | Faster to read, fewer files to review | No compile-time safety |
| Hand-rolled input validation | No extra dependency | Brittle vs zod/joi |
| `cors()` wide open | Local dev friction-free | Tighten to `origin: process.env.WEB_ORIGIN` for prod |

---

## Future improvements

- Pagination on `/videos` with cursor on `created_at` + `id`.
- Switch like/bookmark to true optimistic updates (mutate on `.pending`, rollback on `.rejected`).
- Multipart upload endpoint with `multer`, content-type sniffing, and ffprobe metadata extraction.
- Replace localStorage JWT with httpOnly cookies + CSRF token.
- Add request-level `zod` schemas for typed validation.
- `ErrorBoundary` at the React root + a Sentry-style reporter.
- Real avatars and usernames on comments.
- E2E tests with Playwright; integration tests on the service layer with Jest + Supertest.

---

## Deployment notes

- Backend: any Node 20+ host (Fly.io, Render, Railway). Set `PORT`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- Database: managed Postgres works as-is.
- Static uploads: move out of the repo to S3 or a managed object store. The current `express.static` serving is fine for the assessment but not for scale.
- Frontend: `npm --prefix frontend run build` produces `dist/`. Host on Vercel / Netlify / Cloudflare Pages. Set `VITE_API_BASE_URL` to the deployed backend.

---

## Submission notes

- `.env` files are not in version control. Copy from `.env.example` and fill secrets locally.
- `backend/src/uploads/` is gitignored; the three sample mp4s ship with the repo but new uploads are ignored.
- `node_modules/` and `dist/` are gitignored on both sides.
- The repo runs end-to-end with the four commands in [Installation & run](#installation--run) plus a one-time seed.

Built for the **Skillcase Intern Assessment**.
