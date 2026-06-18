# Skillcase Short Video Platform

## Assignment Overview

This repository contains Milestone 1 of a mini short-video learning platform take-home assignment. The goal of this milestone is to establish a production-ready project structure for a Node.js, Express, PostgreSQL, React, and Vite application without implementing business features yet.

## Technology Stack

- Node.js
- Express
- PostgreSQL
- React
- Vite
- Redux Toolkit
- React Router
- Axios
- dotenv
- npm

## Project Structure

The repository is split into two application packages:

- `backend` for the Node.js and Express server scaffold
- `frontend` for the Vite and React client scaffold

## Folder Structure

```text
.
├── package.json
├── backend
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── package.json
│   ├── server.js
│   ├── sql
│   └── src
│       ├── app.js
│       ├── config
│       ├── controllers
│       ├── middlewares
│       ├── routes
│       ├── services
│       ├── uploads
│       └── utils
└── frontend
    ├── .env.example
    ├── .gitignore
    ├── README.md
    ├── index.html
    ├── package.json
    ├── public
    ├── src
    │   ├── api
    │   ├── assets
    │   ├── components
    │   ├── hooks
    │   ├── pages
    │   ├── redux
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

## Prerequisites

- Node.js 20+
- npm 10+

## Installation Instructions

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Setup

- Copy `backend/.env.example` to `backend/.env` when local backend variables are needed.
- Copy `frontend/.env.example` to `frontend/.env` when local frontend variables are needed.
- Keep placeholder values out of version control.

## Running Backend

```bash
cd backend
npm run dev
```

## Running Frontend

```bash
cd frontend
npm run dev
```

## Milestone Roadmap

1. Milestone 1: Project planning and repository setup
2. Milestone 2: Database connectivity and backend foundations
3. Milestone 3: Frontend state management and routing
4. Milestone 4: Feature implementation
5. Milestone 5: Integration, refinement, and delivery
