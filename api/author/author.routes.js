const express = require("express");
const router = express.Router();
const {
  createAuthor,
  getAllAuthors,
  createPost,
} = require("./author.controller");

router.post("/", createAuthor);
router.get("/", getAllAuthors);
router.post("/:authorId/posts", createPost);

module.exports = router;
