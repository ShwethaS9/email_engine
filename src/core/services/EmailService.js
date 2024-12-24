class EmailService {
    constructor() {
      if (new.target === EmailService) {
        throw new Error("Cannot instantiate an abstract class.");
      }
    }
  
    /**
     * Synchronize emails from the remote service to the local database.
     * @abstract
     * @param {Object} user - User details including access tokens.
     */
    async syncEmails(user) {
      throw new Error("syncEmails method must be implemented.");
    }
  
    /**
     * Fetch a batch of emails for a user.
     * @abstract
     * @param {Object} user - User details including access tokens.
     * @param {Object} options - Options for filtering emails (e.g., date range, labels).
     */
    async fetchEmails(user, options = {}) {
      throw new Error("fetchEmails method must be implemented.");
    }
  
    /**
     * Update the status of an email (e.g., read/unread, flag, deletion).
     * @abstract
     * @param {Object} email - Email details to update.
     */
    async updateEmailStatus(email) {
      throw new Error("updateEmailStatus method must be implemented.");
    }
  
    /**
     * Monitor for changes in the user's mailbox.
     * @abstract
     * @param {Object} user - User details including access tokens.
     */
    async monitorMailboxChanges(user) {
      throw new Error("monitorMailboxChanges method must be implemented.");
    }
  }
  
  module.exports = EmailService;
  