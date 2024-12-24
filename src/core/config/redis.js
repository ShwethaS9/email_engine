module.exports = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null,
    ttl: 3600, // Default TTL for cached data in seconds
  };
  