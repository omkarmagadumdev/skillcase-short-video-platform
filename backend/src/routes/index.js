const express = require("express");
const authRoutes = require("./authRoutes");
const bookmarkRoutes = require("./bookmarkRoutes");
const commentRoutes = require("./commentRoutes");
const healthRoutes = require("./healthRoutes");
const likeRoutes = require("./likeRoutes");
const videoRoutes = require("./videoRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/bookmarks", bookmarkRoutes);
router.use("/comments", commentRoutes);
router.use("/health", healthRoutes);
router.use("/likes", likeRoutes);
router.use("/videos", videoRoutes);

module.exports = router;
