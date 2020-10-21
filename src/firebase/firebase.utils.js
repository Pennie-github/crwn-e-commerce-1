import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCwG3ZLex66B6BA8wN8OXyH3erEa_82J00",
  authDomain: "crwn-db-fdcbb.firebaseapp.com",
  databaseURL: "https://crwn-db-fdcbb.firebaseio.com",
  projectId: "crwn-db-fdcbb",
  storageBucket: "crwn-db-fdcbb.appspot.com",
  messagingSenderId: "367726101795",
  appId: "1:367726101795:web:93a05b1dc096f9fc86b896",
  measurementId: "G-CTXMBV8GX1"
};

firebase.initializeApp(config);

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
