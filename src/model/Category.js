import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const CategoryModel = mongoose.model('category', categorySchema);