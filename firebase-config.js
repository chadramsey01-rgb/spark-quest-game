// =====================================================
// SPARK QUEST - FIREBASE CONFIGURATION
// =====================================================
// Replace the values below with your Firebase project config
// You can find these in Firebase Console > Project Settings > Your Apps
// =====================================================

const firebaseConfig = {
  apiKey: "AIzaSyAR4wofIoYwrDMC7jr_GGFYPvZoPgGgbIk",
  authDomain: "spark-quest.firebaseapp.com",
  projectId: "spark-quest",
  storageBucket: "spark-quest.firebasestorage.app",
  messagingSenderId: "113841238943",
  appId: "1:113841238943:web:fd6b69669fb891afcd43aa",
  measurementId: "G-9VQJ7CT98X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth instance for use across pages
const auth = firebase.auth();

// Optional: Enable persistence for offline support
// firebase.firestore().enablePersistence();

console.log('🔥 Firebase initialized for Spark Quest');
