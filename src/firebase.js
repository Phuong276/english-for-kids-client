// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyABIjcGb8iGz0zyIKPdwPK680fW347Z-G0",
  // authDomain: "english-for-kids-daa46.firebaseapp.com",
  // projectId: "english-for-kids-daa46",
  // storageBucket: "english-for-kids-daa46.appspot.com",
  // messagingSenderId: "22254407242",
  // appId: "1:22254407242:web:b9ff3fb3738e6eeee2e0b3",
  // measurementId: "G-9E0BR02L72",

  // apiKey: "AIzaSyCilmdhpP-Pq1T91eFm6PIJDK5jaFmb_YU",
  // authDomain: "english-for-kids-2.firebaseapp.com",
  // projectId: "english-for-kids-2",
  // storageBucket: "english-for-kids-2.appspot.com",
  // messagingSenderId: "1095504783285",
  // appId: "1:1095504783285:web:9a34cd3dd953f2b0055bfc",
  // measurementId: "G-79FTF97MS2",

  apiKey: "AIzaSyCh-0eMEBxpFooOLWWjNv4pFOe2tjKSk0k",
  authDomain: "english-for-kid-3.firebaseapp.com",
  projectId: "english-for-kid-3",
  storageBucket: "english-for-kid-3.appspot.com",
  messagingSenderId: "131050890138",
  appId: "1:131050890138:web:b3d6178e883c583cfbd023",
  measurementId: "G-2C8N5XHP3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
