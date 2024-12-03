import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBty2zRkWIxhCOiFjiRC9CbKCIcnIvYOMk",
  authDomain: "nocleague-30457.firebaseapp.com",
  projectId: "nocleague-30457",
  storageBucket: "nocleague-30457.firebasestorage.app",
  messagingSenderId: "1051800219429",
  appId: "1:1051800219429:web:425caa1fa38c8a9c01f4cc",
  measurementId: "G-34FFXB4N0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };