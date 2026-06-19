const express = require("express");
const authRoutes = require("./authRoutes");
const healthRoutes = require("./healthRoutes");
const videoRoutes = require("./videoRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/videos", videoRoutes);

module.exports = router;
