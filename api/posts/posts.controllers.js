const Post = require("../../models/Post");
const Author = require("../../models/Author");
const Tag = require("../../models/Tag");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    const { authorId } = req.params; // Extract authorId from route parameters
    req.body.author = authorId;

    const newPost = await Post.create(req.body);

    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    author.posts.push(newPost._id);
    await author.save();

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author").populate("tags");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.tagAdd = async (req, res, next) => {
  try {
    const { postId, tagId } = req.params;

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { tags: tagId } },
      { new: true }
    );

    // Update tag
    const updatedTag = await Tag.findByIdAndUpdate(
      tagId,
      { $addToSet: { posts: postId } },
      { new: true }
    );

    if (!updatedPost || !updatedTag) {
      return res.status(404).json({ message: "Post or Tag not found" });
    }

    res.status(200).json({ post: updatedPost, tag: updatedTag });
  } catch (error) {
    next(error);
  }
};
