import { SUBSTATS } from '../config/stats';

export interface DailyLogEntry {
    date: string; // YYYY-MM-DD format
    stats: {
        [statName: string]: {
            completed: boolean;
            quantity: number;
            points: number;
        };
    };
    totalPoints: number;
}

export interface JournalEntry {
    date: string;
    content: string;
    wordCount: number;
    pointsEarned: number;
}

export interface AreaTotals {
    Physical: number;
    Psyche: number;
    Intellect: number;
    Spiritual: number;
    Core: number;
}

const STORAGE_KEYS = {
    DAILY_LOGS: 'life-rpg-daily-logs',
    JOURNAL_ENTRIES: 'life-rpg-journal-entries',
    TOTAL_POINTS: 'life-rpg-total-points',
    LONGEST_STREAK: 'life-rpg-longest-streak',
};

export function getTodayKey(): string {
    return new Date().toISOString().split('T')[0];
}

export function getAllDailyLogs(): DailyLogEntry[] {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    return stored ? JSON.parse(stored) : [];
}

export function getTodayLog(): DailyLogEntry | null {
    const logs = getAllDailyLogs();
    const today = getTodayKey();
    return logs.find(log => log.date === today) || null;
}

export function saveDailyLog(entry: DailyLogEntry): void {
    const logs = getAllDailyLogs();
    const existingIndex = logs.findIndex(log => log.date === entry.date);

    if (existingIndex >= 0) {
        logs[existingIndex] = entry;
    } else {
        logs.push(entry);
    }

    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
    updateTotalPoints();
    getCurrentStreak(); // Update streak stats
}

export function getJournalEntries(): JournalEntry[] {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
    return stored ? JSON.parse(stored) : [];
}

export function saveJournalEntry(entry: JournalEntry): void {
    const entries = getJournalEntries();
    const existingIndex = entries.findIndex(e => e.date === entry.date);

    if (existingIndex >= 0) {
        entries[existingIndex] = entry;
    } else {
        entries.push(entry);
    }

    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
    updateTotalPoints();
}

export function getTotalPoints(): number {
    const dailyLogs = getAllDailyLogs();
    const journalEntries = getJournalEntries();

    const dailyTotal = dailyLogs.reduce((sum, log) => sum + log.totalPoints, 0);
    const journalTotal = journalEntries.reduce((sum, entry) => sum + entry.pointsEarned, 0);

    return dailyTotal + journalTotal;
}

export function getAreaTotals(): AreaTotals {
    const dailyLogs = getAllDailyLogs();
    const totals: AreaTotals = {
        Physical: 0,
        Psyche: 0,
        Intellect: 0,
        Spiritual: 0,
        Core: 0,
    };

    dailyLogs.forEach(log => {
        Object.entries(log.stats).forEach(([statName, statData]) => {
            const substat = SUBSTATS.find(s => s.name === statName);
            if (substat) {
                totals[substat.area] += statData.points;
            }
        });
    });

    // Add journal points to Psyche
    const journalPoints = getJournalEntries().reduce((sum, e) => sum + e.pointsEarned, 0);
    totals.Psyche += journalPoints;

    return totals;
}

export function getWeeklyProgress(): Array<{ day: string; total: number }> {
    const logs = getAllDailyLogs();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const log = logs.find(l => l.date === dateKey);
        last7Days.push({
            day: dayName,
            total: log ? log.totalPoints : 0,
        });
    }

    return last7Days;
}

export function getCurrentStreak(): number {
    const logs = getAllDailyLogs().sort((a, b) => b.date.localeCompare(a.date));

    if (logs.length === 0) return 0;

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < logs.length; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const checkKey = checkDate.toISOString().split('T')[0];

        if (logs.find(log => log.date === checkKey && log.totalPoints > 0)) {
            streak++;
        } else {
            break;
        }
    }

    // Update longest streak if current is higher
    const longest = getLongestStreak();
    if (streak > longest) {
        localStorage.setItem(STORAGE_KEYS.LONGEST_STREAK, streak.toString());
    }

    return streak;
}

export function getLongestStreak(): number {
    const stored = localStorage.getItem(STORAGE_KEYS.LONGEST_STREAK);
    return stored ? parseInt(stored) : 0;
}

function updateTotalPoints(): void {
    const total = getTotalPoints();
    localStorage.setItem(STORAGE_KEYS.TOTAL_POINTS, total.toString());
}

export function clearAllData(): void {
    localStorage.clear();
    window.location.reload();
}
