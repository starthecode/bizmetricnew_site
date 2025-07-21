import Seo from '../models/seo.model.js';
import Solutions from '../models/solutions.model.js';

import { errorhandler } from '../utils/error.js';

export const createSolution = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorhandler(403, 'You are not allowed to create the solution')
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
    const newSolution = new Solutions({
      ...req.body,
      slug,
      pageId,
      userId: req.user.id,
    });

    const savedSolution = await newSolution.save();

    // 📝 Save SEO entry with reference to the page
    const seoEntry = new Seo({
      pageType: 'Solutions',
      pageId: savedSolution._id,
      ...seoFields,
    });

    await seoEntry.save();

    res.status(201).json({
      success: true,
      page: savedSolution,
      seo: seoEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const getSolutions = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const solutions = await Solutions.find({
      ...(req.query.pageId && { _id: req.query.pageId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select('title createdAt metaFields postType pageId slug excerpts'); // ✅ Include all needed fields

    const filteredPosts =
      solutions &&
      solutions.map((post) => ({
        id: post?._id.toString(),
        title: post.title,
        postType: post?.postType,
        pageId: post?.pageId,
        slug: post.slug,
        image: post.metaFields?.featuredImage || '',
        category: post.metaFields?.categories || [],
        date: post.createdAt,
        excerpts: post.excerpts,
      }));

    const totalPostCount = await Solutions.countDocuments();

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
    const post = await Solutions.findOne({ pageId: req.params.postId }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Solution Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error.message);
  }
};

export const getSolutionBySlug = async (req, res, next) => {
  console.log('req.params.slug', req.params.slug);

  try {
    const solution = await Solutions.findOne({ slug: req.params.slug }).lean();

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    console.log('solution', solution);

    res.status(200).json(solution);
  } catch (error) {
    next(error.message);
  }
};

export const updateSolutionsById = async (req, res, next) => {
  const { title, content, seoFields, pageId } = req.body;

  try {
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const updatedSolutions = await Solutions.findOneAndUpdate(
      { pageId: Number(pageId) },
      { $set: { ...req.body, slug } },
      { new: true }
    );

    if (!updatedSolutions) {
      return res
        .status(404)
        .json({ success: false, message: 'Solutions Post not found' });
    }

    if (seoFields) {
      await Seo.findOneAndUpdate(
        { pageId: updatedSolutions._id, pageType: 'Solutions' },
        {
          $set: {
            ...seoFields,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true, message: 'Solutions Updated' });
  } catch (error) {
    console.log('error', error);
    console.log('error.message', error.message);
    next(error.message);
  }
};
