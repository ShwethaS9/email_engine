const SyncService = require('./SyncService');
const { handleError } = require('../../core/utils/ErrorHandler');

class SyncController {
  static async startSync(req, res) {
    try {
      const { userId } = req.body;
      const syncResult = await SyncService.startEmailSync(userId);
      res.status(200).json({ message: 'Sync started successfully', result: syncResult });
    } catch (error) {
      handleError(error, 'Error starting email sync');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async checkSyncStatus(req, res) {
    try {
      const { syncId } = req.params;
      const syncStatus = await SyncService.getSyncStatus(syncId);
      res.status(200).json({ syncStatus });
    } catch (error) {
      handleError(error, 'Error checking sync status');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = SyncController;
