import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUBSTATS } from '../config/stats';
import { getAllDailyLogs } from '../utils/storage';
import type { DailyLogEntry } from '../utils/storage';

// Re-export specific types for consumers
export type { DailyLogEntry };

export interface Habit {
    id: string;
    area: 'Physical' | 'Psyche' | 'Intellect' | 'Spiritual' | 'Core';
    name: string;
    description: string;
    pointsPerUnit: number;
    unit: string;
    type: 'boolean' | 'number';
    maxPerDay?: number; // for progress bars
    points: number; // calculated points (deprecated? or base val?) actually pointsPerUnit is likely what controls calc.
}

interface GameContextType {
    habits: Habit[];
    updateHabits: (newHabits: Habit[]) => void;
    logs: DailyLogEntry[];
    refreshLogs: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize habits from static config for now (later from DB/LocalStorage)
    const [habits, setHabits] = useState<Habit[]>(() => {
        const saved = localStorage.getItem('life-rpg-habits');
        if (saved) return JSON.parse(saved);

        // Initialize from SUBSTATS with required fields
        return SUBSTATS.map(h => ({
            ...h,
            id: h.name,
            type: 'number',
            points: 0,
            maxPerDay: 0
        } as Habit));
    });

    const [logs, setLogs] = useState<DailyLogEntry[]>([]);

    const refreshLogs = () => {
        setLogs(getAllDailyLogs());
    };

    // Load logs on mount
    useEffect(() => {
        refreshLogs();
    }, []);

    const updateHabits = (newHabits: Habit[]) => {
        setHabits(newHabits);
        localStorage.setItem('life-rpg-habits', JSON.stringify(newHabits));
    };

    return (
        <GameContext.Provider value={{ habits, updateHabits, logs, refreshLogs }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
