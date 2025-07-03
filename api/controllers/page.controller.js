import Page from '../models/page.model.js';

import Seo from '../models/seo.model.js';

import generateSEO from '../utils/aiSeoGenerator.js';

import { errorhandler } from '../utils/error.js';

export const createPage = async (req, res, next) => {
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
    const newPage = new Page({
      ...req.body,
      slug,
      pageId,
      userId: req.user.id,
    });

    const savedPage = await newPage.save();

    // 🔮 Generate SEO metadata with AI
    // const seoData = await generateSEO({ title, content });

    // 📝 Save SEO entry with reference to the page
    const seoEntry = new Seo({
      pageType: 'Page',
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
    console.log(error);

    next(error);
  }
};

export const getPages = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Parse the _fields param like "title,slug" → "title slug"
    const fieldParam = req.query._fields;
    const selectedFields = fieldParam ? fieldParam.split(',').join(' ') : ''; // e.g., "title slug"

    const pages = await Page.find({
      ...(req.query.pageId && { _id: req.query.pageId }),
    })
      .select(selectedFields) // dynamically select fields
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPageCount = await Page.countDocuments();

    res.status(200).json({
      pages,
      totalPageCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getPageById = async (req, res, next) => {
  try {
    const page = await Page.findOne({ pageId: req.params.pageId })
      .populate('seo')
      .lean();

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.status(200).json(page);
  } catch (error) {
    next(error.message);
  }
};

export const getPageBySlug = async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug })
      .populate('seo')
      .lean();

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.status(200).json(page);
  } catch (error) {
    next(error.message);
  }
};

export const deletePageById = async (req, res, next) => {
  try {
    const { pageId } = req.params;

    const result = await Page.findOneAndDelete({ pageId: Number(pageId) });

    if (!result) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Page deleted successfully' });
  } catch (err) {
    next(err.message);
  }
};

export const updatePageById = async (req, res, next) => {
  const { title, seoFields } = req.body;
  try {
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const updatedPage = await Page.findOneAndUpdate(
      { pageId: Number(req.params.pageId) },
      { $set: { ...req.body, slug } },
      { new: true }
    );

    if (!updatedPage) {
      return res
        .status(404)
        .json({ success: false, message: 'Page not found' });
    }

    if (seoFields) {
      await Seo.findOneAndUpdate(
        { pageId: updatedPage._id, pageType: 'Page' },
        {
          $set: {
            ...seoFields,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true, message: 'Page Updated' });
  } catch (error) {
    next(error.message);
  }
};
