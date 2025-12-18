export interface SubstatConfig {
    name: string;
    area: 'Physical' | 'Psyche' | 'Intellect' | 'Spiritual' | 'Core';
    pointsPerUnit: number;
    missedPenalty: number;
    description: string;
    unit: string;
}

export const SUBSTATS: SubstatConfig[] = [
    // Physical
    { name: 'Strength', area: 'Physical', pointsPerUnit: 5, missedPenalty: -2, description: 'Completed Gym Day', unit: 'sessions' },
    { name: 'Cardio', area: 'Physical', pointsPerUnit: 3, missedPenalty: -2, description: 'Hit 10k+ Steps or equivalent cardio', unit: 'sessions' },
    { name: 'Protein', area: 'Physical', pointsPerUnit: 2, missedPenalty: -1, description: '50% of bodyweight in grams', unit: 'days' },
    { name: 'Stretching', area: 'Physical', pointsPerUnit: 2, missedPenalty: -1, description: 'Stretched Sore Muscles', unit: 'sessions' },

    // Psyche
    { name: 'Morning Meditation', area: 'Psyche', pointsPerUnit: 5, missedPenalty: -2, description: 'Meditating more than 5 minutes', unit: 'minutes' },
    { name: 'Journaling', area: 'Psyche', pointsPerUnit: 4, missedPenalty: -2, description: 'Journaling', unit: 'entries' },
    { name: 'No Weed', area: 'Psyche', pointsPerUnit: 3, missedPenalty: -3, description: 'Daily sobriety', unit: 'days' },
    { name: 'Gratitude', area: 'Psyche', pointsPerUnit: 2, missedPenalty: -1, description: '3 things daily', unit: 'entries' },

    // Intellect
    { name: 'Reading', area: 'Intellect', pointsPerUnit: 5, missedPenalty: -2, description: '1 chapter', unit: 'chapters' },
    { name: 'New Language', area: 'Intellect', pointsPerUnit: 4, missedPenalty: -2, description: '1 Duolingo lesson', unit: 'lessons' },
    { name: 'Podcast', area: 'Intellect', pointsPerUnit: 3, missedPenalty: -1, description: '1 Episode', unit: 'episodes' },

    // Spiritual
    { name: 'Morning Prayer', area: 'Spiritual', pointsPerUnit: 1, missedPenalty: -1, description: '1 Prayer (max 5 pts)', unit: 'prayers' },
    { name: 'Read Quran', area: 'Spiritual', pointsPerUnit: 7, missedPenalty: -2, description: '1 Chapter', unit: 'chapters' },
    { name: 'Act of Kindness', area: 'Spiritual', pointsPerUnit: 2, missedPenalty: -1, description: 'Going out of my way to help someone', unit: 'acts' },

    // Core
    { name: 'Quality Conversation', area: 'Core', pointsPerUnit: 5, missedPenalty: -2, description: 'Great conversation without phones', unit: 'conversations' },
    { name: 'Cleanliness', area: 'Core', pointsPerUnit: 3, missedPenalty: -1, description: 'Cleaned room/office desk', unit: 'sessions' },
    { name: 'Planned Tomorrow', area: 'Core', pointsPerUnit: 2, missedPenalty: -1, description: 'Making tomorrows plan', unit: 'plans' },
    { name: 'Shower', area: 'Core', pointsPerUnit: 1, missedPenalty: -1, description: 'Daily shower', unit: 'showers' },
    { name: 'Brush Teeth', area: 'Core', pointsPerUnit: 1, missedPenalty: -1, description: 'Brushing teeth', unit: 'times' },
];

export const AREA_COLORS = {
    Physical: '#ef4444',
    Psyche: '#a855f7',
    Intellect: '#3b82f6',
    Spiritual: '#6366f1',
    Core: '#10b981',
};
