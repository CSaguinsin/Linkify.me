import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnqSVH1L-LrOAtykrDOGTdOQh8kgp2VlI",
  authDomain: "linkify-95522.firebaseapp.com",
  projectId: "linkify-95522",
  storageBucket: "linkify-95522.appspot.com",
  messagingSenderId: "178377945294",
  appId: "1:178377945294:web:d9818f1c52486ac16aa09f",
  measurementId: "G-LLW36SQQY7"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);