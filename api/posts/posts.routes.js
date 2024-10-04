const express = require("express");
const router = express.Router(); // mergeParams allows access to params from parent router
const {
  postsCreate,
  postsDelete,
  postsUpdate,
  postsGet,
} = require("./posts.controllers");
const tagsController = require("../tag/tags.controller");
console.log(tagsController); // This should show you what's being imported

router.post("/", postsCreate);
router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);
router.get("/", postsGet);
router.post("/:postId/tags/:tagId", tagsController.tagAdd);

module.exports = router;
