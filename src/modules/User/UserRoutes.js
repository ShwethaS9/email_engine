const express = require('express');
const UserController = require('./UserController');

const router = express.Router();

// Routes for user management
router.post('/create', UserController.createAccount); // Account creation route
router.post('/link/outlook', UserController.linkOutlookAccount); // Link Outlook account
router.get('/:userId', UserController.getUserInfo); // Get user details

// OAuth routes
router.get('/auth/outlook', UserController.initiateOutlookAuth);
router.get('/auth/outlook/callback', UserController.handleOutlookCallback);
module.exports = router;
