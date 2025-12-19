import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import type { Habit } from '../context/GameContext';
import { saveDailyLog, getLogForDate } from '../utils/storage';
import type { DailyLogEntry } from '../utils/storage';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DailyEntry {
    [key: string]: {
        completed: boolean;
        quantity: number;
    };
}

export const DailyLog: React.FC = () => {
    // Current date being viewed/edited
    const [currentDate, setCurrentDate] = useState(new Date());

    const isToday = currentDate.toDateString() === new Date().toDateString();

    // Formatting for display and storage keys
    const displayDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const storageKey = currentDate.toISOString().split('T')[0];

    const { habits, refreshLogs } = useGame();

    const [entries, setEntries] = useState<DailyEntry>({});

    // Load data whenever date changes
    useEffect(() => {
        const savedLog = getLogForDate(storageKey);

        if (savedLog) {
            const restored: DailyEntry = {};
            Object.entries(savedLog.stats).forEach(([name, data]) => {
                restored[name] = {
                    completed: data.completed,
                    quantity: data.quantity,
                };
            });
            // Ensure all current habits are present
            habits.forEach(stat => {
                if (!restored[stat.name]) {
                    restored[stat.name] = { completed: false, quantity: 0 };
                }
            });
            setEntries(restored);
        } else {
            // Initialize fresh for this date
            const initial: DailyEntry = {};
            habits.forEach(stat => {
                initial[stat.name] = { completed: false, quantity: 0 };
            });
            setEntries(initial);
        }
    }, [storageKey, habits]);

    const handleCheckboxChange = (name: string) => {
        setEntries(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                completed: !prev[name].completed
            }
        }));
    };

    const handleQuantityChange = (name: string, value: number) => {
        setEntries(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                quantity: Math.max(0, value)
            }
        }));
    };

    const calculatePoints = (stat: Habit, entry: DailyEntry[string]) => {
        if (!entry || !entry.completed) return 0;
        let points = entry.quantity * stat.pointsPerUnit;
        if (stat.name === 'Morning Prayer') points = Math.min(points, 5);
        return points;
    };

    const calculateTotalByArea = () => {
        const totals: Record<string, number> = { Physical: 0, Psyche: 0, Intellect: 0, Spiritual: 0, Core: 0 };
        habits.forEach(stat => {
            const entry = entries[stat.name];
            if (entry) totals[stat.area] += calculatePoints(stat, entry);
        });
        return totals;
    };

    const calculateDailyTotal = () => {
        const totals = calculateTotalByArea();
        return Object.values(totals).reduce((sum, val) => sum + val, 0);
    };

    // Save changes
    useEffect(() => {
        // Prevent saving partial state during initialization
        if (Object.keys(entries).length === 0) return;

        const dailyLogEntry: DailyLogEntry = {
            date: storageKey, // Use currently selected date
            stats: {},
            totalPoints: calculateDailyTotal(),
        };

        habits.forEach(stat => {
            const entry = entries[stat.name];
            if (entry) {
                dailyLogEntry.stats[stat.name] = {
                    completed: entry.completed,
                    quantity: entry.quantity,
                    points: calculatePoints(stat, entry),
                };
            }
        });

        saveDailyLog(dailyLogEntry);
        refreshLogs(); // Update context so Dashboard reflects changes immediately
    }, [entries]);

    const totals = calculateTotalByArea();
    const dailyTotal = calculateDailyTotal();

    const groupedStats = habits.reduce((acc, stat) => {
        if (!acc[stat.area]) acc[stat.area] = [];
        acc[stat.area].push(stat);
        return acc;
    }, {} as Record<string, Habit[]>);

    const changeDate = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        // Prevent going into future
        if (newDate > new Date()) return;
        setCurrentDate(newDate);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
            <div className="max-w-5xl mx-auto">

                {/* Date Navigation Header */}
                <div className="mb-8 flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <button
                        onClick={() => changeDate(-1)}
                        className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-royal-blue mb-1" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Daily Log</h1>
                        <div className="flex items-center justify-center gap-2 text-lavender">
                            <Calendar size={16} />
                            <span>{displayDate}</span>
                            {isToday && <span className="text-xs bg-royal-blue px-2 py-0.5 rounded text-white ml-2">TODAY</span>}
                        </div>
                    </div>

                    <button
                        onClick={() => changeDate(1)}
                        disabled={isToday}
                        className={`p-2 rounded-full transition-colors ${isToday ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Stats by Area */}
                {Object.entries(groupedStats).map(([area, stats]) => (
                    <div key={area} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-2 h-8 rounded-full"
                                style={{
                                    backgroundColor: ({
                                        Physical: '#ef4444',
                                        Psyche: '#a855f7',
                                        Intellect: '#3b82f6',
                                        Spiritual: '#6366f1',
                                        Core: '#10b981',
                                    } as any)[area]
                                }}
                            />
                            <h2 className="text-2xl font-bold text-slate-100">{area}</h2>
                            <span className="ml-auto text-lg font-mono" style={{
                                color: totals[area] >= 0 ? '#10b981' : '#ef4444'
                            }}>
                                {totals[area] >= 0 ? '+' : ''}{totals[area]} pts
                            </span>
                        </div>

                        <div className="space-y-3">
                            {stats.map(stat => {
                                const entry = entries[stat.name];
                                // If entry is not yet loaded, safe fallback (or loading state, but fallback is smoother)
                                const safeEntry = entry || { completed: false, quantity: 0 };
                                const points = calculatePoints(stat, safeEntry);

                                return (
                                    <div
                                        key={stat.name}
                                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={safeEntry.completed}
                                                onChange={() => handleCheckboxChange(stat.name)}
                                                className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />

                                            <div className="flex-1">
                                                <h3 className={`font-semibold ${safeEntry.completed ? 'text-slate-100' : 'text-slate-400'}`}>
                                                    {stat.name}
                                                </h3>
                                                <p className="text-xs text-slate-500">{stat.description}</p>
                                            </div>

                                            {safeEntry.completed && (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={safeEntry.quantity}
                                                        onChange={(e) => handleQuantityChange(stat.name, parseInt(e.target.value) || 0)}
                                                        className="w-20 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-center font-mono focus:border-blue-500 focus:outline-none"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-sm text-slate-400">{stat.unit}</span>
                                                </div>
                                            )}

                                            <div className={`font-mono text-lg font-bold min-w-[80px] text-right ${points >= 0 ? 'text-emerald-400' : 'text-red-400'
                                                }`}>
                                                {points >= 0 ? '+' : ''}{points}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Daily Total */}
                <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-100">Daily Total</h2>
                        <div className={`text-4xl font-black font-mono ${dailyTotal >= 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                            {dailyTotal >= 0 ? '+' : ''}{dailyTotal} pts
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
