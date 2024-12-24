const axios = require('axios');
const { outlook } = require('../../core/config/oauth');
const querystring = require('querystring');

class OutlookOAuth {
  static getAuthUrl(state) {
    const params = new URLSearchParams({
      client_id: outlook.clientId,
      response_type: 'code',
      redirect_uri: outlook.callbackURL,
      scope: outlook.scope.join(' '),
      state,
    });
    console.log("getAuthUrl")
    return `${outlook.authorizationURL}?${params.toString()}`;
  }

  static async getAccessToken(authCode) {
    try {
        console.log('Initiating token exchange with code:', authCode.substring(0, 10) + '...');
        
        const tokenParams = {
            client_id: outlook.clientId,
            client_secret: outlook.clientSecret,
            code: authCode,
            redirect_uri: outlook.callbackURL,
            grant_type: 'authorization_code',
            scope: outlook.scope.join(' ')
        };

        console.log('Token request parameters:', {
            url: outlook.tokenURL,
            client_id: tokenParams.client_id,
            redirect_uri: tokenParams.redirect_uri,
            grant_type: tokenParams.grant_type,
            scope: tokenParams.scope
        });

        const response = await axios.post(
            outlook.tokenURL,
            querystring.stringify(tokenParams),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                validateStatus: false // This will prevent axios from throwing on non-2xx status
            }
        );

        // Log response status and headers
        console.log('Token response status:', response.status);
        console.log('Token response headers:', response.headers);

        // Check if the response was successful
        if (response.status !== 200) {
            console.error('Token response error:', {
                status: response.status,
                statusText: response.statusText,
                data: response.data
            });
            throw new Error(`Token request failed with status ${response.status}: ${JSON.stringify(response.data)}`);
        }

        // Validate response data
        if (!response.data.access_token) {
            console.error('Invalid token response:', response.data);
            throw new Error('Token response missing access_token');
        }

        console.log('Successfully obtained access token');
        
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
            tokenType: response.data.token_type,
            scope: response.data.scope
        };

    } catch (error) {
        // Handle axios specific errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Token exchange error response:', {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                headers: error.response.headers
            });
            throw new Error(`Token exchange failed: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Token exchange request error:', error.request);
            throw new Error('No response received from token endpoint');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Token exchange setup error:', error.message);
            throw new Error(`Token exchange error: ${error.message}`);
        }
    }
}

  static async refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(outlook.tokenURL, querystring.stringify({
        client_id: outlook.clientId,
        client_secret: outlook.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data; // Includes new accessToken
    } catch (error) {
      throw new Error('Error refreshing access token');
    }
  }
}

module.exports = OutlookOAuth;
