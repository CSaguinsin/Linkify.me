import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnqSVH1L-LrOAtykrDOGTdOQh8kgp2VlI",
  authDomain: "linkify-95522.firebaseapp.com",
  projectId: "linkify-95522",
  storageBucket: "linkify-95522.appspot.com",
  messagingSenderId: "178377945294",
  appId: "1:178377945294:web:d9818f1c52486ac16aa09f",
  measurementId: "G-LLW36SQQY7"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)

export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app); // Change db to firestore
export const storage = getStorage(app);


// Export the Firebase app if needed
export default app;
