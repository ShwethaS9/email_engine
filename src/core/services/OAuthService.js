class OAuthService {
    constructor() {
      if (new.target === OAuthService) {
        throw new Error("Cannot instantiate an abstract class.");
      }
    }
  
    /**
     * Generate an OAuth login URL for the user.
     * @abstract
     * @param {Object} options - Options such as redirect URL and scopes.
     */
    generateAuthUrl(options) {
      throw new Error("generateAuthUrl method must be implemented.");
    }
  
    /**
     * Exchange an authorization code for an access token.
     * @abstract
     * @param {string} code - Authorization code returned from the OAuth server.
     */
    async exchangeCodeForToken(code) {
      throw new Error("exchangeCodeForToken method must be implemented.");
    }
  
    /**
     * Refresh the access token using a refresh token.
     * @abstract
     * @param {string} refreshToken - Refresh token to obtain a new access token.
     */
    async refreshAccessToken(refreshToken) {
      throw new Error("refreshAccessToken method must be implemented.");
    }
  
    /**
     * Revoke an access token when a user disconnects their account.
     * @abstract
     * @param {string} accessToken - Access token to be revoked.
     */
    async revokeToken(accessToken) {
      throw new Error("revokeToken method must be implemented.");
    }
  }
  
  module.exports = OAuthService;
  