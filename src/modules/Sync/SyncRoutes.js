const express = require('express');
const SyncController = require('./SyncController');

const router = express.Router();

// Routes for email synchronization
router.post('/start-sync', SyncController.startSync); // Start email sync for a user
router.get('/status/:syncId', SyncController.checkSyncStatus); // Check sync status

module.exports = router;
