const Tag = require("../../models/Tag");
const Post = require("../../models/Post");

exports.tagsGet = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate("posts");
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.tagAdd = async (req, res, next) => {
  try {
    const { postId, tagId } = req.params;

    // Find the post and add the tag
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { tags: tagId } },
      { new: true }
    );

    // Find the tag and add the post
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
