# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Get Started

```
npm install
npm start
```
The above code snippet will install all dependencies and start the program. You may receive one error that is the firebase.js was not 'cause found it contained authorization keys, So it wasn't pushed. Now to simply get away with this error you can write a firebase.js file in your src directory here is the structure..

```
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // Your firebase authorization found in your Project Settings in firebase. The config.. Paste it here 
});

const db = firebaseApp.firestore();

export default db;

```

Now it will run smoothly without any error. Provided that you have made a firestore database. Mine is called messages(use efect in app.js). With three fiels message, Sent by and stamp.. Configure yours too.

Best Of Luck
Kushal A. :)
