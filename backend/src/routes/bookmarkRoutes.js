const express = require("express");
const authenticate = require("../middlewares/authenticate");
const bookmarkController = require("../controllers/bookmarkController");

const router = express.Router();

router.post("/:videoId", authenticate, bookmarkController.create);
router.get("/", authenticate, bookmarkController.getAll);
router.delete("/:videoId", authenticate, bookmarkController.remove);

module.exports = router;
