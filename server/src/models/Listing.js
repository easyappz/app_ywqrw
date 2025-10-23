const mongoose = require('mongoose');
const { categories } = require('@src/constants/categories');

const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: categories },
    images: [{ type: String }],
    location: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isClosed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', ListingSchema);
