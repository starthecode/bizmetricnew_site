import Post from '../models/post.model.js';

import Seo from '../models/seo.model.js';

import { errorhandler } from '../utils/error.js';

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorhandler(403, 'You are not allowed to create the post'));
  }

  const { title, content, pageId, seoFields } = req.body;

  if (!title || !content) {
    return next(errorhandler(400, 'Please provide all required fields'));
  }

  // Generate slug
  const slug = title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  try {
    // Save the new page
    const newPage = new Post({
      ...req.body,
      slug,
      pageId,
      userId: req.user.id,
    });

    const savedPage = await newPage.save();

    // 📝 Save SEO entry with reference to the page
    const seoEntry = new Seo({
      pageType: 'Post',
      pageId: savedPage._id,
      ...seoFields,
    });

    await seoEntry.save();

    res.status(201).json({
      success: true,
      page: savedPage,
      seo: seoEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.pageId && { _id: req.query.pageId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select('title createdAt metaFields postType pageId slug'); // ✅ Include all needed fields

    const filteredPosts =
      posts &&
      posts.map((post) => ({
        id: post?._id.toString(),
        title: post.title,
        postType: post?.postType,
        pageId: post?.pageId,
        slug: post.slug,
        image: post.metaFields?.featuredImage || '',
        category: post.metaFields?.categories || [],
        date: post.createdAt,
      }));

    const totalPostCount = await Post.countDocuments();

    res.status(200).json({
      posts: filteredPosts,
      totalPostCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findOne({ pageId: req.params.postId }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error.message);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('seo')
      .lean();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error.message);
  }
};

export const deletePostById = async (req, res, next) => {
  try {
    const { pageId } = req.params;
    const result = await Post.findOneAndDelete({ pageId: Number(pageId) });
    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    next(err.message);
  }
};

export const updatePostById = async (req, res, next) => {
  const { title, content, seoFields, pageId } = req.body;

  try {
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const updatedPost = await Post.findOneAndUpdate(
      { pageId: Number(pageId) },
      { $set: { ...req.body, slug } },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }

    if (seoFields) {
      await Seo.findOneAndUpdate(
        { pageId: updatedPost._id, pageType: 'Post' },
        {
          $set: {
            ...seoFields,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true, message: 'Post Updated' });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    next(error.message);
  }
};
