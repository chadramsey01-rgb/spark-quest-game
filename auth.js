// auth.js - Centralized Firebase Configuration & Auth Logic
const firebaseConfig = {
  apiKey: "AIzaSyAR4wofIoYwrDMC7jr_GGFYPvZoPgGgbIk",
  authDomain: "spark-quest.firebaseapp.com",
  projectId: "spark-quest",
  storageBucket: "spark-quest.firebasestorage.app",
  messagingSenderId: "113841238943",
  appId: "1:113841238943:web:fd6b69669fb891afcd43aa",
  measurementId: "G-9VQJ7CT98X"
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Helper to set persistence based on "Remember Me"
const setAuthPersistence = (remember) => {
    const persistence = remember 
        ? firebase.auth.Auth.Persistence.LOCAL 
        : firebase.auth.Auth.Persistence.SESSION;
    return auth.setPersistence(persistence);
};