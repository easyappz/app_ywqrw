const Listing = require('@src/models/Listing');
const { categories } = require('@src/constants/categories');

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, category, location } = req.body || {};

    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: 'title, description, price and category are required' });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ error: 'price must be a non-negative number' });
    }

    if (!categories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const files = Array.isArray(req.files) ? req.files : [];
    const images = files.map((f) => `/uploads/${f.filename}`);

    const listing = await Listing.create({
      title,
      description,
      price: numericPrice,
      category,
      images,
      location: location || '',
      owner: req.user.id
    });

    return res.status(201).json(listing);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);

    const query = {};
    if (typeof req.query.isClosed !== 'undefined') {
      query.isClosed = String(req.query.isClosed) === 'true';
    }
    if (req.query.category) {
      query.category = req.query.category;
    }

    const total = await Listing.countDocuments(query);
    const items = await Listing.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('owner', 'name email');

    return res.status(200).json({ items, total, page, limit });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('owner', 'name email');
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    const items = await Listing.find({ owner: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.closeListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (String(listing.owner) !== String(req.user.id)) {
      return res.status(403).json({ error: 'You are not allowed to close this listing' });
    }

    if (listing.isClosed) {
      return res.status(400).json({ error: 'Listing is already closed' });
    }

    listing.isClosed = true;
    await listing.save();

    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
