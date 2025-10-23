const User = require('@src/models/User');
const Listing = require('@src/models/Listing');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalListings, activeListings, closedListings] = await Promise.all([
      User.countDocuments({}),
      Listing.countDocuments({}),
      Listing.countDocuments({ isClosed: false }),
      Listing.countDocuments({ isClosed: true })
    ]);

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [newUsers24h, newListings24h] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: since } }),
      Listing.countDocuments({ createdAt: { $gte: since } })
    ]);

    const listingsByCategoryAgg = await Listing.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { _id: 0, category: '$_id', count: 1 } },
      { $sort: { count: -1 } }
    ]);

    return res.status(200).json({
      totalUsers,
      totalListings,
      activeListings,
      closedListings,
      listingsByCategory: listingsByCategoryAgg,
      newUsers24h,
      newListings24h
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
