const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post');

module.exports = {
  async create(req, res, next) {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }

      const comment = await Comment.create({
        ...req.body,
        user: req.userId,
        post: req.params.postId,
      });

      post.comments.push(comment.id);

      await post.save();

      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const post = await Post.findById(req.params.postId);
      const comment = await Comment.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }

      if (!comment) {
        return res.status(400).json({ error: "Comment doesn't exist" });
      }

      if (post.comments.indexOf(comment.id) === -1) {
        return res.status(400).json({ error: "There's no comment in this post" });
      }

      if (comment.user.toString() !== req.userId && post.user !== req.userId) {
        return res.status(400).json({ error: 'You cannot remove this comment' });
      }

      await Comment.findByIdAndRemove(req.params.id);

      post.comments.splice(post.comments.indexOf(comment.id, 1));

      await post.save();

      return res.send('Comment successfully deleted');
    } catch (err) {
      return next(err);
    }
  },
};
