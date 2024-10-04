const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts");
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Add the authorId to req.body
    req.body.author = authorId;

    // Create the post
    const post = new Post(req.body);
    await post.save();

    author.posts.push(post._id);
    await author.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
