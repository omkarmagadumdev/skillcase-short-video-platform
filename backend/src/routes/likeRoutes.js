const express = require("express");
const likeController = require("../controllers/likeController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/:videoId", authenticate, likeController.create);
router.delete("/:videoId", authenticate, likeController.remove);

module.exports = router;
