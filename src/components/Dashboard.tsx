import React, { useState, useEffect } from 'react';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getXPToNextRank, getRandomQuote } from '../config/ranks';
import { getRecoveryInsight } from '../config/recovery';
import { Award, Quote, Trophy, Flame, ShieldCheck, RefreshCw } from 'lucide-react';
// import { getTotalPoints, getAreaTotals, getWeeklyProgress, getCurrentStreak, getLongestStreak } from '../utils/storage';
import { useGame } from '../context/GameContext';
import type { DailyLogEntry } from '../context/GameContext';

export const Dashboard: React.FC = () => {
    const [currentQuote] = useState(() => getRandomQuote());
    const [totalXP, setTotalXP] = useState(0);
    const [areaTotals, setAreaTotals] = useState({ Physical: 0, Psyche: 0, Intellect: 0, Spiritual: 0, Core: 0 });
    const [weeklyData, setWeeklyData] = useState<Array<{ day: string; total: number }>>([]);
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    // Recovery Specific State
    const [recoveryStreak, setRecoveryStreak] = useState(0);
    const [isRecoveryActive, setIsRecoveryActive] = useState(false);
    const [insightIndex, setInsightIndex] = useState(0);
    const [recoveryInsight, setRecoveryInsight] = useState("");

    const { habits, logs } = useGame();

    // Derived State Calculation
    useEffect(() => {
        if (!logs.length) {
            setTotalXP(0);
            // Even if no logs, we should check if a recovery habit exists to show the "Start" state
            const weedHabit = habits.find(h => h.name.toLowerCase().match(/weed|sobriety|clean|marijuana|thc|smoke/));
            setIsRecoveryActive(!!weedHabit);
            return;
        }

        // Calculate Total XP
        const dailyTotal = logs.reduce((sum, log) => sum + log.totalPoints, 0);

        // Let's reimplement stats logic here for dynamic habits support
        const newAreaTotals: Record<string, number> = { Physical: 0, Psyche: 0, Intellect: 0, Spiritual: 0, Core: 0 };

        logs.forEach(log => {
            Object.entries(log.stats).forEach(([statName, statData]) => {
                const habit = habits.find(h => h.name === statName);
                if (habit) {
                    // Ensure area exists in newAreaTotals before adding
                    if (newAreaTotals[habit.area] !== undefined) {
                        newAreaTotals[habit.area] += (statData as any).points || 0;
                    }
                }
            });
        });

        setTotalXP(dailyTotal);
        setAreaTotals(newAreaTotals as any);

        // Weekly Data
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateKey = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const log = logs.find(l => l.date === dateKey);
            last7Days.push({ day: dayName, total: log ? log.totalPoints : 0 });
        }
        setWeeklyData(last7Days);

        // Streak
        let currentStreak = 0;
        const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
        const today = new Date();
        for (let i = 0; i < sortedLogs.length; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const checkKey = checkDate.toISOString().split('T')[0];
            if (sortedLogs.find(l => l.date === checkKey && l.totalPoints > 0)) {
                currentStreak++;
            } else {
                break;
            }
        }
        setStreak(currentStreak);

        // Longest Streak (still from local storage for now as it persists)
        const storedLongest = parseInt(localStorage.getItem('life-rpg-longest-streak') || '0');
        const newLongest = Math.max(storedLongest, currentStreak);
        setLongestStreak(newLongest);
        localStorage.setItem('life-rpg-longest-streak', newLongest.toString()); // Ensure sync

        // --- RECOVERY LOGIC ---
        // 1. Find the habit
        const weedHabit = habits.find(h => h.name.toLowerCase().match(/weed|sobriety|clean|marijuana|thc|smoke/));
        setIsRecoveryActive(!!weedHabit);

        if (weedHabit) {
            let calcStreak = 0;
            const logMap = new Map<string, DailyLogEntry>(logs.map(l => [l.date, l]));

            // Check Today
            const todayKey = new Date().toISOString().split('T')[0];
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = yesterday.toISOString().split('T')[0];

            let dateCursor = new Date();

            // Should we start from Today or Yesterday?
            const logToday = logMap.get(todayKey);
            const hasToday = logToday && logToday.stats[weedHabit.name] && logToday.stats[weedHabit.name].points > 0;

            if (!hasToday) {
                // Check yesterday
                const logYesterday = logMap.get(yesterdayKey);
                const hasYesterday = logYesterday && logYesterday.stats[weedHabit.name] && logYesterday.stats[weedHabit.name].points > 0;
                if (!hasYesterday) {
                    calcStreak = 0;
                } else {
                    // Start counting from yesterday
                    dateCursor = yesterday;
                    calcStreak = 0; // will increment in loop below
                }
            }

            // Re-check start condition to enter loop
            const startLog = logMap.get(dateCursor.toISOString().split('T')[0]);
            const startHasVal = startLog && startLog.stats[weedHabit.name] && startLog.stats[weedHabit.name].points > 0;

            if (startHasVal) {
                // Loop backwards from dateCursor
                while (true) {
                    const key = dateCursor.toISOString().split('T')[0];
                    const log = logMap.get(key);
                    if (log && log.stats[weedHabit.name] && log.stats[weedHabit.name].points > 0) {
                        calcStreak++;
                        dateCursor.setDate(dateCursor.getDate() - 1);
                    } else {
                        break;
                    }
                }
            }

            setRecoveryStreak(calcStreak);
            // setRecoveryInsight update moved to separate effect
        }

    }, [logs, habits]);

    // Update Recovery Insight when streak or index changes
    useEffect(() => {
        setRecoveryInsight(getRecoveryInsight(recoveryStreak, insightIndex));
    }, [recoveryStreak, insightIndex]);

    const radarData = [
        { area: 'Physical', value: Math.min(2000, areaTotals.Physical) },
        { area: 'Psyche', value: Math.min(2000, areaTotals.Psyche) },
        { area: 'Intellect', value: Math.min(2000, areaTotals.Intellect) },
        { area: 'Spiritual', value: Math.min(2000, areaTotals.Spiritual) },
        { area: 'Core', value: Math.min(2000, areaTotals.Core) },
    ];

    const avgXP = Math.round(Object.values(areaTotals).reduce((sum, v) => sum + v, 0) / 5);

    // Milestones Configuration
    const MILESTONES = [
        { day: 0, label: 'Start', left: '0%', benefit: 'The Decision. You took back control.', bonus: 0 },
        { day: 7, label: '7 Days', left: '7.7%', benefit: 'Physical Cleanse. Metabolites leave the blood. Sleep normalizes.', bonus: 500 },
        { day: 14, label: '14 Days', left: '15.5%', benefit: 'Dopamine Reset. Natural joys start to feel real again.', bonus: 750 },
        { day: 30, label: '30 Days', left: '33.3%', benefit: 'Psychological Reset. Habit loops broken. Memory improves.', bonus: 1000 },
        { day: 60, label: '60 Days', left: '66.6%', benefit: 'Emotional Stability. Prefrontal cortex regulation returns.', bonus: 1750 },
        { day: 90, label: '90 Days', left: '99%', benefit: 'Full Integration. Dopamine baseline restored. You are free.', bonus: 2500 },
    ];

    // Calculate Bonus XP from Recovery
    const bonusXP = MILESTONES.reduce((acc, m) => (recoveryStreak >= m.day ? acc + m.bonus : acc), 0);
    const displayedXP = totalXP + bonusXP;

    const rankInfo = getXPToNextRank(displayedXP);

    // Calculate Max Possible XP Per Day (Perfect Day)
    const maxDailyXP = habits.reduce((total, habit) => {
        // If maxPerDay is 0 (unlimited), assume 1 for goal sizing, or maybe the user should set it.
        // Let's use 1 as a fallback multiplier if maxPerDay is missing/0 to ensure the chart has *some* height.
        // Or if it's 'boolean' type, multiplier is 1.
        const multiplier = habit.type === 'boolean' ? 1 : Math.max(1, habit.maxPerDay || 0);
        return total + (habit.pointsPerUnit * multiplier);
    }, 0);

    return (
        <div className="min-h-screen bg-luxury-black text-royal-blue p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Quote Widget */}
                <div className="luxury-card rounded-lg p-8 border-l-4 border-royal-blue">
                    <div className="flex items-start gap-6">
                        <Quote className="text-lavender mt-1 flex-shrink-0" size={36} />
                        <div>
                            <p className="text-2xl text-royal-blue italic leading-relaxed mb-3" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                "{currentQuote.text}"
                            </p>
                            <p className="text-lavender">— {currentQuote.author}</p>
                        </div>
                    </div>
                </div>

                {/* Rank Banner */}
                <div className="luxury-card rounded-lg p-8 border-2" style={{ borderColor: rankInfo.current.color }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Award className="flex-shrink-0" style={{ color: rankInfo.current.color }} size={56} />
                            <div>
                                <h2 className="text-4xl font-bold mb-2" style={{ color: rankInfo.current.color, fontFamily: "'Times New Roman', Times, serif" }}>
                                    {rankInfo.current.name}
                                </h2>
                                <p className="text-lavender text-lg">{rankInfo.current.description}</p>
                                {rankInfo.next && (
                                    <p className="text-veridian mt-2">
                                        <span className="font-bold">{rankInfo.xpNeeded} XP</span> to <span className="italic">{rankInfo.next.name}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lavender uppercase tracking-widest mb-2" style={{ fontSize: '0.75rem' }}>Total XP</p>
                            <p className="text-6xl font-black" style={{ color: rankInfo.current.color, fontFamily: "'Times New Roman', Times, serif" }}>
                                {totalXP}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Summary - Now with 4 cards including Longest Streak */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="luxury-card rounded-lg p-6">
                        <h3 className="text-lavender text-xs uppercase tracking-widest mb-3">Total XP</h3>
                        <p className="text-5xl font-bold text-royal-blue" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{totalXP}</p>
                    </div>
                    <div className="luxury-card rounded-lg p-6">
                        <h3 className="text-lavender text-xs uppercase tracking-widest mb-3">Average Score</h3>
                        <p className="text-5xl font-bold text-veridian" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{avgXP}</p>
                    </div>
                    <div className="luxury-card rounded-lg p-6">
                        <h3 className="text-lavender text-xs uppercase tracking-widest mb-3">Current Streak</h3>
                        <p className="text-5xl font-bold text-gold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            {streak} <span className="text-2xl">days</span>
                        </p>
                    </div>
                    <div className="luxury-card rounded-lg p-6 border-2 border-gold/30">
                        <div className="flex items-center gap-2 mb-3">
                            <Trophy className="text-gold" size={16} />
                            <h3 className="text-gold text-xs uppercase tracking-widest">Record Streak</h3>
                        </div>
                        <p className="text-5xl font-bold text-gold" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            {longestStreak} <span className="text-2xl">days</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Radar Chart */}
                    <div className="luxury-card rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-royal-blue" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            Attribute Mastery
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <RechartsRadar data={radarData}>
                                <PolarGrid stroke="rgba(65, 105, 225, 0.1)" />
                                <PolarAngleAxis
                                    dataKey="area"
                                    tick={{ fill: '#4169E1', fontSize: 13, fontFamily: "'Times New Roman', Times, serif", fontWeight: 'bold' }}
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 2000]} tick={false} axisLine={false} />
                                <Radar
                                    name="XP"
                                    dataKey="value"
                                    stroke="#4169E1"
                                    fill="#4169E1"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0a0a0a',
                                        border: '1px solid #4169E1',
                                        borderRadius: '8px',
                                        fontFamily: "'Times New Roman', Times, serif",
                                        color: '#4169E1',
                                    }}
                                    formatter={(value: any) => [`${value} / 2000 XP`, 'Attribute']}
                                />
                            </RechartsRadar>
                        </ResponsiveContainer>
                    </div>

                    {/* Weekly Progress Chart */}
                    <div className="luxury-card rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-royal-blue" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            Weekly Progression
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(65, 105, 225, 0.1)" />
                                <XAxis
                                    dataKey="day"
                                    stroke="#9D8FBF"
                                    style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="#9D8FBF"
                                    style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 12 }}
                                    domain={[0, maxDailyXP || 100]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0a0a0a',
                                        border: '1px solid #4169E1',
                                        borderRadius: '8px',
                                        fontFamily: "'Times New Roman', Times, serif",
                                        color: '#4169E1',
                                    }}
                                    formatter={(value: any) => [`${value} / ${maxDailyXP} XP`, 'Daily Total']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#40826D"
                                    strokeWidth={3}
                                    dot={{ fill: '#40826D', r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* RECOVERY JOURNEY WIDGET */}
                <div className="luxury-card rounded-lg p-8 border-l-4 border-veridian mt-8 overflow-visible">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-royal-blue flex items-center gap-3" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            <ShieldCheck className="text-veridian" size={28} />
                            Recovery Journey
                        </h2>
                        {isRecoveryActive && (
                            <div className="flex items-center gap-3 bg-luxury-black/50 px-4 py-2 rounded-lg border border-veridian/30">
                                <Flame className="text-orange-500 animate-pulse" size={20} />
                                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                    {recoveryStreak} <span className="text-sm font-normal text-lavender uppercase ml-1">Days Clean</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {!isRecoveryActive ? (
                        <div className="bg-luxury-black/30 p-6 rounded-lg border border-royal-blue/20">
                            <p className="text-lavender text-lg text-center mb-4">
                                "The first step is deciding to start."
                            </p>
                            <p className="text-royal-blue text-center">
                                Add a habit named <strong>"No Weed"</strong> or <strong>"Sobriety"</strong> in Settings to activate your personalized recovery timeline.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-1 bg-gradient-to-b from-veridian to-transparent self-stretch rounded-full" />
                                <div>
                                    <h3 className="text-xl font-bold text-veridian mb-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                        Current Milestone
                                    </h3>
                                    <div className="flex items-start gap-4">
                                        <p className="text-royal-blue text-lg leading-relaxed flex-1">
                                            {recoveryInsight}
                                        </p>
                                        <button
                                            onClick={() => setInsightIndex(i => i + 1)}
                                            className="p-2 text-royal-blue/50 hover:text-royal-blue hover:bg-royal-blue/10 rounded-full transition-all"
                                            title="Get another insight for this milestone"
                                        >
                                            <RefreshCw size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Timeline Bar */}
                            <div className="mt-8 px-2">
                                <div className="relative h-12">
                                    {/* Labels & Tooltips Layer */}
                                    {MILESTONES.map((m) => (
                                        <div
                                            key={m.day}
                                            className={`absolute top-0 transform group/marker cursor-help z-10 whitespace-nowrap ${m.day === 0 ? '-translate-x-0' :
                                                m.day === 90 ? '-translate-x-full' :
                                                    '-translate-x-1/2'
                                                }`}
                                            style={{ left: m.day === 90 ? '100%' : m.left }}
                                        >
                                            <div className="text-xs text-lavender uppercase tracking-widest hover:text-white transition-colors">
                                                {m.label}
                                            </div>

                                            {/* Tooltip */}
                                            <div className={`hidden group-hover/marker:block absolute bottom-full mb-2 w-64 bg-slate-900/95 border border-indigo-500/50 p-3 rounded-lg shadow-xl backdrop-blur-sm z-50 whitespace-normal ${m.day === 0 ? 'left-0 origin-bottom-left' :
                                                    m.day === 90 ? 'right-0 origin-bottom-right' :
                                                        'left-1/2 -translate-x-1/2 origin-bottom'
                                                }`}>
                                                <div className="text-indigo-300 font-bold mb-1">{m.label} Milestone</div>
                                                <p className="text-xs text-slate-300 leading-relaxed mb-2">{m.benefit}</p>
                                                {m.bonus > 0 && (
                                                    <div className="text-xs font-mono text-emerald-400">
                                                        Bonus: +{m.bonus} XP
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* The Progress Bar */}
                                    <div className="absolute top-6 w-full h-4 bg-luxury-black rounded-full overflow-hidden border border-royal-blue/20">
                                        {/* Markers on the bar itself */}
                                        {MILESTONES.slice(1).map(m => (
                                            <div
                                                key={m.day}
                                                className="absolute h-full w-0.5 bg-royal-blue/20"
                                                style={{ left: m.left }}
                                            />
                                        ))}

                                        {/* Fill */}
                                        <div
                                            className="h-full bg-gradient-to-r from-teal-900 to-veridian transition-all duration-1000 ease-out"
                                            style={{ width: `${Math.min(100, (recoveryStreak / 90) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <p className="text-center text-xs text-lavender mt-2">
                                    {Math.max(0, 90 - recoveryStreak)} days until Full Integration
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
