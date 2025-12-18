import React, { useState, useEffect } from 'react';
import { SUBSTATS } from '../config/stats';
import { saveDailyLog, getTodayLog, getTodayKey } from '../utils/storage';
import type { DailyLogEntry } from '../utils/storage';

interface DailyEntry {
    [key: string]: {
        completed: boolean;
        quantity: number;
    };
}

export const DailyLog: React.FC = () => {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [entries, setEntries] = useState<DailyEntry>(() => {
        // Load from localStorage if exists
        const savedLog = getTodayLog();
        if (savedLog) {
            const restored: DailyEntry = {};
            Object.entries(savedLog.stats).forEach(([name, data]) => {
                restored[name] = {
                    completed: data.completed,
                    quantity: data.quantity,
                };
            });
            return restored;
        }

        // Initialize fresh
        const initial: DailyEntry = {};
        SUBSTATS.forEach(stat => {
            initial[stat.name] = { completed: false, quantity: 0 };
        });
        return initial;
    });

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

    const calculatePoints = (stat: typeof SUBSTATS[0], entry: DailyEntry[string]) => {
        // Unchecked tasks = 0 points (not penalties)
        if (!entry.completed) return 0;

        // Checked tasks = points based on quantity
        let points = entry.quantity * stat.pointsPerUnit;

        // Special case for Morning Prayer (max 5 points)
        if (stat.name === 'Morning Prayer') {
            points = Math.min(points, 5);
        }

        return points;
    };

    const calculateTotalByArea = () => {
        const totals: Record<string, number> = {
            Physical: 0,
            Psyche: 0,
            Intellect: 0,
            Spiritual: 0,
            Core: 0
        };

        SUBSTATS.forEach(stat => {
            const entry = entries[stat.name];
            const points = calculatePoints(stat, entry);
            totals[stat.area] += points;
        });

        return totals;
    };

    const calculateDailyTotal = () => {
        const totals = calculateTotalByArea();
        return Object.values(totals).reduce((sum, val) => sum + val, 0);
    };

    // Auto-save to localStorage whenever entries change
    useEffect(() => {
        const dailyLogEntry: DailyLogEntry = {
            date: getTodayKey(),
            stats: {},
            totalPoints: calculateDailyTotal(),
        };

        SUBSTATS.forEach(stat => {
            const entry = entries[stat.name];
            dailyLogEntry.stats[stat.name] = {
                completed: entry.completed,
                quantity: entry.quantity,
                points: calculatePoints(stat, entry),
            };
        });

        saveDailyLog(dailyLogEntry);
    }, [entries]);

    const totals = calculateTotalByArea();
    const dailyTotal = calculateDailyTotal();

    const groupedStats = SUBSTATS.reduce((acc, stat) => {
        if (!acc[stat.area]) acc[stat.area] = [];
        acc[stat.area].push(stat);
        return acc;
    }, {} as Record<string, typeof SUBSTATS>);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-royal-blue mb-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Daily Log</h1>
                        <p className="text-lavender">{today}</p>
                    </div>
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
                                const points = calculatePoints(stat, entry);

                                return (
                                    <div
                                        key={stat.name}
                                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={entry.completed}
                                                onChange={() => handleCheckboxChange(stat.name)}
                                                className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />

                                            <div className="flex-1">
                                                <h3 className={`font-semibold ${entry.completed ? 'text-slate-100' : 'text-slate-400'}`}>
                                                    {stat.name}
                                                </h3>
                                                <p className="text-xs text-slate-500">{stat.description}</p>
                                            </div>

                                            {entry.completed && (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={entry.quantity}
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
