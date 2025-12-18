export type Rank = {
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  division: 1 | 2 | 3; // e.g., Silver II
  minXP: number;
};

export type Attribute = 'Physical' | 'Psyche' | 'Intellect' | 'Spiritual' | 'Core';

export interface StatDetail {
  value: number; // 0-100+ for the chart
  level: number;
  xp: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or lucide icon name
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  dateAcquired: string;
}

export interface Quest {
  id: string;
  title: string;
  description?: string;
  stat: Attribute;
  xpReward: number;
  completed: boolean;
  completedAt?: string;
}

export type UserStats = {
  name: string;
  class: string; // e.g. "Shadow Monarch"
  level: number;
  totalXP: number;
  nextLevelXP: number;
  stats: {
    physical: StatDetail;   // Was Strength/Gym
    psyche: StatDetail;     // Was Willpower/Mental
    intellect: StatDetail;  // Was Intelligence/Knowledge
    spiritual: StatDetail;  // Was Wisdom
    core: StatDetail;       // Was Vitality/Social/Values
  };
  inventory: InventoryItem[];
  quests: Quest[]; // Active and completed quests
  daily: {
    lastLogin: string | null;
    gymHit: boolean;
    weedClean: boolean; // Keep for Psyche tracking specific check
    journaled: boolean;
    hp: number;     // 0-100
    energy: number; // 0-100
    mood: string;   // Emoji or label
  };
};

export type LogEntry = {
  id: string;
  date: string;
  type: Attribute;
  details: string; // "Squat 100kg x 5" or "Read 10 pages"
  xpGained: number;
};

export interface Habit {
  id: string;
  name: string;
  attribute: Attribute;
  description: string;
}
