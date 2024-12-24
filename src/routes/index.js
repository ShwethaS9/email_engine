const express = require('express');
const NotificationController = require('../modules/Notification/NotificationController');
const UserController = require('../modules/User/UserController');
const SyncController = require('../modules/Sync/SyncController');
const { authenticate } = require('../middlewares/authMiddleware'); // For authentication (if needed)

const router = express.Router();

// API route for sending notifications
router.post('/send-notification', NotificationController.sendNotification);

// WebSocket route for notifications (upgraded from HTTP)
router.ws('/notifications', NotificationController.handleWebSocketConnection);

// User management routes
router.post('/user', UserController.createAccount);  // Create a new user
router.get('/user/:userId', UserController.getUserInfo);  // Get user by ID
router.post('/link/outlook', UserController.linkOutlookAccount); // Link Outlook account
// router.put('/user/:userId', UserController.updateUser);  // Update user info
// router.delete('/user/:userId', UserController.deleteUser);  // Delete a user

// Email sync routes
router.post('/sync/email', authenticate, SyncController.syncEmail);  // Start email sync (protected by auth middleware)
router.get('/sync/status', authenticate, SyncController.getSyncStatus);  // Get sync status

// Additional routes for other modules can be added here

module.exports = router;
