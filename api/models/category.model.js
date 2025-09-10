// models/Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pageType: { type: String, required: true },
});

// Ensure unique index on { name, type }
CategorySchema.index({ name: 1, type: 1, pageType: 1 }, { unique: true });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
