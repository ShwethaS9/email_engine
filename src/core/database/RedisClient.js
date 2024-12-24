const redis = require("redis");

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL, // e.g., "redis://localhost:6379"
      password: process.env.REDIS_PASSWORD, // optional
    });

    this.client.on("connect", () => {
      console.log("Connected to Redis.");
    });

    this.client.on("error", (error) => {
      console.error("Redis connection error:", error);
    });

    this.client.connect().catch((error) => {
      console.error("Error connecting to Redis:", error);
    });
  }

  async set(key, value, expirationInSeconds = 3600) {
    try {
      await this.client.set(key, JSON.stringify(value), {
        EX: expirationInSeconds,
      });
      console.log(`Key "${key}" set successfully.`);
    } catch (error) {
      console.error("Error setting key in Redis:", error);
    }
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting key from Redis:", error);
      throw error;
    }
  }

  async delete(key) {
    try {
      await this.client.del(key);
      console.log(`Key "${key}" deleted successfully.`);
    } catch (error) {
      console.error("Error deleting key from Redis:", error);
    }
  }
}

module.exports = new RedisClient();
