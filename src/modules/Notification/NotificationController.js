const NotificationService = require('./NotificationService');
const { handleError } = require('../../utils/ErrorHandler');

class NotificationController {
  // Endpoint to handle WebSocket connections
  static handleWebSocketConnection(req, res) {
    // Upgrade HTTP request to WebSocket connection
    req.websocketServer.handleUpgrade(req, req.socket, req.headers, client => {
      NotificationService.addClient(client);
    });
  }

  // Endpoint to trigger sending notifications
  static sendNotification(req, res) {
    try {
      const { message } = req.body; // Get notification message from the request body

      if (!message) {
        return res.status(400).json({ error: 'Message content is required' });
      }

      // Send the message to all connected clients
      NotificationService.sendNotificationToAllClients({ text: message });
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      handleError(error, 'Error sending notification');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = NotificationController;
