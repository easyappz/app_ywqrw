const express = require('express');
const router = express.Router();

const authMiddleware = require('@src/middlewares/auth');
const upload = require('@src/middlewares/upload');

const authController = require('@src/controllers/authController');
const userController = require('@src/controllers/userController');
const listingController = require('@src/controllers/listingController');
const categoryController = require('@src/controllers/categoryController');
const adminController = require('@src/controllers/adminController');

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Users
router.get('/users/me', authMiddleware, userController.getMe);
router.get('/users/me/listings', authMiddleware, listingController.getMyListings);

// Listings
router.post('/listings', authMiddleware, upload.array('images', 10), listingController.createListing);
router.get('/listings', listingController.getListings);
router.get('/listings/:id', listingController.getListingById);
router.patch('/listings/:id/close', authMiddleware, listingController.closeListing);

// Categories
router.get('/categories', categoryController.getCategories);

// Admin
router.get('/admin/stats', authMiddleware, adminController.getStats);

module.exports = router;
