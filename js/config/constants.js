/* =============================================
   GAME CONSTANTS & DATA
   =============================================
   All static game configuration in one place:
   - Skin tones, hair styles
   - Difficulty settings
   - Rarity tiers
   - Shop items
   - Quest word banks
   - Category styles
   ============================================= */

// -----------------------------------------
// AVATAR CUSTOMIZATION
// -----------------------------------------

const SKIN_TONES = [
    { id: 'skin_pale', color: '#ffe0bd', name: 'Pale' },
    { id: 'skin_fair', color: '#ffcd94', name: 'Fair' },
    { id: 'skin_tan', color: '#eac086', name: 'Tan' },
    { id: 'skin_medium', color: '#d1a3a4', name: 'Medium' },
    { id: 'skin_dark', color: '#8d5524', name: 'Dark' },
    { id: 'skin_deeper', color: '#563625', name: 'Deep' }
];

const HAIR_STYLES = [
    { id: 'hair_brown_messy', name: 'Brown Messy', color: '#563625' },
    { id: 'hair_blonde_ponytail', name: 'Blonde Pony', color: '#ecc94b' },
    { id: 'hair_black_spiky', name: 'Black Spiky', color: '#2d3748' },
    { id: 'hair_red_bob', name: 'Red Bob', color: '#e53e3e' }
];

const BORDER_CONFIG = [
    { id: 'border_1', minLevel: 1, name: 'Rookie', color: '#cbd5e1' },
    { id: 'border_5', minLevel: 5, name: 'Bronze', color: '#b45309' },
    { id: 'border_10', minLevel: 10, name: 'Silver', color: '#94a3b8' },
    { id: 'border_20', minLevel: 20, name: 'Gold', color: '#fbbf24' },
    { id: 'border_50', minLevel: 50, name: 'Diamond', color: '#60a5fa' }
];

// -----------------------------------------
// DIFFICULTY SYSTEM
// -----------------------------------------

const DIFFICULTY_CONFIG = {
    "Easy": {
        reward: 15,
        xpMultiplier: 1,
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
        icon: "🌱"
    },
    "Medium": {
        reward: 30,
        xpMultiplier: 1.5,
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
        icon: "⚔️"
    },
    "Hard": {
        reward: 50,
        xpMultiplier: 2,
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-300",
        icon: "🔥"
    },
    "Epic": {
        reward: 100,
        xpMultiplier: 3,
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-300",
        icon: "👑"
    }
};

// -----------------------------------------
// RARITY SYSTEM
// -----------------------------------------

const RARITY_CONFIG = {
    common: {
        label: "Common",
        color: "text-slate-500",
        bg: "bg-slate-100",
        border: "border-slate-200",
        glow: ""
    },
    uncommon: {
        label: "Uncommon",
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-300",
        glow: "shadow-green-200"
    },
    rare: {
        label: "Rare",
        color: "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-300",
        glow: "shadow-blue-200"
    },
    epic: {
        label: "Epic",
        color: "text-purple-600",
        bg: "bg-purple-100",
        border: "border-purple-300",
        glow: "shadow-purple-200"
    },
    mythic: {
        label: "Mythic",
        color: "text-amber-600",
        bg: "bg-amber-100",
        border: "border-amber-400",
        glow: "shadow-amber-300"
    }
};

// -----------------------------------------
// SHOP ITEMS
// -----------------------------------------

const SHOP_ITEMS = [
    // HATS - Common
    { id: 'hat_cap_blue', name: 'Blue Cap', type: 'hat', price: 30, color: '#3b82f6', rarity: 'common', minLevel: 1 },
    { id: 'hat_cap_red', name: 'Red Cap', type: 'hat', price: 30, color: '#ef4444', rarity: 'common', minLevel: 1 },
    
    // HATS - Uncommon
    { id: 'hat_beanie', name: 'Beanie', type: 'hat', price: 50, color: '#475569', rarity: 'uncommon', minLevel: 2 },
    
    // HATS - Rare
    { id: 'hat_cowboy', name: 'Cowboy Hat', type: 'hat', price: 100, color: '#78350f', rarity: 'rare', minLevel: 5 },
    { id: 'hat_wizard', name: 'Wizard Hat', type: 'hat', price: 120, color: '#4c1d95', rarity: 'rare', minLevel: 5 },
    
    // HATS - Epic
    { id: 'hat_headphones', name: 'Pro Headset', type: 'hat', price: 150, color: '#ef4444', rarity: 'epic', minLevel: 10 },
    { id: 'hat_top', name: 'Gentleman', type: 'hat', price: 200, color: '#1e293b', rarity: 'epic', minLevel: 10 },
    { id: 'hat_viking', name: 'Viking Helm', type: 'hat', price: 150, color: '#94a3b8', rarity: 'epic', minLevel: 8 },
    { id: 'hat_pirate', name: 'Pirate Hat', type: 'hat', price: 150, color: '#1e293b', rarity: 'epic', minLevel: 8 },
    
    // HATS - Mythic
    { id: 'hat_crown', name: "King's Crown", type: 'hat', price: 500, color: '#fbbf24', rarity: 'mythic', minLevel: 20 },
    
    // SHIRTS - Common
    { id: 'shirt_blue', name: 'Blue Tee', type: 'shirt', color: '#3b82f6', price: 25, rarity: 'common', minLevel: 1 },
    { id: 'shirt_green', name: 'Green Tee', type: 'shirt', color: '#22c55e', price: 25, rarity: 'common', minLevel: 1 },
    
    // SHIRTS - Uncommon
    { id: 'shirt_purple', name: 'Purple Tee', type: 'shirt', color: '#a855f7', price: 50, rarity: 'uncommon', minLevel: 2 },
    { id: 'shirt_stripe', name: 'Striped', type: 'shirt', price: 60, rarity: 'uncommon', minLevel: 3 },
    
    // SHIRTS - Rare
    { id: 'shirt_super', name: 'Super Hero', type: 'shirt', price: 100, rarity: 'rare', minLevel: 5 },
    { id: 'shirt_ninja', name: 'Ninja Suit', type: 'shirt', price: 100, rarity: 'rare', minLevel: 5 },
    
    // SHIRTS - Epic
    { id: 'shirt_gold_armor', name: 'Gilded Armor', type: 'shirt', price: 250, rarity: 'epic', minLevel: 10 },
    
    // SHIRTS - Mythic
    { id: 'shirt_void', name: 'Void Walker', type: 'shirt', price: 600, rarity: 'mythic', minLevel: 20 },
    
    // GLASSES - Uncommon
    { id: 'glass_nerd', name: 'Specs', type: 'glasses', price: 45, rarity: 'uncommon', minLevel: 2 },
    { id: 'glass_monocle', name: 'Monocle', type: 'glasses', price: 60, rarity: 'uncommon', minLevel: 3 },
    
    // GLASSES - Rare
    { id: 'glass_shades', name: 'Cool Shades', type: 'glasses', price: 80, rarity: 'rare', minLevel: 5 },
    
    // GLASSES - Epic
    { id: 'glass_star', name: 'Star Power', type: 'glasses', price: 120, rarity: 'epic', minLevel: 8 },
    
    // GLASSES - Mythic
    { id: 'glass_cyber', name: 'Cyber Visor', type: 'glasses', price: 400, rarity: 'mythic', minLevel: 20 }
];

// -----------------------------------------
// QUEST CATEGORY STYLES
// -----------------------------------------

const CAT_STYLES = {
    blaze: {
        icon: '⚔️',
        name: 'Blaze',
        description: 'Physical activity quests',
        bg: 'bg-red-500',
        text: 'text-red-100',
        lightBg: 'bg-red-50',
        lightText: 'text-red-600'
    },
    flow: {
        icon: '🔨',
        name: 'Flow',
        description: 'Creative & craft quests',
        bg: 'bg-blue-500',
        text: 'text-blue-100',
        lightBg: 'bg-blue-50',
        lightText: 'text-blue-600'
    },
    terra: {
        icon: '🌱',
        name: 'Terra',
        description: 'Household & nature quests',
        bg: 'bg-green-500',
        text: 'text-green-100',
        lightBg: 'bg-green-50',
        lightText: 'text-green-600'
    },
    breeze: {
        icon: '💨',
        name: 'Breeze',
        description: 'Quick & easy quests',
        bg: 'bg-purple-500',
        text: 'text-purple-100',
        lightBg: 'bg-purple-50',
        lightText: 'text-purple-600'
    }
};

// -----------------------------------------
// QUEST WORD BANKS (Expanded)
// -----------------------------------------

const WORD_BANKS = {
    // Colors for scavenger hunts
    color: [
        "Red", "Blue", "Green", "Yellow", "Purple", 
        "Orange", "Pink", "White", "Black", "Brown"
    ],
    
    // Locations in the home
    location: [
        "kitchen", "living room", "bedroom", "hallway", 
        "backyard", "play area", "couch", "bathroom door",
        "front door", "dining table", "closet"
    ],
    
    // Animals for drawing/acting
    animal: [
        "Lion", "Dog", "Cat", "Frog", "Dinosaur", 
        "Bunny", "Monkey", "Chicken", "Bear", "Elephant",
        "Penguin", "Dragon", "Unicorn", "Shark", "Butterfly"
    ],
    
    // Easy objects (ages 4-7)
    object_easy: [
        "toy", "pillow", "book", "spoon", "shoe", 
        "ball", "cup", "hat", "sock", "crayon"
    ],
    
    // Harder objects (ages 8-13)
    object_hard: [
        "flashlight", "ruler", "mug", "backpack", "coin", 
        "leaf", "pencil", "remote", "charger", "bottle"
    ],
    
    // Easy exercises (ages 4-7)
    exercise_easy: [
        "jumps", "claps", "spins", "stomps", "hops", 
        "wiggles", "arm circles", "toe touches"
    ],
    
    // Harder exercises (ages 8-13)
    exercise_hard: [
        "squats", "push-ups (knees)", "lunges", "sit-ups", 
        "planks (10 sec)", "burpees", "mountain climbers"
    ],
    
    // Numbers for repetitions
    number_small: ["3", "5", "7", "10"],
    number_large: ["10", "15", "20", "25"],
    
    // Time durations
    time_short: ["10 seconds", "20 seconds", "30 seconds"],
    time_long: ["1 minute", "2 minutes", "5 minutes"],
    
    // Rooms to clean
    room: ["your room", "the bathroom", "the kitchen", "the living room"],
    
    // Creative activities
    creative: [
        "a funny face", "your favorite food", "a house", 
        "a rocket ship", "a flower", "your family"
    ]
};

// -----------------------------------------
// XP & LEVELING
// -----------------------------------------

const LEVEL_CONFIG = {
    xpPerLevel: 100,           // XP needed per level
    levelUpBonus: 50,          // Bonus sparks on level up
    maxLevel: 100,             // Maximum achievable level
    
    // Calculate level from XP
    getLevel: (xp) => Math.floor(xp / 100) + 1,
    
    // Calculate XP progress within current level
    getProgress: (xp) => xp % 100,
    
    // Calculate XP needed for next level
    getXpToNext: (xp) => 100 - (xp % 100)
};

// -----------------------------------------
// STREAK SYSTEM (Future Implementation)
// -----------------------------------------

const STREAK_CONFIG = {
    // Bonus multipliers for streak days
    multipliers: {
        1: 1.0,    // Day 1: no bonus
        3: 1.1,    // Day 3: 10% bonus
        7: 1.25,   // Day 7: 25% bonus
        14: 1.5,   // Day 14: 50% bonus
        30: 2.0    // Day 30: 100% bonus
    },
    
    // Grace period in hours before streak breaks
    gracePeriod: 36,
    
    // "Freeze" items that can save a streak
    freezeAvailable: false
};
