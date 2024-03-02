const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

// نقطة النهاية (endpoint) للحصول على جميع المشاركات
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// نقطة النهاية (endpoint) لإنشاء مشاركة جديدة
router.post('/posts', async (req, res) => {
    const { title, content } = req.body;

    const post = new Post({
        title,
        content,
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// update the post
router.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// delete the post
router.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        await Post.findByIdAndRemove(postId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;

