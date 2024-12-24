const axios = require('axios');
const { handleError } = require('../../core/utils/ErrorHandler');

class OutlookService {
  constructor(accessToken) {
    this.baseUrl = 'https://graph.microsoft.com/v1.0/me';
    this.accessToken = accessToken;
  }

  async fetchEmails() {
    try {
      const response = await axios.get(`${this.baseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data.value; // Array of email messages
    } catch (error) {
      handleError(error, 'Error fetching emails from Outlook');
    }
  }

  async getMailFolders() {
    try {
      const response = await axios.get(`${this.baseUrl}/mailFolders`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data.value; // Array of mail folders
    } catch (error) {
      handleError(error, 'Error fetching mail folders from Outlook');
    }
  }

  async syncEmailChanges(deltaLink) {
    try {
      const response = await axios.get(deltaLink, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data; // Includes changes, deletions, and next deltaLink
    } catch (error) {
      handleError(error, 'Error synchronizing email changes');
    }
  }
}

module.exports = OutlookService;
