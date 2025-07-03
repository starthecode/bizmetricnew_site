import Newsletters from '../models/newsletters.model.js';
import Seo from '../models/seo.model.js';

import { errorhandler } from '../utils/error.js';

export const createNewsletter = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorhandler(403, 'You are not allowed to create the newsletter')
    );
  }

  const { title, pageId, seoFields } = req.body;

  if (!title) {
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
    const newNewsletters = new Newsletters({
      ...req.body,
      slug,
      pageId,
      userId: req.user.id,
    });

    const savedNewsletter = await newNewsletters.save();

    // 📝 Save SEO entry with reference to the page
    const seoEntry = new Seo({
      pageType: 'Newsletters',
      pageId: savedNewsletter._id,
      ...seoFields,
    });

    await seoEntry.save();

    res.status(201).json({
      success: true,
      page: savedNewsletter,
      seo: seoEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsletters = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const newsletters = await Newsletters.find({
      ...(req.query.pageId && { _id: req.query.pageId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select(
        'title publishDate metaFields postType pageId slug extraInputFields'
      ); // ✅ Include all needed fields

    const filteredPosts =
      newsletters &&
      newsletters.map((post) => ({
        id: post?._id.toString(),
        title: post.title,
        postType: post?.postType,
        pageId: post?.pageId,
        slug: post.slug,
        image: post.metaFields?.featuredImage || '',
        category: post.metaFields?.categories || [],
        date: post.publishDate,
        extraInputFields: post.extraInputFields,
      }));

    const totalPostCount = await Newsletters.countDocuments();

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
    const post = await Newsletters.findOne({
      pageId: req.params.postId,
    }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Newsletters Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error.message);
  }
};

export const getNewsletterBySlug = async (req, res, next) => {
  try {
    const newsletter = await Newsletters.findOne({
      slug: req.params.slug,
    }).lean();

    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    const otherNewsletters = await Newsletters.find({
      slug: { $ne: req.params.slug },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title excerpts slug metaFields.featuredImage')
      .lean();

    return res.status(200).json({
      newsletter,
      moreNewsletters: otherNewsletters,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateNewslettersById = async (req, res, next) => {
  const { title, seoFields, pageId } = req.body;

  try {
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const updatedNewsletters = await Newsletters.findOneAndUpdate(
      { pageId: Number(pageId) },
      { $set: { ...req.body, slug } },
      { new: true }
    );

    if (!updatedNewsletters) {
      return res
        .status(404)
        .json({ success: false, message: 'Newsletters Post not found' });
    }

    if (seoFields) {
      await Seo.findOneAndUpdate(
        { pageId: updatedNewsletters._id, pageType: 'Newsletters' },
        {
          $set: {
            ...seoFields,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true, message: 'Newsletters Updated' });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    next(error.message);
  }
};
