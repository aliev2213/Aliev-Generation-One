export const LEVEL_Thresholds = [0, 1000, 2500, 5000, 10000, 20000]; // XP needed for each level

// Simple standards for "Strength" (1RM estimation or just raw weight milestones)
// For MVP, we'll use a simplified XP system where Volume (kg * reps) / Constant = XP
export const GYM_XP_MODIFIER = 0.1;
export const READING_XP_PER_PAGE = 10;
export const JOURNAL_XP_PER_ENTRY = 50;

export const WEED_DAILY_POINTS = 100; // Points per day clean
export const RELAPSE_PENALTY_MULTIPLIER = 0.5; // Lose 50% of current Willpower XP on relapse
