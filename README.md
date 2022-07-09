# Lost Ark LFG manager

Managing guild in games can be quite handful, therefore this app was created to help guild leaders plan out upcoming raids and guild events.

Link to our guild app: https://cuteapp-df5c1.web.app/

## Core features

- Create / edit raid LFG
- Join / leave raid LFG
- Create / edit your characters
- **Admin / LFG post owner** edit raid applicants
- **Admin** edit user permissions

## Upcoming features

- Calendar view
- Discord login and notifications
- Join and edit LFG applicants with drag and drop

## Preview

### Dashboard

![Dashboard preview](https://github.com/Apluri/lfg-manager/blob/master/screenshots/dashboard.PNG?raw=true)

### Create LFG

![Dashboard preview](https://github.com/Apluri/lfg-manager/blob/master/screenshots/createRaid.PNG?raw=true)

### Create character

![Dashboard preview](https://github.com/Apluri/lfg-manager/blob/master/screenshots/createChar.PNG?raw=true)

## Host your own version

Note that only our guildmates are given permission to use the application. If you wish to use this app for your guild, you need to setup your own backend and hosting service.

My version uses Firebase Realtime Database, Authentication and Hosting.

### How to setup your own using firebase

Create firebase project then create .env file to root of the project folder, add following fields and replace with your own project values.

    REACT_APP_FIREBASE_API_KEY = "firebase api key here"
    REACT_APP_FIREBASE_AUTH_DOMAIN = "firebase auth domain here"
    REACT_APP_FIREBASE_PROJECT_ID = "firebase project id here"
    REACT_APP_FIREBASE_STORAGE_BUCKET = "Firebase storagebucket here"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "firebase massaging sender id here"
    REACT_APP_FIREBASE_APP_ID = "firebase app id here"
    REACT_APP_FIREBASE_DATABASE_URL = "firebase database url here"
