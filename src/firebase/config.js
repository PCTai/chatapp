import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyABmu9xVmF54feoWwqoNjY5lalxjr9Kdbo",
  authDomain: "chatroom-42a35.firebaseapp.com",
  projectId: "chatroom-42a35",
  storageBucket: "chatroom-42a35.appspot.com",
  messagingSenderId: "893641208628",
  appId: "1:893641208628:web:63c6e6efb93b1057bb2b61",
  measurementId: "G-6JJBRQS3XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);

export default app;