# Budget Calculator
Setting realistic expectations around budget is an important part of any home improvement design process. This budget calculator can help clients understand the cost of building and installing individual elements in their designs.

## Environment Vars For Firebase Connectivity
Before deploying, the following environment variables will need to be set up on the host: 

REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID

## Built On React App With Express Backend Starter
A starter template for creating React applications with a Node/Express backend. Includes frontend and backend tests, as well as Winston/Morgan logging of API routes and errors, and CircleCI config, and Heroku deployment. Client built with create-react-app.

## Installation
```
git clone https://github.com/newsproutsmedia/react-app-express.git
```
## Setup
To set up dependencies, ```npm run setup:server``` and then ```npm run setup:client```.

## To Check That It's Working
```npm run startboth``` from the project root. When the React app opens in your browser, you should see the text "You're connected to the backend!". You can test the POST route by sending a request using the input field. If it's working, you should receive a response below the form.
## Scripts
A number of useful scripts are included in the root package.json file:
- "server": starts only the server (Node)
- "setup:server": installs server dependencies
- "test:server": runs SuperTest tests on server APIs
- "client": starts only the client (React)
- "setup:client": installs client dependencies
- "build:client": builds the client
- "test:client": runs Jest tests on client
- "startboth": starts both server and client
## A Note About Tests
Make sure to run ```npm run build:client``` from the project root *before* running your server tests, or any routes returning html pages will fail -- can't test what isn't there!

## Deploying To Heroku
Heroku automatically installs all dependencies listed in the package.json file located in the project's root directory. However, in order to prevent dependency conflicts, the server and client have been placed in their own adjacent directories. In addition, since the React App is served up by Express via the client's "build" folder, the client must be built AFTER deployment. To accomplish all this, a "post build" script has been included:

```
"heroku-postbuild": "npm run setup:server && npm run prune:server && npm run setup:client && npm run build:client"
```

This script will:
1. Install server dependencies
2. Remove server devDependencies
3. Setup client dependencies
4. Build the client

## Troubleshooting
### Eslint Causing Build Failure On Heroku
Occasionally, the client eslint settings will cause a build failure on Heroku. If this happens, it may be necessary to disable eslint by setting a Config Var in your Heroku dashboard. This won't impact any pre-build CI testing you are running (on, for example, on CircleCI). To disable eslint on Heroku:
1. Choose your app from the Heroku dashboard
2. Select "Settings" from the app menu
3. Scroll down to the "Config Vars" section
4. Add ```DISABLE_ESLINT_PLUGIN``` as the KEY and set its VALUE to ```true```
5. Click the "Add" button to the right of the fields

The app should now build successfully