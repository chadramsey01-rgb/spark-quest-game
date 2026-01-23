/* =============================================
   GAME CONTEXT - STATE MANAGEMENT
   =============================================
   Centralized state management for Spark Quest.
   Handles:
   - User authentication
   - Player data (sparks, XP, inventory)
   - Game actions (complete quest, buy item, etc.)
   - Firebase sync
   ============================================= */

const { useState, useEffect, useContext, createContext } = React;

// Create the context
const GameContext = createContext();

/**
 * Custom hook to access game state
 * @returns {Object} Game context value
 */
function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

/**
 * Game Provider Component
 * Wraps the app and provides game state to all children
 */
function GameProvider({ children }) {
    // -----------------------------------------
    // STATE
    // -----------------------------------------
    const [parent, setParent] = useState(null);
    const [activePlayers, setActivePlayers] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [levelUpQueue, setLevelUpQueue] = useState([]);
    const [pendingChild, setPendingChild] = useState(null);
    const [loading, setLoading] = useState(true);

    // -----------------------------------------
    // AUTH LISTENER
    // -----------------------------------------
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    console.log('👤 User authenticated:', user.email);
                    
                    const docRef = db.collection('parents').doc(user.email);
                    const docSnap = await docRef.get();
                    
                    if (docSnap.exists) {
                        const data = docSnap.data();
                        
                        // Deduplicate children (safety check)
                        const uniqueChildren = [];
                        const seenNames = new Set();
                        
                        if (data.children) {
                            data.children.forEach(child => {
                                const name = typeof child === 'string' ? child : child.name;
                                const dob = typeof child === 'string' ? null : child.dob;
                                
                                if (!seenNames.has(name)) {
                                    seenNames.add(name);
                                    uniqueChildren.push({ name, dob });
                                }
                            });
                        }
                        
                        setParent({ ...data, children: uniqueChildren });
                    } else {
                        // New user - create profile
                        setParent({
                            email: user.email,
                            children: [],
                            customRewards: []
                        });
                    }
                } catch (error) {
                    console.error("Auth load error:", error);
                    setParent(null);
                }
            } else {
                setParent(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // -----------------------------------------
    // AUTHENTICATION ACTIONS
    // -----------------------------------------
    
    const loginParent = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, msg: error.message };
        }
    };

    const registerParent = async (email, password) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            
            const newParent = {
                email: email,
                children: [],
                customRewards: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await db.collection('parents').doc(email).set(newParent);
            setParent(newParent);
            
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, msg: error.message };
        }
    };

    const resetPassword = async (email) => {
        try {
            await auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    const logoutParent = async () => {
        await auth.signOut();
        setActivePlayers([]);
    };

    // -----------------------------------------
    // CHILD MANAGEMENT
    // -----------------------------------------
    
    const initAddChild = (name, dob) => {
        setPendingChild({
            username: name,
            dob: dob,
            sparks: 50,  // Starting currency
            xp: 0,
            level: 1,
            streak: 0,
            lastActive: null,
            inventory: [],
            history: [],
            chores: [],
            avatar: {
                base: 'boy',
                skin: 'skin_fair',
                hair: 'hair_brown_messy',
                shirt: null,
                hat: null,
                glasses: null,
                border: 'border_1'
            }
        });
        setIsCreating(true);
    };

    const completeAddChild = async (finalConfig) => {
        const childToSave = {
            ...pendingChild,
            avatar: finalConfig,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const childMeta = {
            name: childToSave.username,
            dob: childToSave.dob
        };

        // Update local state
        const cleanChildren = (parent?.children || [])
            .filter(c => c.name !== childToSave.username);
        const updatedParent = {
            ...parent,
            children: [...cleanChildren, childMeta]
        };
        setParent(updatedParent);

        // Batch write to Firebase
        const batch = db.batch();
        batch.update(
            db.collection('parents').doc(parent.email),
            { children: firebase.firestore.FieldValue.arrayUnion(childMeta) }
        );
        batch.set(
            db.collection('parents').doc(parent.email).collection('kids').doc(childToSave.username),
            childToSave
        );
        await batch.commit();

        setPendingChild(null);
        setIsCreating(false);
    };

    const deleteChild = async (childName) => {
        const updatedChildren = parent.children.filter(c => c.name !== childName);
        
        setParent({ ...parent, children: updatedChildren });
        
        await db.collection('parents').doc(parent.email).update({ children: updatedChildren });
        await db.collection('parents').doc(parent.email).collection('kids').doc(childName).delete();
    };

    // -----------------------------------------
    // GAME SESSION
    // -----------------------------------------
    
    const startGame = async (selectedNames) => {
        const promises = selectedNames.map(name =>
            db.collection('parents').doc(parent.email).collection('kids').doc(name).get()
        );
        
        const snapshots = await Promise.all(promises);
        
        const players = snapshots.map(snapshot => {
            if (!snapshot.exists) return null;
            
            const data = snapshot.data();
            
            // Ensure all required fields exist
            if (!data.avatar) {
                data.avatar = { skin: 'skin_fair', hair: 'hair_brown_messy', border: 'border_1' };
            }
            if (!data.history) data.history = [];
            if (!data.inventory) data.inventory = [];
            if (!data.chores) data.chores = [];
            
            return data;
        }).filter(p => p !== null);

        setActivePlayers(players);
        setIsCreating(false);
    };

    const exitGame = () => {
        setActivePlayers([]);
        setIsCreating(false);
    };

    // -----------------------------------------
    // AVATAR EDITING
    // -----------------------------------------
    
    const editAvatar = (playerIndex) => {
        setPendingChild(activePlayers[playerIndex]);
        setIsCreating(true);
    };

    const saveEditedAvatar = async (finalConfig) => {
        const updatedPlayer = { ...pendingChild, avatar: finalConfig };
        
        setActivePlayers(prev =>
            prev.map(p => p.username === updatedPlayer.username ? updatedPlayer : p)
        );
        
        setIsCreating(false);
        setPendingChild(null);
        
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(updatedPlayer.username)
            .update({ avatar: finalConfig });
    };

    // -----------------------------------------
    // CHORES & REWARDS
    // -----------------------------------------
    
    const addChoreToChild = async (childName, choreName, points) => {
        const newChore = {
            id: Date.now(),
            text: choreName,
            points: parseInt(points),
            lastCompleted: null
        };
        
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(childName)
            .update({
                chores: firebase.firestore.FieldValue.arrayUnion(newChore)
            });
    };

    const deleteChoreFromChild = async (childName, chore) => {
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(childName)
            .update({
                chores: firebase.firestore.FieldValue.arrayRemove(chore)
            });
    };

    const addCustomReward = async (name, cost) => {
        const newReward = { id: Date.now(), name, cost: parseInt(cost) };
        
        await db.collection('parents').doc(parent.email).update({
            customRewards: firebase.firestore.FieldValue.arrayUnion(newReward)
        });
        
        setParent(prev => ({
            ...prev,
            customRewards: [...(prev.customRewards || []), newReward]
        }));
    };

    const deleteCustomReward = async (reward) => {
        await db.collection('parents').doc(parent.email).update({
            customRewards: firebase.firestore.FieldValue.arrayRemove(reward)
        });
        
        setParent(prev => ({
            ...prev,
            customRewards: prev.customRewards.filter(r => r.id !== reward.id)
        }));
    };

    // -----------------------------------------
    // GAME ACTIONS
    // -----------------------------------------
    
    const completeChore = async (playerIndex, chore) => {
        const player = activePlayers[playerIndex];
        
        // Mark chore as completed today
        const updatedChores = player.chores.map(c =>
            c.id === chore.id ? { ...c, lastCompleted: new Date().toDateString() } : c
        );
        
        // Calculate new XP and level
        const newXP = player.xp + chore.points;
        const newLevel = LEVEL_CONFIG.getLevel(newXP);
        
        // Check for level up
        if (newLevel > player.level) {
            setLevelUpQueue(prev => [...prev, { playerIdx: playerIndex, level: newLevel }]);
        }
        
        const levelUpBonus = newLevel > player.level ? LEVEL_CONFIG.levelUpBonus : 0;
        
        const updatedPlayer = {
            ...player,
            sparks: player.sparks + chore.points + levelUpBonus,
            xp: newXP,
            level: newLevel,
            chores: updatedChores,
            lastActive: new Date().toISOString()
        };
        
        // Update local state
        setActivePlayers(prev =>
            prev.map(p => p.username === updatedPlayer.username ? updatedPlayer : p)
        );
        
        // Sync to Firebase
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(player.username)
            .set(updatedPlayer);
        
        // Log activity
        db.collection('activities').add({
            type: 'chore',
            userId: parent.email,
            childName: player.username,
            points: chore.points,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    const completeQuest = async (playerIndex, quest) => {
        const player = activePlayers[playerIndex];
        
        // Calculate new XP and level
        const newXP = player.xp + quest.sparks_reward;
        const newLevel = LEVEL_CONFIG.getLevel(newXP);
        
        // Check for level up
        if (newLevel > player.level) {
            setLevelUpQueue(prev => [...prev, { playerIdx: playerIndex, level: newLevel }]);
        }
        
        const levelUpBonus = newLevel > player.level ? LEVEL_CONFIG.levelUpBonus : 0;
        
        const updatedPlayer = {
            ...player,
            sparks: player.sparks + quest.sparks_reward + levelUpBonus,
            xp: newXP,
            level: newLevel,
            history: [quest, ...player.history].slice(0, 50), // Keep last 50 quests
            lastActive: new Date().toISOString()
        };
        
        // Update local state
        setActivePlayers(prev =>
            prev.map(p => p.username === updatedPlayer.username ? updatedPlayer : p)
        );
        
        // Sync to Firebase
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(player.username)
            .set(updatedPlayer);
        
        // Log activity
        db.collection('activities').add({
            type: 'quest',
            userId: parent.email,
            childName: player.username,
            questId: quest.id,
            category: quest.category,
            difficulty: quest.difficulty,
            sparks: quest.sparks_reward,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    const redeemReward = async (playerIndex, reward) => {
        const player = activePlayers[playerIndex];
        
        if (player.sparks < reward.cost) {
            return { success: false, msg: "Not enough sparks!" };
        }
        
        const updatedPlayer = {
            ...player,
            sparks: player.sparks - reward.cost
        };
        
        setActivePlayers(prev =>
            prev.map(p => p.username === player.username ? updatedPlayer : p)
        );
        
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(player.username)
            .update({ sparks: updatedPlayer.sparks });
        
        return { success: true, msg: "Redeemed!" };
    };

    const buyItem = async (playerIndex, item) => {
        const player = activePlayers[playerIndex];
        
        if (player.inventory.includes(item.id)) {
            return { success: false, msg: "Already owned!" };
        }
        
        if (player.sparks < item.price) {
            return { success: false, msg: "Need more Sparks!" };
        }
        
        if (player.level < item.minLevel) {
            return { success: false, msg: `Need Level ${item.minLevel}!` };
        }
        
        const updatedPlayer = {
            ...player,
            sparks: player.sparks - item.price,
            inventory: [...player.inventory, item.id]
        };
        
        setActivePlayers(prev =>
            prev.map(p => p.username === player.username ? updatedPlayer : p)
        );
        
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(player.username)
            .update({
                sparks: updatedPlayer.sparks,
                inventory: updatedPlayer.inventory
            });
        
        return { success: true, msg: "Purchased!" };
    };

    const equipItem = async (playerIndex, item) => {
        const player = activePlayers[playerIndex];
        const newAvatar = { ...player.avatar };
        
        // Toggle equipment
        if (item.type === 'hat') {
            newAvatar.hat = (newAvatar.hat === item.id) ? null : item.id;
        }
        if (item.type === 'glasses') {
            newAvatar.glasses = (newAvatar.glasses === item.id) ? null : item.id;
        }
        if (item.type === 'shirt') {
            const shirtValue = item.color || item.id;
            newAvatar.shirt = (newAvatar.shirt === shirtValue) ? null : shirtValue;
        }
        
        const updatedPlayer = { ...player, avatar: newAvatar };
        
        setActivePlayers(prev =>
            prev.map(p => p.username === player.username ? updatedPlayer : p)
        );
        
        await db.collection('parents').doc(parent.email)
            .collection('kids').doc(player.username)
            .update({ avatar: newAvatar });
    };

    const closeLevelUp = () => {
        setLevelUpQueue(prev => prev.slice(1));
    };

    // -----------------------------------------
    // CONTEXT VALUE
    // -----------------------------------------
    const value = {
        // State
        parent,
        activePlayers,
        isCreating,
        levelUpQueue,
        pendingChild,
        loading,
        
        // Auth actions
        loginParent,
        registerParent,
        resetPassword,
        logoutParent,
        
        // Child management
        initAddChild,
        completeAddChild,
        deleteChild,
        
        // Chores & rewards
        addChoreToChild,
        deleteChoreFromChild,
        addCustomReward,
        deleteCustomReward,
        
        // Game session
        startGame,
        exitGame,
        editAvatar,
        saveEditedAvatar,
        
        // Game actions
        completeQuest,
        completeChore,
        redeemReward,
        buyItem,
        equipItem,
        closeLevelUp
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}
