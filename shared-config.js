/**
 * Spark Quest - Shared Configuration
 * ===================================
 * This file centralizes all game configuration data to prevent duplication
 * across multiple HTML files and ensure consistency.
 * 
 * Version: 1.0.0
 * Last Updated: January 31, 2026
 */

// ============================================================================
// CATEGORY CONFIGURATION
// ============================================================================

const CATEGORY_CONFIG = {
    blaze: { emoji: '🔥', label: 'Blaze', color: 'amber' },
    flow: { emoji: '🎨', label: 'Flow', color: 'blue' },
    terra: { emoji: '🌿', label: 'Terra', color: 'green' },
    breeze: { emoji: '💨', label: 'Breeze', color: 'purple' }
};

// ============================================================================
// DIFFICULTY CONFIGURATION
// ============================================================================

const DIFFICULTY_CONFIG = {
    Easy: { sparks: 5, xp: 10, label: '⭐ Easy', color: 'green' },
    Medium: { sparks: 10, xp: 20, label: '⭐⭐ Medium', color: 'blue' },
    Hard: { sparks: 20, xp: 40, label: '⭐⭐⭐ Hard', color: 'purple' },
    Epic: { sparks: 50, xp: 100, label: '🏆 EPIC', color: 'yellow' }
};

// ============================================================================
// RARITY CONFIGURATION
// ============================================================================

const RARITY_CONFIG = {
    common: { label: 'Common', color: 'slate', glow: 'glow-common', chance: 50 },
    uncommon: { label: 'Uncommon', color: 'green', glow: 'glow-uncommon', chance: 25 },
    rare: { label: 'Rare', color: 'blue', glow: 'glow-rare', chance: 15 },
    epic: { label: 'Epic', color: 'purple', glow: 'glow-epic', chance: 7 },
    legendary: { label: 'Legendary', color: 'yellow', glow: 'glow-legendary', chance: 2.5 },
    mythic: { label: 'Mythic', color: 'pink', glow: 'glow-mythic', chance: 0.5 }
};

// ============================================================================
// SHOP ITEMS
// ============================================================================

const SHOP_ITEMS = [
    // === HATS (18 items) ===
    { id: 'hat_cap_red', name: 'Red Cap', type: 'hat', slot: 'hat', rarity: 'common', price: 25, svgType: 'cap', color: '#EF4444' },
    { id: 'hat_cap_blue', name: 'Blue Cap', type: 'hat', slot: 'hat', rarity: 'common', price: 25, svgType: 'cap', color: '#3B82F6' },
    { id: 'hat_beanie', name: 'Cozy Beanie', type: 'hat', slot: 'hat', rarity: 'common', price: 35, svgType: 'beanie', color: '#8B5CF6' },
    { id: 'hat_party', name: 'Party Hat', type: 'hat', slot: 'hat', rarity: 'common', price: 30, svgType: 'party', color: '#EC4899' },
    { id: 'hat_crown_silver', name: 'Silver Crown', type: 'hat', slot: 'hat', rarity: 'uncommon', price: 75, svgType: 'crown', color: '#94A3B8' },
    { id: 'hat_wizard', name: 'Wizard Hat', type: 'hat', slot: 'hat', rarity: 'rare', price: 150, svgType: 'wizard', color: '#6366F1' },
    { id: 'hat_pirate', name: 'Pirate Hat', type: 'hat', slot: 'hat', rarity: 'rare', price: 175, svgType: 'pirate', color: '#1F2937' },
    { id: 'hat_crown_gold', name: 'Golden Crown', type: 'hat', slot: 'hat', rarity: 'rare', price: 200, svgType: 'crown', color: '#FACC15' },
    { id: 'hat_ninja', name: 'Ninja Headband', type: 'hat', slot: 'hat', rarity: 'rare', price: 180, svgType: 'ninja', color: '#EF4444' },
    { id: 'hat_astronaut', name: 'Space Helmet', type: 'hat', slot: 'hat', rarity: 'epic', price: 350, svgType: 'astronaut', color: '#F8FAFC' },
    { id: 'hat_viking', name: 'Viking Helm', type: 'hat', slot: 'hat', rarity: 'epic', price: 400, svgType: 'viking', color: '#78716C' },
    { id: 'hat_cat_ears', name: 'Cat Ears', type: 'hat', slot: 'hat', rarity: 'uncommon', price: 85, svgType: 'cat_ears', color: '#FCA5A5' },
    { id: 'hat_bunny_ears', name: 'Bunny Ears', type: 'hat', slot: 'hat', rarity: 'uncommon', price: 85, svgType: 'bunny_ears', color: '#FBCFE8' },
    { id: 'hat_dino', name: 'Dino Spikes', type: 'hat', slot: 'hat', rarity: 'rare', price: 160, svgType: 'dino', color: '#22C55E' },
    { id: 'hat_flower', name: 'Flower Crown', type: 'hat', slot: 'hat', rarity: 'uncommon', price: 90, svgType: 'flower', color: '#F472B6' },
    { id: 'hat_halo', name: 'Angel Halo', type: 'hat', slot: 'hat', rarity: 'legendary', price: 600, svgType: 'halo', color: '#FEF08A' },
    { id: 'hat_horns', name: 'Devil Horns', type: 'hat', slot: 'hat', rarity: 'epic', price: 380, svgType: 'horns', color: '#DC2626' },
    { id: 'hat_rainbow', name: 'Rainbow Crown', type: 'hat', slot: 'hat', rarity: 'mythic', price: 1500, svgType: 'rainbow_crown', color: 'rainbow' },

    // === GLASSES (12 items) ===
    { id: 'glasses_round', name: 'Round Glasses', type: 'glasses', slot: 'glasses', rarity: 'common', price: 30, svgType: 'round', color: '#1F2937' },
    { id: 'glasses_cool', name: 'Cool Shades', type: 'glasses', slot: 'glasses', rarity: 'common', price: 40, svgType: 'shades', color: '#1F2937' },
    { id: 'glasses_star', name: 'Star Glasses', type: 'glasses', slot: 'glasses', rarity: 'uncommon', price: 70, svgType: 'star', color: '#FACC15' },
    { id: 'glasses_heart', name: 'Heart Glasses', type: 'glasses', slot: 'glasses', rarity: 'uncommon', price: 70, svgType: 'heart', color: '#EC4899' },
    { id: 'glasses_vr', name: 'VR Headset', type: 'glasses', slot: 'glasses', rarity: 'rare', price: 200, svgType: 'vr', color: '#3B82F6' },
    { id: 'glasses_monocle', name: 'Fancy Monocle', type: 'glasses', slot: 'glasses', rarity: 'rare', price: 175, svgType: 'monocle', color: '#A16207' },
    { id: 'glasses_cyber', name: 'Cyber Visor', type: 'glasses', slot: 'glasses', rarity: 'epic', price: 320, svgType: 'cyber', color: '#06B6D4' },
    { id: 'glasses_3d', name: '3D Glasses', type: 'glasses', slot: 'glasses', rarity: 'common', price: 35, svgType: '3d', color: '#EF4444' },
    { id: 'mask_hero', name: 'Hero Mask', type: 'glasses', slot: 'glasses', rarity: 'rare', price: 190, svgType: 'hero_mask', color: '#DC2626' },
    { id: 'mask_ninja', name: 'Ninja Mask', type: 'glasses', slot: 'glasses', rarity: 'epic', price: 280, svgType: 'ninja_mask', color: '#1F2937' },
    { id: 'eyepatch', name: 'Pirate Eyepatch', type: 'glasses', slot: 'glasses', rarity: 'uncommon', price: 65, svgType: 'eyepatch', color: '#1F2937' },
    { id: 'glasses_prism', name: 'Prism Glasses', type: 'glasses', slot: 'glasses', rarity: 'legendary', price: 550, svgType: 'prism', color: 'rainbow' },

    // === ACCESSORIES (15 items) ===
    { id: 'acc_cape_red', name: 'Red Cape', type: 'accessory', slot: 'accessory', rarity: 'uncommon', price: 80, svgType: 'cape', color: '#EF4444' },
    { id: 'acc_cape_blue', name: 'Blue Cape', type: 'accessory', slot: 'accessory', rarity: 'uncommon', price: 80, svgType: 'cape', color: '#3B82F6' },
    { id: 'acc_wings_angel', name: 'Angel Wings', type: 'accessory', slot: 'accessory', rarity: 'epic', price: 400, svgType: 'wings_angel', color: '#F8FAFC' },
    { id: 'acc_wings_bat', name: 'Bat Wings', type: 'accessory', slot: 'accessory', rarity: 'epic', price: 380, svgType: 'wings_bat', color: '#4B5563' },
    { id: 'acc_wings_fairy', name: 'Fairy Wings', type: 'accessory', slot: 'accessory', rarity: 'rare', price: 250, svgType: 'wings_fairy', color: '#A78BFA' },
    { id: 'acc_shield', name: 'Knight Shield', type: 'accessory', slot: 'accessory', rarity: 'rare', price: 220, svgType: 'shield', color: '#6B7280' },
    { id: 'acc_sword', name: 'Toy Sword', type: 'accessory', slot: 'accessory', rarity: 'uncommon', price: 95, svgType: 'sword', color: '#9CA3AF' },
    { id: 'acc_wand', name: 'Magic Wand', type: 'accessory', slot: 'accessory', rarity: 'rare', price: 180, svgType: 'wand', color: '#A855F7' },
    { id: 'acc_bow', name: 'Bow & Arrow', type: 'accessory', slot: 'accessory', rarity: 'rare', price: 200, svgType: 'bow', color: '#92400E' },
    { id: 'acc_pet_cat', name: 'Pet Kitty', type: 'accessory', slot: 'pet', rarity: 'epic', price: 450, svgType: 'pet_cat', color: '#FB923C' },
    { id: 'acc_pet_dog', name: 'Pet Puppy', type: 'accessory', slot: 'pet', rarity: 'epic', price: 450, svgType: 'pet_dog', color: '#A16207' },
    { id: 'acc_pet_dragon', name: 'Baby Dragon', type: 'accessory', slot: 'pet', rarity: 'legendary', price: 800, svgType: 'pet_dragon', color: '#7C3AED' },
    { id: 'acc_jetpack', name: 'Jetpack', type: 'accessory', slot: 'accessory', rarity: 'legendary', price: 750, svgType: 'jetpack', color: '#F97316' },
    { id: 'acc_wings_rainbow', name: 'Rainbow Wings', type: 'accessory', slot: 'accessory', rarity: 'mythic', price: 1800, svgType: 'wings_rainbow', color: 'rainbow' },
    { id: 'acc_aura_flame', name: 'Flame Aura', type: 'accessory', slot: 'aura', rarity: 'legendary', price: 900, svgType: 'aura_flame', color: '#F97316' },

    // === OUTFITS (10 items) ===
    { id: 'outfit_star', name: 'Star Shirt', type: 'outfit', slot: 'outfit', rarity: 'common', price: 45, svgType: 'shirt_star', color: '#FACC15' },
    { id: 'outfit_heart', name: 'Heart Shirt', type: 'outfit', slot: 'outfit', rarity: 'common', price: 45, svgType: 'shirt_heart', color: '#EC4899' },
    { id: 'outfit_hoodie', name: 'Cool Hoodie', type: 'outfit', slot: 'outfit', rarity: 'uncommon', price: 85, svgType: 'hoodie', color: '#6366F1' },
    { id: 'outfit_jersey', name: 'Sports Jersey', type: 'outfit', slot: 'outfit', rarity: 'uncommon', price: 90, svgType: 'jersey', color: '#22C55E' },
    { id: 'outfit_armor', name: 'Knight Armor', type: 'outfit', slot: 'outfit', rarity: 'rare', price: 220, svgType: 'armor', color: '#9CA3AF' },
    { id: 'outfit_robe', name: 'Wizard Robe', type: 'outfit', slot: 'outfit', rarity: 'rare', price: 200, svgType: 'robe', color: '#7C3AED' },
    { id: 'outfit_space', name: 'Space Suit', type: 'outfit', slot: 'outfit', rarity: 'epic', price: 380, svgType: 'spacesuit', color: '#F8FAFC' },
    { id: 'outfit_ninja', name: 'Ninja Outfit', type: 'outfit', slot: 'outfit', rarity: 'rare', price: 190, svgType: 'ninja_outfit', color: '#1F2937' },
    { id: 'outfit_hero', name: 'Hero Suit', type: 'outfit', slot: 'outfit', rarity: 'epic', price: 350, svgType: 'hero_suit', color: '#DC2626' },
    { id: 'outfit_rainbow', name: 'Rainbow Outfit', type: 'outfit', slot: 'outfit', rarity: 'mythic', price: 2000, svgType: 'rainbow_outfit', color: 'rainbow' },

    // === STICKERS (10 items) ===
    { id: 'sticker_star', name: 'Gold Star', type: 'sticker', rarity: 'common', price: 15, emoji: '⭐' },
    { id: 'sticker_heart', name: 'Heart', type: 'sticker', rarity: 'common', price: 15, emoji: '❤️' },
    { id: 'sticker_fire', name: 'Fire', type: 'sticker', rarity: 'common', price: 20, emoji: '🔥' },
    { id: 'sticker_rainbow', name: 'Rainbow', type: 'sticker', rarity: 'uncommon', price: 50, emoji: '🌈' },
    { id: 'sticker_rocket', name: 'Rocket', type: 'sticker', rarity: 'uncommon', price: 55, emoji: '🚀' },
    { id: 'sticker_trophy', name: 'Trophy', type: 'sticker', rarity: 'rare', price: 100, emoji: '🏆' },
    { id: 'sticker_dragon', name: 'Dragon', type: 'sticker', rarity: 'rare', price: 120, emoji: '🐉' },
    { id: 'sticker_unicorn', name: 'Unicorn', type: 'sticker', rarity: 'epic', price: 200, emoji: '🦄' },
    { id: 'sticker_crown', name: 'Crown', type: 'sticker', rarity: 'epic', price: 180, emoji: '👑' },
    { id: 'sticker_galaxy', name: 'Galaxy', type: 'sticker', rarity: 'legendary', price: 450, emoji: '🌌' },

    // === BACKGROUNDS (8 items) ===
    { id: 'bg_sky', name: 'Sky Blue', type: 'background', slot: 'background', rarity: 'common', price: 50, color: '#7DD3FC' },
    { id: 'bg_sunset', name: 'Sunset', type: 'background', slot: 'background', rarity: 'uncommon', price: 80, color: '#FB923C' },
    { id: 'bg_forest', name: 'Forest', type: 'background', slot: 'background', rarity: 'uncommon', price: 80, color: '#4ADE80' },
    { id: 'bg_night', name: 'Night Sky', type: 'background', slot: 'background', rarity: 'rare', price: 150, color: '#1E3A5F' },
    { id: 'bg_galaxy', name: 'Galaxy', type: 'background', slot: 'background', rarity: 'epic', price: 300, color: '#4C1D95' },
    { id: 'bg_lava', name: 'Lava', type: 'background', slot: 'background', rarity: 'epic', price: 320, color: '#DC2626' },
    { id: 'bg_rainbow', name: 'Rainbow', type: 'background', slot: 'background', rarity: 'legendary', price: 500, color: 'rainbow' },
    { id: 'bg_void', name: 'The Void', type: 'background', slot: 'background', rarity: 'mythic', price: 1200, color: '#000000' }
];

// ============================================================================
// MYSTERY BOXES
// ============================================================================

const MYSTERY_BOXES = [
    { id: 'box_bronze', name: 'Bronze Box', price: 50, emoji: '📦', color: '#CD7F32', gradient: 'from-amber-600 to-amber-800', minSparks: 5, maxSparks: 25, itemChance: 0.25, maxRarity: 'uncommon' },
    { id: 'box_silver', name: 'Silver Box', price: 150, emoji: '🎁', color: '#C0C0C0', gradient: 'from-slate-300 to-slate-500', minSparks: 20, maxSparks: 60, itemChance: 0.40, maxRarity: 'rare' },
    { id: 'box_gold', name: 'Gold Box', price: 400, emoji: '✨', color: '#FFD700', gradient: 'from-yellow-400 to-yellow-600', minSparks: 50, maxSparks: 150, itemChance: 0.55, maxRarity: 'epic' },
    { id: 'box_diamond', name: 'Diamond Box', price: 1000, emoji: '💎', color: '#B9F2FF', gradient: 'from-cyan-300 to-blue-500', minSparks: 100, maxSparks: 400, itemChance: 0.70, maxRarity: 'legendary' },
    { id: 'box_cosmic', name: 'Cosmic Box', price: 2500, emoji: '🌟', color: '#FF00FF', gradient: 'from-purple-500 to-pink-500', minSparks: 300, maxSparks: 1000, itemChance: 0.85, maxRarity: 'mythic' }
];

// ============================================================================
// AVATAR CONFIGURATION
// ============================================================================

const DEFAULT_AVATAR = { 
    skinTone: '#FFD5B8', 
    hairStyle: 'spiky', 
    hairColor: '#4A3728', 
    eyeColor: '#4A90D9', 
    outfitColor: '#3B82F6', 
    hat: null, 
    glasses: null, 
    accessory: null, 
    pet: null, 
    outfit: null, 
    background: null, 
    aura: null 
};

const SKIN_TONES = ['#FFDBAC', '#F5CBA7', '#FFD5B8', '#E8BEAC', '#D4A574', '#C68642', '#8D5524', '#6B4423', '#4A3728', '#3B2F2F'];
const HAIR_STYLES = ['spiky', 'wavy', 'curly', 'short', 'long', 'ponytail', 'mohawk', 'bald'];
const HAIR_COLORS = ['#4A3728', '#8B4513', '#2C1810', '#FFD700', '#FF6B35', '#9B59B6', '#3498DB', '#E74C3C', '#1ABC9C', '#E91E63'];
const EYE_COLORS = ['#4A90D9', '#2ECC71', '#8E44AD', '#E74C3C', '#F39C12', '#1ABC9C', '#34495E', '#E91E63'];
const OUTFIT_COLORS = ['#3B82F6', '#EF4444', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'];

// ============================================================================
// QUEST WORD BANKS
// ============================================================================

const WORD_BANKS = {
    number_small: ['3', '4', '5', '6', '7', '8'],
    number_large: ['10', '12', '15', '20'],
    time_short: ['10 seconds', '15 seconds', '20 seconds', '30 seconds'],
    time_long: ['1 minute', '2 minutes', '3 minutes'],
    exercise_easy: ['jumping jacks', 'hops', 'spins', 'claps', 'toe touches'],
    exercise_hard: ['push-ups', 'squats', 'burpees', 'lunges'],
    animal: ['dragon', 'unicorn', 'robot', 'dinosaur', 'superhero', 'cat', 'dog', 'bunny', 'owl', 'lion'],
    color: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'],
    location: ['kitchen', 'living room', 'bedroom', 'backyard'],
    room: ['your room', 'the bathroom', 'the kitchen'],
    creative: ['your dream house', 'an alien planet', 'yourself as a superhero', 'a magical creature'],
    letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'M', 'P', 'S', 'T']
};

// ============================================================================
// QUEST TEMPLATES
// ============================================================================

const QUEST_TEMPLATES = {
    blaze: {
        Easy: [
            { text: "Do [number_small] [exercise_easy]!", minAge: 4 },
            { text: "Jump up and down [number_small] times!", minAge: 4 },
            { text: "Run to the [location] and back!", minAge: 5 },
            { text: "Spin around [number_small] times!", minAge: 4 },
            { text: "Dance for [time_short]!", minAge: 4 },
            { text: "Hop on one foot [number_small] times!", minAge: 5 }
        ],
        Medium: [
            { text: "Do [number_large] [exercise_easy]!", minAge: 6 },
            { text: "Hold a superhero pose for [time_short]!", minAge: 6 },
            { text: "Create a [number_small]-move dance!", minAge: 6 },
            { text: "Do a silly walk around the [location]!", minAge: 5 },
            { text: "Balance on one foot for [time_short]!", minAge: 6 }
        ],
        Hard: [
            { text: "Complete [number_large] [exercise_hard]!", minAge: 9 },
            { text: "Do a fitness circuit: [number_small] jumps, [number_small] squats, [number_small] spins!", minAge: 8 },
            { text: "Hold a plank for [time_short]!", minAge: 8 },
            { text: "Do [number_large] jumping jacks without stopping!", minAge: 8 }
        ],
        Epic: [
            { text: "EPIC: Complete 50 total exercises of your choice!", minAge: 10 },
            { text: "EPIC: Create and perform a 2-minute workout routine!", minAge: 10 }
        ]
    },
    flow: {
        Easy: [
            { text: "Draw a [animal]!", minAge: 4 },
            { text: "Draw [creative]!", minAge: 4 },
            { text: "Build something with [number_small] toys!", minAge: 4 },
            { text: "Color a picture for [time_long]!", minAge: 4 },
            { text: "Make a funny face and hold it!", minAge: 4 }
        ],
        Medium: [
            { text: "Draw a [animal] doing [exercise_easy]!", minAge: 5 },
            { text: "Write a short story about a [animal]!", minAge: 7 },
            { text: "Make up a song about [color] things!", minAge: 5 },
            { text: "Build a tower using only [color] items!", minAge: 5 },
            { text: "Create a [animal] out of household items!", minAge: 6 }
        ],
        Hard: [
            { text: "Create a comic strip with [number_small] panels!", minAge: 8 },
            { text: "Write a poem with [number_small] lines!", minAge: 9 },
            { text: "Design your own superhero with a backstory!", minAge: 8 },
            { text: "Create a board game with simple rules!", minAge: 9 }
        ],
        Epic: [
            { text: "EPIC: Create a complete illustrated story!", minAge: 9 },
            { text: "EPIC: Build an amazing fort or creation!", minAge: 8 }
        ]
    },
    terra: {
        Easy: [
            { text: "Find something [color]!", minAge: 4 },
            { text: "Put away [number_small] toys!", minAge: 4 },
            { text: "Water a plant!", minAge: 4 },
            { text: "Throw away [number_small] pieces of trash!", minAge: 4 },
            { text: "Put your shoes where they belong!", minAge: 4 }
        ],
        Medium: [
            { text: "Clean up the [location]!", minAge: 5 },
            { text: "Find [number_small] things that start with [letter]!", minAge: 6 },
            { text: "Make your bed perfectly!", minAge: 6 },
            { text: "Help set the table for a meal!", minAge: 5 },
            { text: "Sort your toys by color or type!", minAge: 5 }
        ],
        Hard: [
            { text: "Deep clean [room]!", minAge: 8 },
            { text: "Organize a drawer or closet!", minAge: 8 },
            { text: "Help with the dishes!", minAge: 8 },
            { text: "Fold and put away your clean clothes!", minAge: 8 }
        ],
        Epic: [
            { text: "EPIC: Clean and organize an entire room!", minAge: 10 },
            { text: "EPIC: Help prepare a meal from start to finish!", minAge: 10 }
        ]
    },
    breeze: {
        Easy: [
            { text: "Give someone a high five!", minAge: 4 },
            { text: "Take [number_small] deep breaths!", minAge: 4 },
            { text: "Say something nice to someone!", minAge: 4 },
            { text: "Give someone a hug!", minAge: 4 },
            { text: "Smile at yourself in the mirror!", minAge: 4 }
        ],
        Medium: [
            { text: "Read for [time_long]!", minAge: 6 },
            { text: "Help someone with something!", minAge: 5 },
            { text: "Do a random act of kindness!", minAge: 6 },
            { text: "Tell a family member why you appreciate them!", minAge: 5 },
            { text: "Sit quietly and think happy thoughts for [time_short]!", minAge: 5 }
        ],
        Hard: [
            { text: "Read a whole chapter of a book!", minAge: 8 },
            { text: "Teach someone something you know!", minAge: 8 },
            { text: "Write a thank-you note to someone!", minAge: 8 },
            { text: "Help a sibling or friend with their problem!", minAge: 8 }
        ],
        Epic: [
            { text: "EPIC: Complete a 100+ piece puzzle!", minAge: 9 },
            { text: "EPIC: Plan and do something special for a family member!", minAge: 9 }
        ]
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth string
 * @returns {number} Age clamped between 4 and 13
 */
function calculateAge(dob) {
    if (!dob) return 8;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return Math.max(4, Math.min(13, age));
}

/**
 * Get today's date as a string
 * @returns {string} Today's date string
 */
function getTodayString() { 
    return new Date().toDateString(); 
}

/**
 * Fill template placeholders with random values from word banks
 * @param {string} template - Template string with [placeholder] markers
 * @returns {string} Filled template
 */
function fillTemplate(template) {
    return template.replace(/\[(\w+)\]/g, (match, key) => {
        const bank = WORD_BANKS[key];
        return bank ? bank[Math.floor(Math.random() * bank.length)] : match;
    });
}

/**
 * Generate a random quest appropriate for the given age
 * @param {number} age - Child's age (4-13)
 * @returns {Object} Quest object with id, text, category, difficulty, and rewards
 */
function generateQuest(age = 8) {
    const clampedAge = Math.max(4, Math.min(13, age));
    let difficulties = ['Easy', 'Medium'];
    if (clampedAge >= 8) difficulties.push('Hard');
    if (clampedAge >= 10) difficulties.push('Epic');
    
    const weights = { Easy: clampedAge < 7 ? 55 : 30, Medium: clampedAge < 7 ? 40 : 45, Hard: 20, Epic: 5 };
    const totalWeight = difficulties.reduce((sum, d) => sum + (weights[d] || 0), 0);
    let random = Math.random() * totalWeight;
    let difficulty = difficulties[0];
    for (const d of difficulties) {
        random -= weights[d] || 0;
        if (random <= 0) { difficulty = d; break; }
    }
    
    const categories = ['blaze', 'flow', 'terra', 'breeze'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const templates = (QUEST_TEMPLATES[category][difficulty] || QUEST_TEMPLATES[category]['Easy']).filter(t => (t.minAge || 4) <= clampedAge);
    const template = templates[Math.floor(Math.random() * templates.length)] || { text: "Do something fun!", minAge: 4 };
    const rewards = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG['Easy'];
    
    return {
        id: 'quest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        text: fillTemplate(template.text),
        category,
        difficulty,
        rewards: { sparks: rewards.sparks, xp: rewards.xp }
    };
}

/**
 * Roll for a random item based on rarity chances
 * @param {string} maxRarity - Maximum rarity that can be rolled
 * @param {Array} ownedItems - Array of item IDs already owned
 * @returns {Object|null} Random item or null if no eligible items
 */
function rollForItem(maxRarity, ownedItems = []) {
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
    const maxIndex = rarityOrder.indexOf(maxRarity);
    const availableRarities = rarityOrder.slice(0, maxIndex + 1);
    
    const roll = Math.random() * 100;
    let cumulative = 0;
    let selectedRarity = 'common';
    
    for (const rarity of [...availableRarities].reverse()) {
        cumulative += RARITY_CONFIG[rarity].chance;
        if (roll < cumulative) {
            selectedRarity = rarity;
            break;
        }
    }
    
    const eligibleItems = SHOP_ITEMS.filter(item => 
        item.rarity === selectedRarity && 
        item.type !== 'sticker' && 
        !ownedItems.includes(item.id)
    );
    
    if (eligibleItems.length === 0) {
        // Try lower rarity if no items available
        const lowerRarities = availableRarities.slice(0, availableRarities.indexOf(selectedRarity));
        for (const rarity of [...lowerRarities].reverse()) {
            const items = SHOP_ITEMS.filter(item => 
                item.rarity === rarity && 
                item.type !== 'sticker' && 
                !ownedItems.includes(item.id)
            );
            if (items.length > 0) {
                return items[Math.floor(Math.random() * items.length)];
            }
        }
        return null;
    }
    
    return eligibleItems[Math.floor(Math.random() * eligibleItems.length)];
}

/**
 * Get time remaining until daily reset (midnight)
 * @returns {number} Milliseconds until reset
 */
function getTimeUntilReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow - now;
}

/**
 * Format milliseconds as HH:MM:SS
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time string
 */
function formatTimeRemaining(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ============================================================================
// GAME CONSTANTS
// ============================================================================

const GAME_CONSTANTS = {
    XP_PER_LEVEL: 100,
    MAX_STREAK_BONUS: 0.5,
    STREAK_BONUS_PER_DAY: 0.1,
    LUCKY_BLOCK_ITEM_CHANCE: 0.12,
    DAILY_RESET_HOUR: 0,
    MIN_AGE: 4,
    MAX_AGE: 13,
    DEFAULT_AGE: 8
};

// Log that shared config loaded (will be removed in production)
if (typeof window !== 'undefined') {
    window.SPARK_QUEST_CONFIG_LOADED = true;
}
