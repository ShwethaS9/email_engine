const WebSocket = require('ws'); // WebSocket package for real-time communication
const { handleError } = require('../../utils/ErrorHandler');

class NotificationService {
  constructor() {
    this.clients = [];
    this.socketServer = new WebSocket.Server({ noServer: true });
  }

  // Add client to the WebSocket server
  addClient(client) {
    this.clients.push(client);
    console.log(`New client connected: ${client._socket.remoteAddress}`);
  }

  // Remove client from the WebSocket server
  removeClient(client) {
    this.clients = this.clients.filter(c => c !== client);
    console.log(`Client disconnected: ${client._socket.remoteAddress}`);
  }

  // Send a notification to all connected clients
  sendNotificationToAllClients(message) {
    try {
      this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message)); // Send message in JSON format
        }
      });
    } catch (error) {
      handleError(error, 'Error sending notification to clients');
    }
  }

  // Listen for connection upgrades (WebSocket handshake)
  handleUpgradeRequest(request, socket, head) {
    this.socketServer.handleUpgrade(request, socket, head, client => {
      this.socketServer.emit('connection', client, request);
    });
  }
}

module.exports = new NotificationService();
