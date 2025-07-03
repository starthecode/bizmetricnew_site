import Casestudies from '../models/casestudies.model.js';
import Seo from '../models/seo.model.js';

import { errorhandler } from '../utils/error.js';

export const createCasestudies = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorhandler(403, 'You are not allowed to create the Casestudies')
    );
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
    const newCasestudies = new Casestudies({
      ...req.body,
      slug,
      pageId,
      userId: req.user.id,
    });

    const savedCasestudies = await newCasestudies.save();

    // 📝 Save SEO entry with reference to the page
    const seoEntry = new Seo({
      pageType: 'Casestudies',
      pageId: savedCasestudies._id,
      ...seoFields,
    });

    await seoEntry.save();

    res.status(201).json({
      success: true,
      page: savedCasestudies,
      seo: seoEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const getCasestudies = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const CasestudiesData = await Casestudies.find({
      ...(req.query.pageId && { _id: req.query.pageId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select('title createdAt metaFields postType pageId slug'); // ✅ Include all needed fields

    const filteredPosts =
      CasestudiesData &&
      CasestudiesData.map((post) => ({
        id: post?._id.toString(),
        title: post.title,
        postType: post?.postType,
        pageId: post?.pageId,
        slug: post.slug,
        image: post.metaFields?.featuredImage || '',
        category: post.metaFields?.categories || [],
        date: post.createdAt,
      }));

    const totalPostCount = await Casestudies.countDocuments();

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
    const post = await Casestudies.findOne({
      pageId: req.params.postId,
    }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Casestudies Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error.message);
  }
};

export const getCasestudiesBySlug = async (req, res, next) => {
  try {
    const CasestudiesData = await Casestudies.findOne({
      slug: req.params.slug,
    }).lean();

    if (!CasestudiesData) {
      return res.status(404).json({ message: 'Casestudies not found' });
    }

    res.status(200).json(CasestudiesData);
  } catch (error) {
    next(error.message);
  }
};

export const updateCasestudiesById = async (req, res, next) => {
  const { title, content, seoFields, pageId } = req.body;

  try {
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const updatedCasestudies = await Casestudies.findOneAndUpdate(
      { pageId: Number(pageId) },
      { $set: { ...req.body, slug } },
      { new: true }
    );

    if (!updatedCasestudies) {
      return res
        .status(404)
        .json({ success: false, message: 'Casestudies Post not found' });
    }

    if (seoFields) {
      await Seo.findOneAndUpdate(
        { pageId: updatedCasestudies._id, pageType: 'Casestudies' },
        {
          $set: {
            ...seoFields,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true, message: 'Casestudies Updated' });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    next(error.message);
  }
};
