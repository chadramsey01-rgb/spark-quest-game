/**
 * SparkQuest Analytics Tracker (FIXED)
 * ============================
 */
(function() {
    'use strict';

    // ✅ FIXED: I have inserted your REAL Firebase keys here.
    // This was causing the white screen crash.
    const firebaseConfig = {
        apiKey: "AIzaSyAR4wofIoYwrDMC7jr_GGFYPvZoPgGgbIk",
        authDomain: "spark-quest.firebaseapp.com",
        projectId: "spark-quest",
        storageBucket: "spark-quest.firebasestorage.app",
        messagingSenderId: "113841238943",
        appId: "1:113841238943:web:fd6b69669fb891afcd43aa",
        measurementId: "G-9VQJ7CT98X"
    };

    const CONFIG = {
        sessionTimeout: 30 * 60 * 1000,
        heartbeatInterval: 10 * 1000,
        collections: { users: 'users', sessions: 'sessions', activities: 'activities', pageViews: 'pageViews', events: 'events' },
        debug: false
    };

    class SparkQuestTracker {
        constructor() {
            this.db = null;
            this.isInitialized = false;
        }

        init() {
            if (this.isInitialized) return;
            try {
                // Only init if main app hasn't yet
                if (typeof firebase !== 'undefined' && !firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                if (typeof firebase !== 'undefined') {
                    this.db = firebase.firestore();
                    this.isInitialized = true;
                    console.log('Tracker active');
                }
            } catch (error) {
                console.warn('Tracker failed to load (Game will still work):', error);
            }
        }

        trackActivity(type, id, details = {}) {
            if (!this.isInitialized || !this.db) return;
            this.db.collection(CONFIG.collections.activities).add({
                type, id, details,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(e => console.warn("Track err", e));
        }
    }

    // Initialize
    window.SparkQuestTracker = new SparkQuestTracker();
    
    const start = () => {
        const check = setInterval(() => {
            if (typeof firebase !== 'undefined') {
                clearInterval(check);
                window.SparkQuestTracker.init();
            }
        }, 500);
    };
    
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    window.sqTrack = {
        activity: (t, i, d) => window.SparkQuestTracker.trackActivity(t, i, d)
    };

})();