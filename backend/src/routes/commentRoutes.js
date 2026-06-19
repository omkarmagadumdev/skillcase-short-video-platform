const express = require("express");
const authenticate = require("../middlewares/authenticate");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/:videoId", authenticate, commentController.create);
router.get("/:videoId", commentController.getAllForVideo);
router.delete("/:commentId", authenticate, commentController.remove);

module.exports = router;
