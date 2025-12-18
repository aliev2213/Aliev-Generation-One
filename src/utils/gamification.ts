import type { UserStats, InventoryItem } from '../types';
import { LEVEL_Thresholds } from './constants';

export const INITIAL_STATS: UserStats = {
    name: 'Player',
    class: 'E-Rank Hunter',
    level: 1,
    totalXP: 0,
    nextLevelXP: 1000,
    stats: {
        physical: { value: 10, level: 1, xp: 0 },
        psyche: { value: 10, level: 1, xp: 0 },
        intellect: { value: 10, level: 1, xp: 0 },
        spiritual: { value: 10, level: 1, xp: 0 },
        core: { value: 10, level: 1, xp: 0 },
    },
    inventory: [],
    quests: [],
    daily: {
        lastLogin: null,
        gymHit: false,
        weedClean: false,
        journaled: false,
        hp: 100,
        energy: 100,
        mood: 'Neutral'
    }
};

export const calculateLevel = (totalXP: number): { level: number; nextXP: number } => {
    let level = 1;
    let nextXP = 1000;

    for (let i = 0; i < LEVEL_Thresholds.length; i++) {
        if (totalXP >= LEVEL_Thresholds[i]) {
            level = i + 1;
            nextXP = LEVEL_Thresholds[i + 1] || LEVEL_Thresholds[i] * 1.5;
        } else {
            nextXP = LEVEL_Thresholds[i];
            break;
        }
    }
    return { level, nextXP };
};

export const getPlayerClass = (level: number): string => {
    if (level >= 50) return 'Nation Level Hunter';
    if (level >= 30) return 'S-Rank Hunter';
    if (level >= 20) return 'A-Rank Hunter';
    if (level >= 10) return 'B-Rank Hunter';
    if (level >= 5) return 'C-Rank Hunter';
    return 'E-Rank Hunter';
};

// Milestone items for inventory
export const getMilestoneItem = (streakDays: number): InventoryItem | null => {
    const today = new Date().toISOString();
    if (streakDays === 3) return {
        id: 'helm_psyche',
        name: 'Helmet of Psyche',
        description: 'Survived 3 days of temptation.',
        icon: 'Shield',
        rarity: 'Common',
        dateAcquired: today
    };
    if (streakDays === 7) return {
        id: 'chest_clarity',
        name: 'Chestplate of Clarity',
        description: '1 Week clean. Your mind clears.',
        icon: 'Shirt', // Placeholder, use lucide map
        rarity: 'Rare',
        dateAcquired: today
    };
    return null;
};
