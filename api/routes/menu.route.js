import express from 'express';
import Menu from '../models/menu.model.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const items = await Menu.find().sort({ position: 1 });
  res.json({ data: { menuItems: { nodes: items } } });
});

// POST
router.post('/', async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT
router.put('/:key', async (req, res) => {
  const updated = await Menu.findOneAndUpdate(
    { key: req.params.key },
    req.body,
    { new: true }
  );
  res.json(updated);
});

//Delete
router.delete('/:key', async (req, res) => {
  try {
    const result = await Menu.deleteOne({ key: req.params.key });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error while deleting' });
  }
});

export default router;
