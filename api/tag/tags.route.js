const express = require("express");
const router = express.Router();
const { tagsGet } = require("./tags.controller");

router.get("/", tagsGet);

module.exports = router;
