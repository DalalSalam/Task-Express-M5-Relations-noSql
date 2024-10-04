const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams allows access to params from parent router
const {
  postsCreate,
  postsDelete,
  postsUpdate,
  postsGet,
} = require("./posts.controllers");

router.post("/", postsCreate);
router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);
router.get("/", postsGet);

module.exports = router;
