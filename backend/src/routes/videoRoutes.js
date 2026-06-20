const express = require("express");
const videoController = require("../controllers/videoController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, videoController.create);
router.get("/", authenticate, videoController.getAll);
router.get("/:id", videoController.getById);

module.exports = router;
