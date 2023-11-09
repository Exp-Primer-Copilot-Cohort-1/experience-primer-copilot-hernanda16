// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

// Create comment
router.post('/', async (req, res) => {
  // Check if post exists
  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(400).send('Invalid post.');

  // Create comment
  const comment = new Comment({
    postId: req.body.postId,
    name: req.body.name,
    email: req.body.email,
    body: req.body.body
  });

  // Save comment
  try {
    const result = await comment.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get comments
router.get('/:id', async (req, res) => {
  // Check if post exists
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send('Invalid post.');

  // Get comments
  const comments = await Comment.find({ postId: req.params.id });
  res.send(comments);
});

// Export router
module.exports = router;