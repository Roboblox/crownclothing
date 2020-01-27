import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDO1u9-YQWQWWHnPbvYaR7Vsezks_ls87w",
  authDomain: "crown-db-c3084.firebaseapp.com",
  databaseURL: "https://crown-db-c3084.firebaseio.com",
  projectId: "crown-db-c3084",
  storageBucket: "crown-db-c3084.appspot.com",
  messagingSenderId: "482020957355",
  appId: "1:482020957355:web:e3c62bc8520eb359ddebee",
  measurementId: "G-1WQTG9JWN9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
