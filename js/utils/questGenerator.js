/* =============================================
   QUEST GENERATOR
   =============================================
   Generates random quests based on:
   - Player age (for difficulty appropriateness)
   - Category preferences
   - Time of day (future)
   - Streak bonuses (future)
   ============================================= */

// -----------------------------------------
// QUEST TEMPLATES
// -----------------------------------------
// Organized by category and difficulty
// [placeholder] syntax gets replaced with word bank values

const QUEST_TEMPLATES = {
    // BLAZE - Physical activity quests
    blaze: {
        Easy: [
            { text: "Do [number_small] [exercise_easy]!", minAge: 4 },
            { text: "Jump like a [animal] for [time_short]!", minAge: 4 },
            { text: "Dance to your favorite song!", minAge: 4 },
            { text: "Run to the [location] and back [number_small] times!", minAge: 5 },
            { text: "Do [number_small] silly walks around the room!", minAge: 4 }
        ],
        Medium: [
            { text: "Do [number_large] [exercise_easy]!", minAge: 6 },
            { text: "Hold a plank for [time_short]!", minAge: 7 },
            { text: "Do [number_small] [exercise_hard]!", minAge: 8 },
            { text: "Create a [number_small]-move dance and perform it!", minAge: 6 },
            { text: "Do jumping jacks for [time_long]!", minAge: 6 }
        ],
        Hard: [
            { text: "Complete [number_large] [exercise_hard]!", minAge: 9 },
            { text: "Do a fitness circuit: [number_small] jumps, [number_small] squats, [number_small] spins!", minAge: 8 },
            { text: "Challenge: Hold a wall sit for [time_short]!", minAge: 9 },
            { text: "Create and complete your own [number_small]-exercise workout!", minAge: 10 }
        ],
        Epic: [
            { text: "EPIC: Complete 50 total exercises of your choice!", minAge: 10 },
            { text: "LEGENDARY: Do [exercise_hard] until you can't anymore! (Record your max)", minAge: 11 }
        ]
    },
    
    // FLOW - Creative & craft quests
    flow: {
        Easy: [
            { text: "Draw a [animal]!", minAge: 4 },
            { text: "Draw [creative]!", minAge: 4 },
            { text: "Make a silly face and hold it for [time_short]!", minAge: 4 },
            { text: "Build something cool with [number_small] toys!", minAge: 4 },
            { text: "Tell a joke to someone!", minAge: 5 }
        ],
        Medium: [
            { text: "Draw a [animal] doing [exercise_easy]!", minAge: 5 },
            { text: "Write a short story about a [animal]!", minAge: 7 },
            { text: "Create a paper airplane and fly it!", minAge: 6 },
            { text: "Make up a song about [object_easy]!", minAge: 5 },
            { text: "Build the tallest tower you can!", minAge: 5 }
        ],
        Hard: [
            { text: "Draw a detailed scene with [number_small] different [animal]s!", minAge: 8 },
            { text: "Write a poem with at least [number_small] lines!", minAge: 9 },
            { text: "Create a comic strip with [number_small] panels!", minAge: 8 },
            { text: "Design your dream treehouse and draw it!", minAge: 7 }
        ],
        Epic: [
            { text: "EPIC: Create a complete illustrated story with beginning, middle, and end!", minAge: 9 },
            { text: "LEGENDARY: Build an invention from household items and explain what it does!", minAge: 10 }
        ]
    },
    
    // TERRA - Household & nature quests
    terra: {
        Easy: [
            { text: "Find something [color]!", minAge: 4 },
            { text: "Find [number_small] different [object_easy]s!", minAge: 4 },
            { text: "Put away [number_small] toys!", minAge: 4 },
            { text: "Water a plant!", minAge: 4 },
            { text: "Help set the table!", minAge: 5 }
        ],
        Medium: [
            { text: "Clean up the [location]!", minAge: 5 },
            { text: "Find [number_small] things that start with the letter [letter]!", minAge: 6 },
            { text: "Organize your [object_easy] collection!", minAge: 6 },
            { text: "Make your bed perfectly!", minAge: 6 },
            { text: "Sort laundry by color!", minAge: 7 }
        ],
        Hard: [
            { text: "Deep clean [room] - make it sparkle!", minAge: 8 },
            { text: "Organize a drawer or closet!", minAge: 8 },
            { text: "Help prepare a meal or snack!", minAge: 9 },
            { text: "Complete [number_small] different chores!", minAge: 8 }
        ],
        Epic: [
            { text: "EPIC: Clean and organize an entire room!", minAge: 10 },
            { text: "LEGENDARY: Plan and prepare a simple meal for the family!", minAge: 11 }
        ]
    },
    
    // BREEZE - Quick & easy quests
    breeze: {
        Easy: [
            { text: "Give someone a high five!", minAge: 4 },
            { text: "Smile at yourself in the mirror!", minAge: 4 },
            { text: "Take [number_small] deep breaths!", minAge: 4 },
            { text: "Say something nice to someone!", minAge: 4 },
            { text: "Drink a glass of water!", minAge: 4 }
        ],
        Medium: [
            { text: "Read for [time_long]!", minAge: 6 },
            { text: "Practice writing your name [number_small] times!", minAge: 5 },
            { text: "Learn [number_small] new words and what they mean!", minAge: 7 },
            { text: "Help someone with something they're doing!", minAge: 5 }
        ],
        Hard: [
            { text: "Read a chapter of a book!", minAge: 8 },
            { text: "Practice a skill for [time_long]!", minAge: 8 },
            { text: "Teach someone something you know!", minAge: 8 }
        ],
        Epic: [
            { text: "EPIC: Complete a puzzle with 100+ pieces!", minAge: 9 },
            { text: "LEGENDARY: Learn and perform a new skill!", minAge: 10 }
        ]
    }
};

// Letters for scavenger hunts
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];

// -----------------------------------------
// QUEST GENERATION FUNCTION
// -----------------------------------------

/**
 * Generate a quest appropriate for the player's age
 * @param {number} playerAge - Age of the player in years
 * @param {string} preferredCategory - Optional category preference
 * @returns {Object} Generated quest object
 */
function generateQuest(playerAge = 8, preferredCategory = null) {
    // Default age if not provided or invalid
    if (!playerAge || playerAge < 4) playerAge = 8;
    if (playerAge > 13) playerAge = 13;
    
    // Determine appropriate difficulty based on age
    let availableDifficulties = ['Easy', 'Medium'];
    if (playerAge >= 8) availableDifficulties.push('Hard');
    if (playerAge >= 10) availableDifficulties.push('Epic');
    
    // Weight difficulties (more likely to get easier ones)
    const difficultyWeights = {
        'Easy': playerAge < 7 ? 60 : 40,
        'Medium': playerAge < 7 ? 35 : 40,
        'Hard': playerAge < 10 ? 5 : 15,
        'Epic': 5
    };
    
    // Pick a category (random or preferred)
    const categories = ['blaze', 'flow', 'terra', 'breeze'];
    const category = preferredCategory && categories.includes(preferredCategory) 
        ? preferredCategory 
        : categories[Math.floor(Math.random() * categories.length)];
    
    // Pick a difficulty based on weights
    const difficulty = weightedRandomChoice(availableDifficulties, difficultyWeights);
    
    // Get templates for this category and difficulty
    const templates = QUEST_TEMPLATES[category][difficulty] || QUEST_TEMPLATES[category]['Easy'];
    
    // Filter templates by minimum age
    const ageAppropriate = templates.filter(t => (t.minAge || 4) <= playerAge);
    
    // If no age-appropriate templates, fall back to Easy
    const finalTemplates = ageAppropriate.length > 0 
        ? ageAppropriate 
        : QUEST_TEMPLATES[category]['Easy'];
    
    // Pick a random template
    const template = finalTemplates[Math.floor(Math.random() * finalTemplates.length)];
    
    // Fill in the template with random words
    const questText = fillTemplate(template.text, playerAge);
    
    // Calculate rewards
    const baseReward = DIFFICULTY_CONFIG[difficulty].reward;
    
    return {
        id: Date.now() + Math.random(),
        description: questText,
        category: category,
        difficulty: difficulty,
        sparks_reward: baseReward,
        xp_reward: Math.floor(baseReward * DIFFICULTY_CONFIG[difficulty].xpMultiplier),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
}

/**
 * Fill template placeholders with random words
 * @param {string} template - Template string with [placeholder] syntax
 * @param {number} playerAge - Player age for age-appropriate words
 * @returns {string} Filled template
 */
function fillTemplate(template, playerAge) {
    let result = template;
    
    // Replace all placeholders
    const placeholderRegex = /\[(\w+)\]/g;
    
    result = result.replace(placeholderRegex, (match, key) => {
        // Special handling for age-appropriate choices
        if (key === 'exercise_easy' || key === 'exercise_hard') {
            const bank = playerAge < 8 ? WORD_BANKS['exercise_easy'] : WORD_BANKS[key];
            return bank[Math.floor(Math.random() * bank.length)];
        }
        
        if (key === 'object_easy' || key === 'object_hard') {
            const bank = playerAge < 8 ? WORD_BANKS['object_easy'] : WORD_BANKS[key];
            return bank[Math.floor(Math.random() * bank.length)];
        }
        
        if (key === 'number_small' || key === 'number_large') {
            const bank = playerAge < 8 ? WORD_BANKS['number_small'] : WORD_BANKS[key];
            return bank[Math.floor(Math.random() * bank.length)];
        }
        
        if (key === 'letter') {
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        }
        
        // Standard word bank lookup
        if (WORD_BANKS[key]) {
            return WORD_BANKS[key][Math.floor(Math.random() * WORD_BANKS[key].length)];
        }
        
        // If no match, return original placeholder
        return match;
    });
    
    return result;
}

/**
 * Weighted random selection
 * @param {Array} choices - Array of choices
 * @param {Object} weights - Object mapping choices to weights
 * @returns {*} Selected choice
 */
function weightedRandomChoice(choices, weights) {
    const totalWeight = choices.reduce((sum, choice) => sum + (weights[choice] || 1), 0);
    let random = Math.random() * totalWeight;
    
    for (const choice of choices) {
        random -= weights[choice] || 1;
        if (random <= 0) return choice;
    }
    
    return choices[0];
}

/**
 * Calculate player age from date of birth
 * @param {string} dob - Date of birth string (YYYY-MM-DD)
 * @returns {number} Age in years
 */
function calculateAge(dob) {
    if (!dob) return 8; // Default age
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return Math.max(4, Math.min(13, age)); // Clamp between 4-13
}
