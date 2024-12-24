const SyncWorker = require('./SyncWorker');
const { handleError } = require('../../core/utils/ErrorHandler');

class SyncService {
  static async startEmailSync(userId) {
    try {
      // Create a new sync task in the database (optional step)
      const syncId = await SyncWorker.initiateSync(userId);
      return { syncId, message: 'Sync task initiated' };
    } catch (error) {
      handleError(error, 'Error starting email sync');
      throw error;
    }
  }

  static async getSyncStatus(syncId) {
    try {
      // Fetch sync status from a data source (e.g., database)
      const syncStatus = await SyncWorker.getSyncStatus(syncId);
      return syncStatus;
    } catch (error) {
      handleError(error, 'Error fetching sync status');
      throw error;
    }
  }
}

module.exports = SyncService;
