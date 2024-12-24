// const app = require('./app'); // Import the app from app.js
// const {logger} = require('./core/utils/Logger');
// const { PORT } = require('./core/config/app'); // Get the port from environment variables or default configuration

// // Start the server
// app.listen(PORT, () => {
//   logger.info(`Server is running on port ${PORT}`);
// });
// server.js or index.js
const app = require('./app');
const { logger } = require('./core/utils/Logger');
const { PORT } = require('./core/config/app');
const UserModel = require('./modules/User/UserModel');
const dotenv = require('dotenv');
dotenv.config();
async function initializeServices() {
  try {
    // Initialize Elasticsearch indices
    await UserModel.initialize();
    logger.info('User model initialized successfully');

    // Add any other service initializations here
    // For example: Redis, Message Queues, etc.

  } catch (error) {
    logger.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    // Initialize all services first
    await initializeServices();

    // Start the Express server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Start the application
startServer();