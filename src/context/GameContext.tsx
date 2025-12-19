import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUBSTATS } from '../config/stats';
import { getAllDailyLogs } from '../utils/storage';
import type { DailyLogEntry } from '../utils/storage';

// Types
export interface Habit {
    name: string;
    description: string;
    area: 'Physical' | 'Psyche' | 'Intellect' | 'Spiritual' | 'Core';
    pointsPerUnit: number;
    unit: string;
    maxPerDay?: number;
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
        return saved ? JSON.parse(saved) : SUBSTATS;
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
