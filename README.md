
# Email Engine

## Prerequisites

- Node.js: Make sure Node.js is installed.
- Elasticsearch: Ensure Elasticsearch is installed and running if you are using a local system. Download Elasticsearch.
- Azure Subscription: An Azure subscription is required to set up Azure Active Directory.

### Register an Application:

1. Go to the [Azure portal](https://portal.azure.com/).
2. Navigate to **"Azure Active Directory"** > **"App registrations"**.
3. Click on **"New registration"**.
4. Enter a name for the application (e.g., EmailEngine).
5. Set **"Supported account types"** to **"Accounts in this organizational directory only"**.
6. Set the **"Redirect URI"** to `http://localhost:3000/auth/outlook/callback`. This redirect URL should not be changed, as the same route is used in the code.
7. Click **"Register"**.

### Configure API Permissions:

1. After registering the application, go to **"API permissions"**.
2. Click **"Add a permission"**.
3. Select **"Microsoft Graph"**.
4. Choose **"Delegated permissions"**.
5. Select the following permissions:
    - `openid`
    - `profile`
    - `email`
    - `Mail.Read`
    - `offline_access`
6. Click **"Add permissions"**.
7. Click **"Grant admin consent for [your organization]"**.

### Generate Client Secret:

1. Navigate to **"Certificates & Secrets"** in your app registration.
2. Click on **"New Client Secret"**.
3. Provide a description and select an expiration period.
4. Click **"Add"**, then copy the client secret value (make sure to save the secret ID somewhere, as it will be required for setting up environment variables).

## Environment Variables
Create a `.env` file in the root of your project

```
# Environment Variables for the Email Service

# Application Configuration
NODE_ENV=development
PORT=3000

# JWT Secret Key for Authentication
JWT_SECRET=your-jwt-secret-key

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Elasticsearch Configuration
ELASTICSEARCH_HOST=elasticsearch
ELASTICSEARCH_PORT=9200
ELASTICSEARCH_NODE=http://localhost:9200/

# OAuth Configuration for Email Services
OAUTH_CLIENT_ID=Oauth_client_id
OAUTH_CLIENT_SECRET=oauth_client_secret
OAUTH_TENANT_ID=oauth_tenant_id
OAUTH_REDIRECT_URI=http://localhost:3000/api/user/auth/outlook/callback
OAUTH_SCOPE=email.read

# Email Service Configurations (Outlook as an example)
OUTLOOK_CLIENT_ID=your-outlook-client-id
OUTLOOK_CLIENT_SECRET=your-outlook-client-secret
OUTLOOK_TENANT_ID=your-tenant-id

# Email Server Configurations
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# Optional Debugging Configuration
DEBUG=true

# session secret
SESSION_SECRET="SESSION_SECRET"
```

# To start the app, run:
## To run email engine locally
```
npm install
npm start
```

# To run email engine as a Docker Container - Linux
```
1. Run the command: docker-compose up. This will build the image and start the server.
2. Once the server is running, open a browser and navigate to localhost:3000.
```

### After the setup is successfully completed, you will see the emails:
```
1. Login - Enter your email address and password.
2. Select authentication through a Microsoft account with the required permissions.
3. After successful signup, the following UI will display the emails.
```
