const { categories } = require('@src/constants/categories');

exports.getCategories = async (req, res) => {
  try {
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
