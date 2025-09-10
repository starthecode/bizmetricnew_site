// routes/category.js
import express from 'express';
import Category from '../models/category.model.js';

const router = express.Router();

// Get categories by type
router.get('/', async (req, res) => {
  const { type } = req.query;
  const categories = await Category.find({ type });
  res.json(categories);
});

// Add new category
router.post('/', async (req, res) => {
  const { name, type, pageType } = req.body;
  try {
    const newCat = new Category({ name, type, pageType });
    await newCat.save();
    res.json(newCat);
  } catch (err) {
    // Handle MongoDB duplicate error code
    if (err.code === 11000) {
      res.status(400).json({ error: 'Category already exists.' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

export default router;
