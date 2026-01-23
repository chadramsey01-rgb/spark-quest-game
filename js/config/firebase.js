/* =============================================
   FIREBASE CONFIGURATION
   =============================================
   Initialize Firebase services for:
   - Authentication (Email/Password)
   - Firestore Database
   - Analytics (optional)
   ============================================= */

// Firebase configuration object
// NOTE: These are client-side keys - they're safe to expose
// Security comes from Firestore Rules, not key secrecy
const firebaseConfig = {
    apiKey: "AIzaSyAR4wofIoYwrDMC7jr_GGFYPvZoPgGgbIk",
    authDomain: "spark-quest.firebaseapp.com",
    projectId: "spark-quest",
    storageBucket: "spark-quest.firebasestorage.app",
    messagingSenderId: "113841238943",
    appId: "1:113841238943:web:fd6b69669fb891afcd43aa",
    measurementId: "G-9VQJ7CT98X"
};

// Initialize Firebase (only once)
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log('🔥 Firebase initialized');
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Export Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence (improves UX on slow connections)
db.enablePersistence({ synchronizeTabs: true })
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab
            console.warn('Firestore persistence unavailable - multiple tabs open');
        } else if (err.code === 'unimplemented') {
            // Browser doesn't support persistence
            console.warn('Firestore persistence not supported in this browser');
        }
    });

// Admin email for dashboard access
const SUPPORT_EMAIL = "chadramsey01@gmail.com";
