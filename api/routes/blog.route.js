import express from 'express';
import Post from '../models/post.model.js';

const router = express.Router();

router.get('/getblog/:slug', async (req, res) => {
  try {
    const currentBlog = await Post.findOne({ slug: req.params.slug }).lean();

    if (!currentBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    const otherBlogs = await Post.find({ slug: { $ne: req.params.slug } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title excerpts slug metaFields.featuredImage')
      .lean();

    return res.status(200).json({
      blog: currentBlog,
      moreBlogs: otherBlogs,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return res.status(500).json({ error: 'Failed to fetch blog.' });
  }
});

export default router;
