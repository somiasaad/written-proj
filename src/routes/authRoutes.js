
const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
// Middleware    
function isAdmin(req, res, next) {
    const currentUser = req.user;

    if (currentUser && currentUser.isAdmin) {

        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}







// get posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

//   create a new post
// router.post('/posts', async (req, res) => {
//     const { title, content } = req.body;

//     const post = new Post({
//         title,
//         content,
//     });

//     try {
//         const savedPost = await post.save();
//         res.status(201).json(savedPost);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create post' });
//     }
// });
router.post('/posts', isAdmin, async (req, res) => {
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



// update
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



// delete post
router.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        await Post.findByIdAndDelete(postId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});



module.exports = router;