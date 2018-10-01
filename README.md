# Next-Skeleton
![Next-Skeleton](https://raw.githubusercontent.com/Fairbanks-io/next-skeleton/master/next-skeleton.png)

### A simple framework to help get you stared with your Next.js app.

#### Features
It already has some of the basics baked right in:
- Based on the SSR Caching `create-next-app` example
- Material UI
- FontAwesome 5
- Mongoose DB Modeling
- Winston Logging

#### Getting Started
1. `yarn install` to get dependencies
2. `yarn dev` to launch the development server
3. `yarn build` when ready to build for production
4. `yarn start` to launch the production app

#### Setting up Sign in with Google

Environment Variables:

* GOOGLE_ID
* GOOGLE_SECRET

Configuration Steps:

1. Visit [Google Cloud Console](https://cloud.google.com/console/project)
2. Click the **CREATE PROJECT** button, enter a *Project Name* and click **CREATE**
3. Then select *APIs* then *Credentials*
4. Select **Create new oAuth Client ID** and enter the following:
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: `http://your-server.example.com/`
 - **Authorized redirect URI**: `http://your-server.example.com/auth/oauth/google/callback`
5. Specify *Client ID* as the **GOOGLE_ID** Config Variable
6. Specify *Client Secret* as the **GOOGLE_SECRET** Config Variable
7. Enable Google+ on the project - if you don't, sign in with Google+ will fail!
