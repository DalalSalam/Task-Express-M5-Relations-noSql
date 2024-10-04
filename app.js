const express = require("express");
const app = express();
const authorRoutes = require("./api/author/author.routes");
const postRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const tagsRoutes = require("./api/tag/tags.route");

dotenv.config();
connectDb();
app.use(express.json());
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});
app.use(cors());
app.use(errorHandler);
app.use(notFoundHandler);

app.use("/api/authors", authorRoutes);
app.use("/api/authors/:authorId/posts", postRoutes);
app.use("/api/tags", tagsRoutes);
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
